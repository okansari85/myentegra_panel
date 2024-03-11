<template>
 <v-card flat>
    <v-toolbar color="primary" dark extended extension-height="63" flat>
      <v-icon>mdi-magnify</v-icon>
      <v-toolbar-title style="margin-left:10px;">
        N11 Kargo Fiyatları
      </v-toolbar-title>
    </v-toolbar>
    <v-card eager class="mx-auto" style="margin-top:-34px" max-width="90%" flat>
    <Toast />
    <Toolbar class="mb-4">
        <template #start>
            <Button
            @click="openDialog"
            label="Kargo Fiyatlarını Güncelle"
            icon="pi pi-plus"
            class="p-button-success mr-2"/>
        </template>
    </Toolbar>
    </v-card>
    <SimpleDataTable
    :columns="columns"
    :items="cargoPrices"
    />
    <Dialog :visible.sync="showDialog" :styles="{width: '450px'}" header="Confirm" :modal="true">
    <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span >Kargo fiyat listesini güncellemek ister misiniz?</span>
    </div>
    <template #footer>
        <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="showDialog = false"/>
        <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="confirmDialog" />
    </template>
  </Dialog>
  </v-card>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
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
       messages: [],
       columns: [
            {field: 'desi', header: 'Desi'},
            {field: 'yk_price', header: 'Yurtiçi'},
            {field: 'aras_price', header: 'Aras'},
            {field: 'ptt_price', header: 'PTT'},
            {field: 'mng_price', header: 'MNG'},
            {field: 'surat_price', header: 'Sürat'},
            {field: 'sendeo_price', header: 'Sendeo'},
        ],
        showDialog: false,

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
      confirmDialog(){
        this.loading=true;
        this.getN11CargoPrices().then(()=>{
        this.loading=false;
        this.showDialog = false;
        this.$swal({
          icon: 'success',
          title: 'Güncellendi',
          showConfirmButton: false,
          timer: 1500
        });
        //this.$toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', group: 'br', life: 1000});
        });
      },
      openDialog() {
            this.showDialog = true;
      },
  }

}

</script>