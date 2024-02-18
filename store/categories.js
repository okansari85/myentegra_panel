/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
  categories : [],
})

export const mutations = {
  SET_CATEGORIES(state,data){
      state.categories= data;
  },
  ADD_CATEGORY(state,data){
    state.categories.push(data)
  },
  EDIT_CATEGORY(state,data){
      const ogIndex = state.categories.findIndex(t => t.id === data.id)
      Vue.set(state.categories, ogIndex, data);
      //state.malzemeler[ogIndex] = data;
  },
  DELETE_CATEGORY(state,data){
      const index = state.categories.findIndex(p => p.id === data)
      state.categories.splice(index, 1)
  }

}

export const actions = {

async getMainCategories({commit},request){
       const res =await this.$entegraApi.$get('/product_categories')
       commit('SET_CATEGORIES',res.original);
},

async updateCategoryOrder({commit},request){

    console.log(request.categories)

    var params= new URLSearchParams;
    params.append("categories",JSON.stringify(request.categories))

    var gidecek = {
        params: params
    };
    await this.$entegraApi.$post(`/product_categories`,null, gidecek)
},

async editCategory ({commit},request){

  var params = new URLSearchParams;
  params.append("id",request.category_id);
  params.append("name",request.category_name);

  var gidecek = {
      params:params
  }

  let res= await this.$entegraApi.$put(`/product_categories/${request.category_id}`,null, gidecek);
  commit('EDIT_CATEGORY',res)
},

async saveCategory({commit},request){
  var params= new URLSearchParams;
  params.append("category_name",request.category_name)
  params.append("parent_id",request.parent_id)

  var gidecek = {
      params: params
  };

  let res=await this.$entegraApi.$post('/addCategory',null, gidecek);
  commit('ADD_CATEGORY',res);
},

async deleteCategory({commit},request){
  let res = await this.$entegraApi.delete(`/product_categories/${request}`);
  commit('DELETE_CATEGORY',request)
}

}
