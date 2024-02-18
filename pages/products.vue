<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended extension-height="64" flat>
      <v-icon>mdi-magnify</v-icon>
      <v-toolbar-title style="margin-left:10px;">
        Ürün Arama
      </v-toolbar-title>
    </v-toolbar>
    <SearchProducts
      :headers="headers"
      :items="getallproducts"
      :loading="loading"
      :items-length="getproductscount"
      :title="datatitle"
      :slots="slots"
      :keyOfItem="keyItem"
      @handle-options="handleOptions"
    >
      <template v-slot:tehlike_sinifi="{ degisken }">
        <v-chip :color="getColor(degisken.tehlike_sinifi)" small dark label>
          {{ degisken.tehlike_sinifi }}
        </v-chip>
      </template>
    </SearchProducts>
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
      // you won't need to destructure if
      getproductscount: "products/getproductscount",
      getproductsperpage: "products/getproductsperpage",
      getallproducts: "products/getallproducts",
    }),
  },
  methods: {
    ...mapActions({
      getProducts: "products/getProducts",
    }),
    handleOptions(options, search) {
      let obj = {
        arama: search,
        page: options.page,
        per_page: options.itemsPerPage,
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
      arama: "",
      headers: [
        { text: "ÜRÜN KODU", value: "productCode", sortable: false },
        { text: "FİYAT", value: "price", sortable: false },
        { text: "STOK", value: "price", sortable: false },
        { text: "DESİ", value: "desi", sortable: false },
        {text: 'Actions', value: 'actions', sortable: false }
      ],
      datatitle: "Ürünler",
      loading: true,
      slots: [
      ],
      keyItem: "id",
    }
  }
}
</script>
