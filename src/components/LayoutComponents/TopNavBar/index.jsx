import React, {useEffect, useState} from 'react'
import { Link, navigate } from "gatsby"
import {motion} from 'framer-motion'
import MenuButton from '../../MenuButton'
import disableScroll from 'disable-scroll';
import {isMobileOnly, isMobile} from 'react-device-detect';

// images
import Logo from '../../../images/logo.svg'

import './styles.scss'

const TopNavBar = ({navBarLinks}) => {

    const [isMenuExpanded, setMenuExpanded] = useState(false);
  
    const toggleMenu = () => {
      if(isMenuExpanded) {
        disableScroll.off()
        setMenuExpanded(false)
      }else {
        disableScroll.on()
        setMenuExpanded(true)
      }
    }
    
    const linkContainerVariants = {
      initial: {
        left: '-100%'
      },
  
      expanded: {
        left: '0%',
        transition: {
          ease: "easeIn",
          duration: 0.6, 
          type: "tween",
        }
      },
  
      collapsed:{
        left: '-100%',
        transition: {
          ease: "easeOut",
          duration: 0.6, 
          type: "tween",
          delay: 0.8,
        }
      }
    }

    const linkVariants = {
        open: {
            opacity: 1, 
            rotate: 0,
            y: '0px',
        },

        closed: {
            opacity: 0, 
            rotate: -5,
            y: '24px',
        }
    }
  
    return (
      <div className="topNav-container">
        <div className="topNav-inner-container">
          {
            isMobileOnly ? 
            <Link to="/" className="logo">
                  <img src={Logo}  alt="logo"/>
            </Link>
            :
            <Link to="/" className="title" data-cursor-type="hover">Waseem Akram</Link>
          }
          <div className="link-container">
            {
              isMobileOnly ?
                <MenuButton 
                  className="menu"
                  isExpanded={isMenuExpanded}
                  onClick={toggleMenu}
                />
              :
                navBarLinks
                  .filter((link)=> link.path !== "/")
                  .map(link => <Link className="link" data-cursor-type="hover" key={link.name} to={link.path}>{link.name}</Link> )
            }
          </div>
        </div>
        <motion.div 
          className="topNav-link-container"
          variants={linkContainerVariants}
          initial="initial"
          animate={isMenuExpanded ? "expanded" : "collapsed"}
          transition={{staggerChildren: 0.5}}
        >
            <motion.div >
            {
              navBarLinks.map((link, index)=>{
                return (
                  <motion.p 
                        key={link.name} 
                        variants={linkVariants} 
                        initial="closed" 
                        animate={ isMenuExpanded ? "open" : "closed" } 
                        transition={{delay: isMenuExpanded ? 0.8 + (index * 0.08): (index * 0.08) }}
                        onClick={()=>{
                            toggleMenu()
                            setTimeout(()=>{
                                navigate(link.path)
                            }, 1500)
                        }}
                        >
                    {link.name}
                  </motion.p>
                )
              })
            }
            </motion.div>
        </motion.div>
      </div>
    )
}

export default TopNavBar