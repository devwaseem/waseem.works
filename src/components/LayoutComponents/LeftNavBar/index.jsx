import React, {useEffect, useState} from 'react'
import { Link, navigate } from "gatsby"
import {motion} from 'framer-motion'
import MenuButton from '../../MenuButton'
import disableScroll from 'disable-scroll';
import {isMobileOnly, isMobile} from 'react-device-detect';

// images
import Logo from '../../../images/logo.svg'

import './styles.scss'

const LeftNavContainer = ({navBarLinks}) => {
    const expandAnimation = {width:'100%'}
    const collapseAnimation = {width: '12%'}
  
    const [isMenuExpanded, setMenuExpanded] = useState(false);
    const [menuVisibility, setMenuVisibility] = useState('hidden');
  
    const toggleMenu = () => {
      if(isMenuExpanded) {
        disableScroll.off()
        setMenuExpanded(false)
      }else {
        disableScroll.on()
        setMenuExpanded(true)
      }
    }
  
    useEffect(()=> {
  
      function windowScrolled(e){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          setMenuVisibility('visible')          
        } else {
          setMenuVisibility('hidden')
        }
      } 
  
      window.addEventListener('scroll', windowScrolled)
      return () => {
        window.removeEventListener('scroll', windowScrolled)
      }
    },[])
  
    const menuVisibilityVariation = {
      hidden: {
        y: '24px',
        opacity: 0,
        transition: {
          type: 'tween',
          ease: "easeOut" 
        }
      },
  
      visible: {
        y: '0px',
        opacity: 1,
        transition: {
          type: 'tween',
          ease: "easeIn" 
        }
      }
    }
  
    return (
      <motion.div className="leftNav" animate={isMenuExpanded ? expandAnimation: collapseAnimation} transition={{delay: isMenuExpanded ? 0 : 1.2, type: 'tween'}}>
            <motion.div className="leftNav-link-container" >
                {
                  navBarLinks.map((link, index) => {
                    return <motion.div 
                    key={index}
                    data-cursor-type="hover" 
                    initial={{
                        opacity: 0,
                        y: 40,
                        rotate: -2,
                    }}
                    animate={{
                        opacity: isMenuExpanded ? 1 : 0,
                        y: isMenuExpanded ? 0 : 40,
                        rotate: isMenuExpanded ? 0 : -2,
                    }}
                    transition={{
                      delay: isMenuExpanded ? 0.7 + (index * 0.1) : 0.7 - (index * 0.05),
                      type: 'tween',
                      duration: 0.4
                    }}
                      >
                    <span
                    onClick={()=>{
                        setTimeout(()=>{
                          navigate(link.path)
                        },1500)
                        toggleMenu()
                      }} 
                    >{link.name}</span>
                    </motion.div>
                  })
                }
            </motion.div>
          <div className="leftNav-container">
            <div className="leftNav-menu-container" >
                <motion.div
                initial="hidden"
                animate={menuVisibility}
                variants={menuVisibilityVariation}
                >
                <MenuButton 
                  className="leftNav-bar-container"
                  onClick={toggleMenu}
                  isExpanded={isMenuExpanded}
                  data-cursor-type="hover"
                />
                </motion.div>
            </div>
            <div className="leftNav-logo-container">
                <Link to="/" className="leftNav-logo">
                  <img src={Logo}  alt="logo" data-cursor-type="hover"/>
                </Link>
              </div>
              <div className="leftNav-space"/>
            <motion.div className="leftNav-designation-container" 
              drag 
              dragElastic={0.2}
              dragConstraints={{left: 0,right: 0, bottom: 0, top: 0}}>
              <div className="leftNav-designation">
                <span>Fullstack</span><br/>
                <span>Software Engineer</span>
              </div>
            </motion.div>
            </div>
          </motion.div>
    )
  }

export default LeftNavContainer