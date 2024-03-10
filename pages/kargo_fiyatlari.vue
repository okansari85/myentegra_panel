<template>
 <v-card flat>
    <v-toolbar color="primary" dark extended extension-height="63" flat>
      <v-icon>mdi-magnify</v-icon>
      <v-toolbar-title style="margin-left:10px;">
        N11 Kargo Fiyatları
      </v-toolbar-title>
    </v-toolbar>
    <SimpleDataTable
    :columns="columns"
    :items="cargoPrices"
    />
  </v-card>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
  async created() {
      this.loading=true;
      await this.getN11CargoPrices().then(()=>{
        this.loading=false;
      });
  },
  data(){
    return {
       loading:false,
       columns: [
            {field: 'desi', header: 'Desi'},
            {field: 'yk_price', header: 'Yurtiçi'},
            {field: 'aras_price', header: 'Aras'},
            {field: 'ptt_price', header: 'PTT'},
            {field: 'mng_price', header: 'MNG'},
            {field: 'surat_price', header: 'Sürat'},
            {field: 'sendeo_price', header: 'Sendeo'},
        ],

    }
  },
  computed:{
  ...mapState({
        cargoPrices : state=> state.n11CargoPrices.cargoPrices,
      }),
  },
  methods:{
    ...mapActions(
        {
          getN11CargoPrices:'n11CargoPrices/getN11CargoPrices',
        }),
  }

}

</script>