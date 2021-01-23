import React from 'react'
import {motion}  from 'framer-motion'
import './styles.scss'

const MenuButton = ({isExpanded, className,...rest}) => {

    const topBarVariants = {
        initial: {
            top: '42%',
        },

        active: {
            top: '50%',
        }
    }

    const bottomBarVariants = {
        initial: {
            bottom: '42%',
            opacity: 1
        },

        active: {
            bottom: '50%',
            opacity: 0
        }
    }

    return (
        <div className={"menu-button-container " + className} {...rest} >
            <motion.div 
                className="menu-button-bar" 
                variants={topBarVariants} 
                initial="initial"
                animate={isExpanded ? "active" : "initial"}
                transition={{
                    type: 'tween',
                    duration: 0.5,
                }}
                />
            <motion.div 
                className="menu-button-bar" 
                variants={bottomBarVariants}
                initial="initial"
                animate={isExpanded ? "active" : "initial"}
                transition={{
                    type: 'tween',
                    duration: 0.5,
                }}
            />
        </div>

    )
}

export default MenuButton
