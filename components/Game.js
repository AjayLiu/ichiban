import styles from './Game.module.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

import AnimeDiv from '@components/AnimeDiv'
import shuffle from 'shuffle-array';

import useWindowDimensions from '@components/windowDimensions'



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
    const [highscore, setHighscore] = useState(()=>{return 0});

    const { height, width } = useWindowDimensions()

    const url = `https://api.jikan.moe/v3/top/anime/${page}/bypopularity`;
    
    
    const shuffleRandList = () => {
      //make an array filled from 0 to pagesToGet * 50
      let tempArr = Array.from(Array(pagesToGet*50).keys());           
      setRandList(shuffle(tempArr));
      setLoading(false);
    }
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
    
    //fill up pool with anime
    useEffect(()=>{
      const fetchData = async() => {
        const request = await axios.get(url);
        // console.log(request)
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
      // console.log(gameover);

    }, [page]);
    

    //get global high score
    const fetchHighScore = async() => {
      const request = await axios.post('/api/gethighscore');
      setHighscore(request.data.score);
      return request;
    }
    useEffect(()=>{
      fetchHighScore();
    }, [])
  
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
    }, [champIndex, score, loading, randList])

    //every game over
    useEffect(()=>{
      const uploadNewHighScore = async() => {
        const request = await axios.post('/api/sethighscore', {score: score});
        fetchHighScore();       
        return request;
      }
      if(gameover){
        if(score > highscore){
          uploadNewHighScore();   
        }
      }
    }, [gameover]);
  
    const onAnimeClick = (isChamp) => {
      // console.log('click')
      if(!gameover){
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
            higher: !champHigher
          }
        });
        //guessed correctly
        if(isChamp == champHigher){
          setChampIndex(prevChamp => prevChamp+1);      
          setScore(prevScore=>prevScore+1);
        } else {
          setChallenger(prevChallenger=>{
            return {
              ...prevChallenger,
              reveal: true
            }
          });
          setGameover(true);
        }
      }
    }

    var mobileThreshold = 800;

    const gameoverElem = (
      <div className={styles.gameoverElem} onClick={()=>setResetGame(true)}>
        <div className={styles.gameoverLabel}>
          Game Over
        </div>
        <div className={styles.gameoverBtn}>Press to play again</div>
      </div>
    )


    return (
        <main>
          { 
          loading ? 
          <div>
              Loading...
          </div>
          :
          <>
          <h1 className={styles.prompt}>Which Anime Has More Fans (according to MyAnimeList.net)?</h1>
          <h2 className={styles.score}>
            <p>Global High Score: {highscore}</p>            
            <p>Score: {score} </p> 
          </h2>

          <div>
            {
              width <= mobileThreshold && gameover && gameoverElem            
            }
          </div>

          <div className = {styles.battlefield}>
              {
              <>            
              <AnimeDiv clickCallback={()=>onAnimeClick(true)} obj = {champ} gameover={gameover}/>
              <div style={{  marginTop: "75px"}}>
                {
                  //Desktop gameover button
                  width <= mobileThreshold || (gameover ? 
                  gameoverElem
                  :
                  <div id={styles.orLabel}>{"OR"}</div>)
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
