/*eslint-disable*/
export default function (ctx, inject) {
  let {
      app: { $axios },
  } = ctx;
const entegra = $axios.create()
entegra.defaults.withCredentials = true
entegra.setBaseURL(process.env.apiURL)
inject('entegraApi', entegra)
}
