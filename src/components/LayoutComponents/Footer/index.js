import React from 'react'
import {Link} from 'gatsby'
import './footer.scss'
import {motion} from 'framer-motion'
import { useStaticQuery, graphql } from "gatsby"

const Footer = ({currentPath, navBarLinks})=> {


    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
        email,
        phone
        social {
            github
            twitter
            linkedin
            instagram
          }
        }
      }
    }
  `)

  const { email, phone } = data.site.siteMetadata
  const { github, instagram, linkedin, twitter } = data.site.siteMetadata.social

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
                    <div data-cursor-type="hover"><a href={`mailto:${email}`}>{email}</a></div>
                    <div data-cursor-type="hover"><a href={`tel:${phone}`}>{phone}</a></div>
                </section>

                <section className="footer-link-section footer-social-section">
                    <span>Social</span><br/>
                    <div data-cursor-type="hover"><a href={twitter}>Twitter</a></div>
                    <div data-cursor-type="hover"><a href={linkedin}>LinkedIn</a></div>
                    <div data-cursor-type="hover"><a href={instagram}>Instagram</a></div>
                    <div data-cursor-type="hover"><a href={github}>Github</a></div>
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