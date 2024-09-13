/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    cargoPrices : [],
})
export const mutations = {
    SET_HB_CARGO_PRICES(state,data){
        state.cargoPrices=data
    },
  }
export const actions = {
  async getHbCargoPrices({commit},request){
     return await this.$entegraApi.$get('/getHbCargoPrices').then(res=>{
        commit('SET_HB_CARGO_PRICES', res)
        return res;
     })
  },
  async getCargoPriceFromFile({commit},formData){
    return await this.$entegraApi.post('/importHbCargoPricesFromFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res=>{
      console.log(res);
      commit('SET_HB_CARGO_PRICES', res.data)
      return res.data;
   });
 },
}
