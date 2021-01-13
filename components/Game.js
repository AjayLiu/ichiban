import styles from './Game.module.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

import AnimeDiv from '@components/AnimeDiv'
import shuffle from 'shuffle-array';

export default function Game() {
  
    const pagesToGet = 4;
    const [page, setPage] = useState(()=>{return 1});
    const [loading, setLoading] = useState(()=>{return true});
    const [pool, setPool] = useState(()=>{return []});
    const [randList, setRandList] = useState(()=>{return []});
    const [score, setScore] = useState(()=>{return 0});
    const [champIndex, setChampIndex] = useState(()=>{return 0});
    const [champ, setChamp] = useState({reveal: false});
    const [challenger, setChallenger] = useState({reveal: false});
    const [gameover, setGameover] = useState(()=>{return false});
    const [resetGame, setResetGame] = useState(()=>{return false});

    var url = `https://api.jikan.moe/v3/top/anime/${page}/bypopularity`;
    
  
    useEffect(()=>{
      //reset game
      if(resetGame){
        shuffleRandList();
        setScore(0);
        setChampIndex(0);
        setGameover(false);
        setResetGame(false);
      }
    },[resetGame])

    function shuffleRandList() {
      var shuffle = require('shuffle-array');
      //make an array filled from 0 to pool.length
      var tempArr = Array.from(Array(pool.length).keys());
      shuffle(tempArr);      
      setRandList(tempArr);
      setLoading(false);
      console.log(pool);
    }

    //fill up pool with anime
    useEffect(()=>{
      async function fetchData(){
        const request = await axios.get(url);
        setPool(prevPool=>prevPool.concat(request.data.top));
        //recursively call again to get more pages
        if(page < pagesToGet)
          setPage(prevPage => prevPage+1);
        else {
          shuffleRandList();
        }
        return request;
      }
      fetchData();
    }, [page]);
    
  
  
    // every time the player advances or loses, run this
    useEffect(()=>{
      
    }, [score, loading]);
    
  
  
    useEffect(()=>{
      if(!loading){
        setChamp(prevChamp => {
          return {
            ...pool[randList[champIndex]],
            reveal:true,
            higher: prevChamp.higher
          }
        });
        setChallenger(pool[randList[score+1]]);
      }
    }, [champIndex, score, loading])
  
    function onAnimeClick(isChamp){
      
      var champHigher = champ.members > challenger.members;
      setChamp(prevChamp=>{        
        return {
          ...prevChamp,
          reveal: true, 
          higher: champHigher
        }
      });
      setChallenger(prevChallenger=>{        
        return {
          ...prevChallenger,
          reveal: true,
          higher: !champHigher
        }
      });
      //guessed correctly
      if(isChamp == champHigher){



        setChampIndex(prevChamp => prevChamp+1);      
        setScore(prevScore=>prevScore+1);
      } else {
        setGameover(true);
      }
    }


    return (
        <main>
            { 
            loading ? 
            <div>
                Loading...
            </div>
            :
            <>
            <h1>Which Anime Has More Fans (according to MyAnimeList.net)?</h1>
            <h2 className={styles.score}>
              Score: {score}
            </h2>
            <div className = {styles.battlefield}>
                {
                <>            
                <AnimeDiv clickCallback={()=>onAnimeClick(true)} obj = {champ} gameover={gameover}/>
                <div id={styles.orLabel}>
                  {
                    gameover ? 
                    <div>
                      Game Over
                      <button onClick={()=>{setResetGame(true)}}>Press to play again</button>
                    </div>
                    :
                    <div>OR</div>
                  }
                </div>
                <AnimeDiv clickCallback={()=>onAnimeClick(false)} obj = {challenger} gameover={gameover}/>                        
                </>
                }              
            </div> 
            </>
            }

        </main>

    );
}
