<!-- pages/category/_id.vue -->

<template>
  <v-card flat>
    <CBreadCrumb :breadcrumb-items="breadcrumb" />
  </v-card>
</template>

<script>
/*eslint-disable*/
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Vue from "vue";
export default {
  computed: {
    ...mapState({
      breadcrumb: (state) => state.breadcrumb.breadcrumb,
    }),
  },
  data() {
    return {
      category: {}, // Kategori verilerini tutacak
    };
  },
  async asyncData({ store, params }) {
    const categoryId = params.id;
    await store.dispatch('breadcrumb/fetchBreadcrumb', categoryId);
  },
};
</script>
