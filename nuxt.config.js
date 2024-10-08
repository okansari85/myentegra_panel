require('dotenv').config()
/*eslint-disable*/
import colors from 'vuetify/es5/util/colors'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - my_entegra_panel',
    title: 'my_entegra_panel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', {treeShake: true}]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    'primevue/nuxt',
    'vue-sweetalert2/nuxt',
    'vue2-editor/nuxt',
    ['v-currency-field/nuxt-treeshaking', {
      locale: 'tr-TR',
      decimalLength: 2,
      autoDecimalMode: false,
      min: null,
      max: null,
      defaultValue: 0,
      valueAsInteger: false,
      allowNegative: false
    }],
  ],

  primevue: {
    components: [
    "Menubar",
    "InputText",
    "InputNumber",
    "Button",
    "Galleria",
    "Inplace",
    "Message",
    "BreadCrumb",
    "Datatable",
    "Column",
    "Card",
    "Toolbar",
    "Dialog","Toast","Chips","InputMask","ProgressBar","CascadeSelect","FileUpload" ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials:true,
  },


  watchers: {
    webpack: {
      ignored: /node_modules/
    }
  },

  auth: {
    redirect:false
  },

  auth: {
    cookie: {
      options: {
        secure: true,
        name: 'XSRF-TOKEN'
      }
    },

    redirect: {
      login: "/login",
      logout: "/login",
      callback: false,
      home: "/"

    },

    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.baseURL,
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName:false,
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json'
              }
          },

          user: {
            url: '/api/user',
            method: 'get',
            propertyName: false,
            withCredentials: true,
                    headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                    }
        }
        },
      }
    },
    plugins: [
      '~/plugins/axios.js',
      '~/plugins/vue-tree-select.js',
      '~/plugins/vue-mask.js',
      '~/plugins/vuetify-mask.js',
    ]
  },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'tr'
    }
  },

  router: {
    middleware: ['auth'],
    base: process.env.NODE_ENV === "development" ? process.env.BASE_URL : "/panel/"
  },


  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
   },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["primevue"]
  }
}
