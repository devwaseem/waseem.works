/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SEO from './seo'
import { Link } from "gatsby"
import Cursor from './Cursor'
import "./layout.css"
// import classNames from "classnames";
import {motion} from 'framer-motion'
import {useLocation} from "@reach/router"
import Footer from '../components/LayoutComponents/Footer'
import MenuButton from '../components/MenuButton/index'
import disableScroll from 'disable-scroll';

// images
import Logo from '../images/logo.svg'

import {isMobileOnly, isMobile} from 'react-device-detect';


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
                  <Link to={link.path}>{link.name}</Link>
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
    },

    collapsed:{
      left: '-100%',
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
          <a className="title" data-cursor-type="hover">Waseem Akram</a>
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
        transition={{duration: 0.6, type: "tween"}}
      >
          {isMenuExpanded ? "expanded" : "collapsed"}
      </motion.div>
    </div>
  )
}

const Layout = ({ children }) => {

  const navBarLinks = [
    {name: "Home", path: "/"},
    {name: "About", path: "/about"},
    {name: "Projects", path: "/projects"},
    {name: "Articles", path: "/articles"},
    {name: "Contact", path: "/contact"}
  ]

  const location = useLocation()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const currentPath = ()=> {
    const {pathname} = location
    if(pathname === "/") {
      return "Home"
    }else {
      return pathname
    }
  }


  return (
    <>
      <SEO title={`Waseem. | ${currentPath()}`}/>
      { !isMobile && <Cursor/>}
      <div className="container">
        {/*
          {
          isMobileOnly ? 
          <TopNavBar 
            isMenuExpanded={isMenuExpanded} 
            setMenuExpanded={setMenuExpanded} 
            navBarLinks={navBarLinks}
          />
          :
          <LeftNavContainer 
            isMenuExpanded={isMenuExpanded} 
            setMenuExpanded={setMenuExpanded} 
            navBarLinks={navBarLinks}
          />
        }
        */}

          <TopNavBar 
            navBarLinks={navBarLinks}
          />
          <LeftNavContainer 
            navBarLinks={navBarLinks}
          />
        <div className="layout-body-container">
          <div className="layout-body">
            {children}
          </div>
          
          <Footer
            currentPath={location.pathname}
            navBarLinks={navBarLinks}
          />
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
