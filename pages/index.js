import Head from 'next/head'
import Footer from '@components/Footer'
import GoogleAnalyticsHook from '@components/GoogleAnalyticsHook'
import Game from '@components/Game'
import About from '@components/About'
import Intro from '@components/Intro'
//`https://api.jikan.moe/v3/top/anime/${1}/bypopularity`

export default function Home (){


  return (
    <>
      <GoogleAnalyticsHook />
      <Head>
        <title>Ichiban</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Ichiban" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ichiban.netlify.app/" />
        <meta property="og:image" content="https://ichiban.netlify.app/imgs/logo.png" />
        <meta property="og:description" content="An anime popularity guessing game!" />
        <meta
          name="Description"
          content="An anime popularity guessing game!"
        /> 
      </Head>
      <Intro />
      <Game />
      <About />
      <Footer />
    </>
  )
}