import Head from 'next/head'
import Footer from '@components/Footer'
import GoogleAnalyticsHook from '@components/GoogleAnalyticsHook'
import Game from '@components/Game'
//`https://api.jikan.moe/v3/top/anime/${1}/bypopularity`

export default function Home (){


  return (
    <>
    <GoogleAnalyticsHook />
    <div className="container">
      <Head>
        <title>Anime Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Game />
      

      <Footer />
    </div>
    </>
  )
}