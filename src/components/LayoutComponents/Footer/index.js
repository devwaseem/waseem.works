import React from 'react'
import {Link} from 'gatsby'
import './footer.scss'
import {motion} from 'framer-motion'

const LinkIcon = ()=> {
    return (
    <div className="LinkIcon">
    <svg class="flex-shrink-0 w-4 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            >
        </path>
    </svg>
    </div>
    )
    
}


const Footer = ({currentPath, navBarLinks})=> {


    return (
        <footer>
            <div className="footer-container">
                <section className="footer-author-section">
                    <motion.div className="footer-author-description">
                        Crafting Digital Experiences where <br/>
                        <motion.div className="footer-author-description-highlight" data-cursor-type="hover" whileHover={{color: '#6FCF97'}}>Creativity</motion.div> meets <motion.div className="footer-author-description-highlight" data-cursor-type="hover" whileHover={{color: '#6FCF97'}}>Technology</motion.div>.
                    </motion.div>
                </section>

                <div className="footer-links-container">
                <section className="footer-link-section footer-navigation-section">
                    <span>Navigation</span><br/>
                    {
                        navBarLinks.map(link =>  {

                            return (
                                <div data-cursor-type="hover">
                                    <Link className={(currentPath === link.path) ? "active" : ""} to={link.path} key={link.name}>{link.name}</Link>
                                </div>
                            )
                        })
                    }
                </section>

                <section className="footer-link-section footer-contact-section">
                    <span>Start a Conversation</span><br/>
                    <div data-cursor-type="hover"><a href="mailto:hello@waseem.works">hello@waseem.works</a></div>
                    <div data-cursor-type="hover"><a href="tel:+918248899344">+91 8248899344</a></div>
                </section>

                <section className="footer-link-section footer-social-section">
                    <span>Social</span><br/>
                    <div data-cursor-type="hover"><a href="/">Twitter</a></div>
                    <div data-cursor-type="hover"><a href="/">LinkedIn</a></div>
                    <div data-cursor-type="hover"><a href="/">Instagram</a></div>
                    <div data-cursor-type="hover"><a href="/">Github</a></div>
                </section>
                </div>
            </div>
            <div className="footer-rights">
                <div>© 2021 Waseem Akram. All rights reserved.</div>
                <div>Made with love from 🇮🇳</div>
                <div className="footer-scroll-button" data-cursor-type="hover" onClick={()=>{
                    console.log("scrollToTop")
                    window.scrollTo({top: 0, behavior: 'smooth'})
                }}/>
                
            </div>
        </footer>
    )

}

export default Footer