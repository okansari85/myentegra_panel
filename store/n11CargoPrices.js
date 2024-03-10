/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    cargoPrices : [],
})
export const mutations = {
    SET_N11_CARGO_PRICES(state,data){
        state.cargoPrices=data
    },
  }
export const actions = {
    async getN11CargoPrices({commit},request){
     return await this.$entegraApi.$get('/getN11CargoPrices').then(res=>{
        commit('SET_N11_CARGO_PRICES', res)
        return res;
     })
  },
}
  