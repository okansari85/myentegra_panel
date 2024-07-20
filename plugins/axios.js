/*eslint-disable*/
export default function (ctx, inject) {
  let {
      app: { $axios },
  } = ctx;
const entegraApi = $axios.create()
entegraApi.defaults.withCredentials = true
entegraApi.setBaseURL("https://sarielektronik.com/api/public/api/")
inject('entegraApi', entegraApi)
}
