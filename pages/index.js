import Head from 'next/head'
import Footer from '@components/Footer'
import GoogleAnalyticsHook from '@components/GoogleAnalyticsHook'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

//`https://api.jikan.moe/v3/top/anime/${1}/bypopularity`

export default function Home (){

  const pagesToGet = 20;
  const [page, setPage] = useState(()=>{return 1});
  const [loading, setLoading] = useState(()=>{return true});
  const [pool, setPool] = useState(()=>{return []})
  var url = `https://api.jikan.moe/v3/top/anime/${page}/bypopularity`;
  
  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(url);
      setPool(prevPool=>prevPool.concat(request.data.top));
      //recursively call again to get more pages
      if(page < pagesToGet)
        setPage(prevPage => prevPage+1);
      else {
        setLoading(false);
        console.log(pool);
      }
      return request;
    }
    fetchData();
  }, [page]);

  return (
    <>
    <GoogleAnalyticsHook />
    <div className="container">
      <Head>
        <title>Anime Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        { 
        loading ? 
          <div>
            Loading...
          </div>
        :
          <div>
            {pool.map((item)=>{
              return <p>{item.title}</p>
            })}
          </div> 
        }
      </main>

      <Footer />
    </div>
    </>
  )
}