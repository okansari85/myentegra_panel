/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
  breadcrumb: [],
});

export const mutations = {
  setBreadcrumb(state, breadcrumb) {
    state.breadcrumb = breadcrumb;
  },
};

export const actions = {
  async fetchBreadcrumb({ commit }, categoryId) {
    try {
      const response = await this.$entegraApi.$get(`/product_categories/${categoryId}`);
      const breadcrumb =  await generateBreadcrumbs(response.original);
      commit('setBreadcrumb', breadcrumb);
      return response.original.children;
    } catch (error) {
      console.error('Error fetching breadcrumb:', error);
    }


  },
};

async function generateBreadcrumbs(data) {
  const breadcrumbs = [];
  while (data) {
    breadcrumbs.unshift({ label: data.name, to: `/categories/${data.id}` });
    data = data.parent;
  }
  return breadcrumbs;
}
