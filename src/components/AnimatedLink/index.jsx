import React, {useState} from 'react';
import { Link } from 'gatsby'
import {animated, useSpring} from 'react-spring'

import './AnimatedLink.scss'

const AnimatedLink = ({copyToClipboard, to, text, copiedText="Copied!", internal}) => {
    
    const [defaultText, changeDefaultText] = useState(text)
    const [slideAnimation, setSlideAnimation] = useSpring(()=>({transform: 'translateX(0px)'}))
    const copySupported = document.queryCommandSupported('copy') //check if browser support copy to clipboard
 
    return (
        <animated.div 
        className="animated-link-container" 
        style={slideAnimation}
        onMouseEnter={()=>{
            if(copyToClipboard) {
                changeDefaultText("Copy to clipboard")
            }
            setSlideAnimation({transform: 'translateX(30px)'})
        }}
        onMouseLeave={()=>{
            setSlideAnimation({transform: 'translateX(0px)'})
            if(copyToClipboard && copySupported) {
                changeDefaultText(text)
            }
        }}
        onMouseDown={()=> {
            if(copyToClipboard  && copySupported) {
                changeDefaultText(copiedText)
            }
            console.log("mouseDown")
        }}
        onMouseUp={()=> {
            if(copyToClipboard) {
                changeDefaultText("Copy to clipboard")
            }
        }}
        onClick={() => {
            if(copyToClipboard && copySupported){
                var textField = document.createElement('textarea')
                textField.innerText = text
                document.body.appendChild(textField)
                textField.select()
                document.execCommand('copy')
                textField.remove()
            }else {
                window.location.href = to
            }
        }}
        >
        {
            internal ? 
            <Link href={!copyToClipboard ? to : null}>
                <p className="animated-link-text">  {defaultText} </p>
            </Link>
            :
            <a href={!copyToClipboard ? to : null} target="_blank" rel="noopener noreferrer">
                <p className="animated-link-text">  {defaultText} </p>
            </a>
        }
        </animated.div>
    )

}

export default AnimatedLink