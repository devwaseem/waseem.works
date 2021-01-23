import React, {useEffect, useState} from 'react'
import {useLocation} from '@reach/router'
import classNames from "classnames";
import './cursor.scss'



const Cursor = () => {
    const [delayedPosition, setDelayedPosition] = useState({x: 0, y: 0});
    const [position, setPosition] = useState({x: 0, y: 0});
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const location = useLocation();
    
     useEffect(() => {
         addEventListeners();
         handleLinkHoverEvents();
         return () => removeEventListeners();
     }, [location]);
  
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('*[data-cursor-type="hover"]').forEach(el => {
        el.addEventListener("mousemove", (e) => {
          const {offsetX: x, offsetY: y} = e,
          {offsetWidth: width, offsetHeight: height} = el
          
          const move = 5,
          xMove = x / width * ( move * 2 ) - move,
          yMove = y / height * ( move * 2 ) - move
          el.style.transform = `translate(${xMove}px,${yMove}px)`
          setLinkHovered(true)
        });
        el.addEventListener("mouseleave", (e) => {
          e.target.style.transform = ''
          setLinkHovered(false)
        });
      });
    };
  
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };
  
    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  
    const onMouseDown = () => {
      setClicked(true);
    };
    
    const onMouseUp = () => {
      setClicked(false);
    };
  
    const onMouseLeave = () => {
      setHidden(true);
    };
      
    const onMouseEnter = () => {
      setHidden(false);
    };
      
    const cursorOuterClasses = classNames(
      'cursor',
      {
        'cursor--link-hovered': linkHovered,
        'cursor--clicked': clicked,
        'cursor--hidden': hidden
      }
    );    
    
    const cursorInnerClasses = classNames(
      "cursor-inner",
      {
        'cursor--hidden': hidden
      }
    );  
  
    const onMouseMove = (e) => {
      var position = {x: e.clientX, y: e.clientY}
      setPosition(position);
      setTimeout(()=>{
        setDelayedPosition(position)
      },100)
    };                                                               
     
    const isMobile = () => {
      const ua = navigator.userAgent;
      return /Android|Mobi/i.test(ua);
    };

    return <div>
          <div className={cursorOuterClasses}
                style={{
                    left: `${delayedPosition.x}px`,
                    top: `${delayedPosition.y}px`
                }}
            />

            <div className={cursorInnerClasses}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            />
    </div>
    
  }

export default Cursor