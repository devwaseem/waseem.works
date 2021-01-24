/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SEO from '../components/seo'
import { Link, navigate } from "gatsby"
import Cursor from '../components/Cursor'
// import classNames from "classnames";
import { motion, AnimatePresence } from 'framer-motion'
import {useLocation} from "@reach/router"
import Footer from '../components/LayoutComponents/Footer'
import MenuButton from '../components/MenuButton/index'
import disableScroll from 'disable-scroll';

// images
import Logo from '../images/logo.svg'

import {isMobileOnly, isMobile} from 'react-device-detect';

import LeftNavBar from '../components/LayoutComponents/LeftNavBar'
import TopNavBar from '../components/LayoutComponents/TopNavBar'


const Layout = ({children, location }) => {

  const navBarLinks = [
    {name: "Home", path: "/"},
    {name: "About", path: "/about"},
    {name: "Projects", path: "/projects"},
    {name: "Articles", path: "/articles"},
    {name: "Contact", path: "/contact"}
  ]

  location.key = ""
  const [hasMounted, setHasMounted] = React.useState(false);
  // const location = useLocation()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  //prevent react rehydration bug
  if (!hasMounted) { 
    return null;
  }

  const duration = 0.5

  const variants = {
    initial: {
      opacity: 0,
      y: '40px',
      
      originX: 0,
      originY: 0
    },
    enter: {
      opacity: 1,
      rotate: 0,
      originX: 0,
      originY: 0,
      y: '0px',
      transition: {
        duration: duration,
        delay: duration,
        when: 'beforeChildren',
      },
    },
    exit: {
      originX: 0,
      originY: 0,
      opacity: 0,
      y: '40px',
      transition: { 
        duration: duration,
      },
    },
  }
  

  const currentPath = ()=> {
    const {pathname} = location
    const path = navBarLinks.filter(link=>(link.path === pathname))
    return path[0].name
  }


  return (
    <>
      <SEO title={`Waseem. | ${currentPath()}`}/>
      { !isMobile && <Cursor/>}
      <div className="container">
          <TopNavBar 
            navBarLinks={navBarLinks}
          />
          <LeftNavBar 
            navBarLinks={navBarLinks}
          />
        <div className="layout-body-container">
          
        <div className="layout-body">
          <AnimatePresence>
              <motion.main
                key={currentPath()}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
              {children}
              </motion.main>
          </AnimatePresence>    
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
