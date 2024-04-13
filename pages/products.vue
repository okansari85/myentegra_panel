<template>
  <v-card flat>
    <ProductDataTable
      :items="getallproducts"
      :total-records="getproductscount"
      :loading="loading"
      :rows="rows"
      @handle-options="handleOptions"
    />
  </v-card>
</template>
<script>
/*eslint-disable*/
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Vue from "vue";
export default {
  meta: {
    auth: { authority: 1 },
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
    ...mapGetters({
      getproductscount: "products/getproductscount",
      getproductsperpage: "products/getproductsperpage",
      getallproducts: "products/getallproducts",
    }),
  },
  methods: {
    ...mapActions({
      getProducts: "products/getProducts",
    }),
    handleOptions(options) {
      console.log(options);
      let obj = {
        page: options.page+1,
        per_page: options.rows,
        search: options.filters['global'].value ? options.filters["global"].value : "",
      };
      this.loading = true;
      this.getProducts(obj).then((result) => {
        this.loading = false;

      });
    },
    clickedEdit(val) {},
    clickedDelete(val) {},
  },
  data() {
    return {
      rows:10,
      datatitle: "Ürünler",
      loading: true,
      slots: [
      ],
      keyItem: "id",
    }
  }
}
</script>
