import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { motion } from 'framer-motion'
import '../styles/index.scss'


const Shady = ({children}) => {
  return (
    <span className="shady">{children}</span>
  )
}

const IndexPage = () =>  {
  

  return (
      <motion.div style={{height: '1000px'}}>
      <div className="home-space"/>
        <div >
          <img>
          
          </img>
        </div>
        <h1 className="home-title-name">Hi, I'm Waseem.</h1>
        <h1 className="home-title">I design and build Products for </h1>
        <h1 className="home-title"><Shady>[</Shady><span className="normal">Mobile </span><Shady>init]</Shady> and <span><Shady>&lt;</Shady>Web </span><Shady>/&gt;</Shady> .</h1>
        <br/>
        <h1>&lt; Site under Construction /&gt;</h1>
      </motion.div>
  )
}

export default IndexPage
