/*eslint-disable*/
import Vue from 'vue';

const getDefaultState = () => {
  return {
    orders: [],
  }
}
export const state = () => ({
    orders : [],
})
export const getters = {
  getallorders(state){
      return state.orders.data
  },
  getorderscount(state){
      return state.orders.total
  },
  getordersperpage(state){
      return state.orders.per_page
  },
}
export const mutations = {
  SET_ORDERS_WITH_PAGES(state,data){
      state.orders=data
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
},
}
export const actions = {
  async getOrders({commit},request){

      var params = new URLSearchParams();
      params.append("page", request.page);
      params.append("per_page",request.per_page);
      params.append("search", request.search);
      params.append("status",request.status);


      var gidecek = {
      params: params
      };

      return await this.$entegraApi.$get('/orders', gidecek).then(res=>{
        commit('SET_ORDERS_WITH_PAGES', res)
        return res;
     })
  },
  resetState({ commit }) {
    commit('RESET_STATE')
  },
}
