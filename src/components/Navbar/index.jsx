import React, { useState } from "react"
import { Link } from "gatsby"
import './navbar.scss'
import {useSpring, animated} from 'react-spring'


const NavBar = ({color, background}) => {
    const defaultText = "waseem."
    const activeText = "waseem.works"
    const [defaultNavText, changeDefaultNavText] = useState(defaultText)
    const [slideAnimation, setSlideAnimation] = useSpring(()=>({transform: 'translateX(0vh)'}))

    return (
        <div 
        className="navbar-container"
        style={{background}}
        onMouseEnter={()=>{
            changeDefaultNavText(activeText)
            setSlideAnimation({transform: 'translateX(-3px)'})
        }}
        onMouseLeave={()=>{
            changeDefaultNavText(defaultText)
            setSlideAnimation({transform: 'translateX(0vh)'})
        }}>
        <Link to="/"> 
            <animated.p 
                className="navbar-link"
                style={{...slideAnimation, color}}
            >
                {defaultNavText}
            </animated.p>
        </Link>
        </div>
    )
}

export default NavBar