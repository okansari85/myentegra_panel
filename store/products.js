/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    products : [],
    n11_product: [],
})
export const getters = {
  getallproducts(state){
      return state.products.data
  },
  getproductscount(state){
      return state.products.total
  },
  getnaceperpage(state){
      return state.products.per_page
  },
}
export const mutations = {
  SET_PRODUCTS_WITH_PAGES(state,data){
      state.products=data
  },
  SET_N11_PRODUCT(state,data){
    state.n11_product=data
},
}
export const actions = {
  async getProducts({commit},request){

      var params = new URLSearchParams();
      params.append("page", request.page);
      params.append("per_page",request.per_page);
      params.append("search", request.search);


      var gidecek = {
      params: params
      };


   return await this.$entegraApi.$get('/products', gidecek).then(res=>{
      commit('SET_PRODUCTS_WITH_PAGES', res.original)
      return res.original;
   })
  },
  async getN11ProductBySellerCode({commit},sellercode){
        return await this.$entegraApi.$get('/getN11ProductBySellerCode/'+sellercode).then(res=>{
          commit('SET_N11_PRODUCT', res.product)
          return res;
       })
  }
}
