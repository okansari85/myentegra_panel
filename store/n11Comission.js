/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    comissions : [],
})
export const getters = {
  getallcomissions(state){
      return state.comissions.data
  },
  getcomissionscount(state){
      return state.comissions.total
  },
  getcommissionperpage(state){
      return state.comissions.per_page
  },
}
export const mutations = {
  SET_COMISSION_WITH_PAGES(state,data){
      state.comissions=data
  },
}
export const actions = {
  async getComissions({commit},request){

      var params = new URLSearchParams();
      params.append("page", request.page);
      params.append("per_page",request.per_page);
      params.append("search", request.arama);


      var gidecek = {
      params: params
      };


   return await this.$entegraApi.$get('/getN11CommissionRates', gidecek).then(res=>{
    console.log(res)
      commit('SET_COMISSION_WITH_PAGES', res)
      return res;
   })
},

async getComissionsFromN11({commit},request){
return await this.$entegraApi.$get('/getN11CategoryCommisionsFromN11').then(res=>{
  console.log(res)
})
},
}
