import axios from 'axios'

export default({ Vue }) => {
  let baseURL = null
  if (process.env.__ENV__ === 'dev') {
    baseURL = 'http://localhost:4000'
  } else if (process.env.__ENV__ === 'production') {
    baseURL = 'INCLUDE PRODUCTION URL'
  } else {
    baseURL = 'INCLUDE QA URL FOR EXAMPLE'
  }

  Vue.prototype.$axios = axios.create({
    baseURL
  })
}

