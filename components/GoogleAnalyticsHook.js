import { useEffect } from 'react'
import ReactGA from 'react-ga'

export default function GoogleAnalyticsHook() {

    useEffect(()=>{
        ReactGA.initialize('UA-178410803-6')
        ReactGA.set({ page: window.location.pathname })
        ReactGA.pageview(window.location.pathname)
    }, [])

    return (
        <>        
        </>
    )
}