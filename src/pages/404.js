import React from "react"
import {BrowserView, MobileView} from 'react-device-detect';
import Cursor from "../components/Cursor"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Cursor/>
    <BrowserView>
    <div style={{position: 'fixed', width: '100vw', height: '100vh'}}>
      <video width="100%" height="100%" src="https://media.giphy.com/media/xUPGcEliCc7bETyfO8/giphy.mp4" autoPlay muted playsInline /> 
    </div>
    </BrowserView>
    <MobileView>
    <div style={{position: 'fixed', width: '100vw', height: '100vh'}}>
      <video width="100%" height="100%" src="https://media.giphy.com/media/YyKPbc5OOTSQE/giphy.mp4" autoPlay muted playsInline loop/> 
    </div>
    </MobileView>
  </>
)

export default NotFoundPage
