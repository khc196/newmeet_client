
const webpack = require('webpack')
const env = require('dotenv').config()


module.exports = {
  mode: 'universal',
  env: env.parsed,
  /*
  ** Headers of the page
  */
  head: {
    title: "NewMeet",
    meta: [
      { charset: 'utf-8' },
      { name:"viewport", content:"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
    ],
    script:[
      {src:"/assets/plugins/pace/pace.min.js"},
      {src:"/assets/plugins/jquery/jquery-1.11.3.min.js"},
      {src:"/assets/plugins/bootstrapv3/js/bootstrap.min.js"},
      {src:"/assets/plugins/jquery-block-ui/jqueryblockui.min.js"},
      {src:"/assets/plugins/jquery-unveil/jquery.unveil.min.js"},
      {src:"/assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js"},
      {src:"/assets/plugins/jquery-numberAnimate/jquery.animateNumbers.js"},
      {src:"/assets/plugins/jquery-validation/js/jquery.validate.min.js"},
      {src:"/assets/plugins/bootstrap-select2/select2.min.js"},
      {src:"/assets/plugins/jquery-notifications/js/messenger.min.js"},
      {src:"/assets/plugins/jquery-notifications/js/messenger-theme-flat.js"},
      {src:"https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.5/js/swiper.min.js"},
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/static/fonts/helvetica/style.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:'~/plugins/axios.js'},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    'nuxt-device-detect',
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    vendor: ['mixitup'],
  },
  axios: {
    baseURL: "https://newmeet.herokuapp.com/api",
    //baseURL: "http://localhost:8000/api",
  },
  
}
