import styles from './Game.module.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

import AnimeDiv from '@components/AnimeDiv'

export default function Game() {
  
    const pagesToGet = 4;
    const [page, setPage] = useState(()=>{return 1});
    const [loading, setLoading] = useState(()=>{return true});
    const [pool, setPool] = useState(()=>{return []});
    const [randList, setRandList] = useState(()=>{return []});
    const [score, setScore] = useState(()=>{return 0});
    const [champIndex, setChampIndex] = useState(()=>{return 0});
    const [champ, setChamp] = useState({title: 'test'});
    const [challenger, setChallenger] = useState({title: 'test2'});
    const [revealNumbers, setRevealNumbers] = useState({});
    const [gameover, setGameover] = useState(()=>{return false});
  
    var url = `https://api.jikan.moe/v3/top/anime/${page}/bypopularity`;
    
  
    //fill up pool with anime
    useEffect(()=>{
      async function fetchData(){
        const request = await axios.get(url);
        setPool(prevPool=>prevPool.concat(request.data.top));
        //recursively call again to get more pages
        if(page < pagesToGet)
          setPage(prevPage => prevPage+1);
        else {
          var shuffle = require('shuffle-array');
          //make an array filled from 0 to pool.length
          var tempArr = Array.from(Array(pool.length).keys());
          shuffle(tempArr);      
          setRandList(tempArr);
          setLoading(false);
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
        setChamp(pool[randList[champIndex]]);
        setChallenger(pool[randList[score+1]]);
      }
    }, [champIndex, score, loading])
  
    function onAnimeClick(isChamp){
      var champHigher = champ.members > challenger.members;
      //guessed correctly
      if(isChamp == champHigher){
        setChampIndex(prevChamp => prevChamp+1);      
        setScore(prevScore=>prevScore+1);
        setRevealNumbers(true);
      } else {
        setGameover(true);
      }
    }

    useEffect(()=>{

    }, [revealNumbers]);

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
                {gameover ? <div>GAME OVER</div> : <div>Score: {score}</div>}
            </h2>
            <div className = {styles.battlefield}>
                {
                <>            
                <AnimeDiv clickCallback={()=>onAnimeClick(true)} obj = {champ}/>
                <AnimeDiv clickCallback={()=>onAnimeClick(false)} obj = {challenger}/>                        
                </>
                }
                        

            </div> 
            </>
            }

        </main>

    );
}
