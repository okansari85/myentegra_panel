/*eslint-disable*/
export default function (ctx, inject) {
  let {
      app: { $axios },
  } = ctx;
const entegraApi = $axios.create()
entegraApi.defaults.withCredentials = true
entegraApi.setBaseURL("http://localhost:8000/api/")
inject('entegraApi', entegraApi)
}
