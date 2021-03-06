module.exports = {
  siteMetadata: {
    title: `waseem.works`,
    description: `iOS Developer portfolio`,
    author: `@iamwaseem99`,
    email: `hello@waseem.works`,
    phone: `+918248899344`,
    social: {
      github: `https://github.com/devwaseem`,
      twitter: `https://twitter.com/iamwaseem99`,
      linkedin: `https://www.linkedin.com/in/devwaseem/`,
      instagram: `https://www.instagram.com/dvlp.er/`,
      Facebook: `https://www.facebook.com/dvlprwaseem`,
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `works`,
        path: `${__dirname}/src/works/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-page-transitions`,
    `gatsby-plugin-layout`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
