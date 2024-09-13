<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended extension-height="63" flat>
      <v-icon>mdi-magnify</v-icon>
      <v-toolbar-title style="margin-left:10px;">
        HB Kargo Fiyatları
      </v-toolbar-title>
    </v-toolbar>
    <v-card eager class="mx-auto" style="margin-top:-34px" max-width="90%" flat>
      <Toast />
      <Toolbar class="mb-4">
        <template #start>
          <FileUpload
            v-model="file"
            name="file"
            mode="basic"
            choose-label="Excel Dosyası Seçin"
            accept=".xls,.xlsx"
            @select="onFileSelect"
          />
          <Button
            label="Kargo Fiyatlarını Güncelle"
            icon="pi pi-upload"
            class="p-button-success ml-2"
            @click="uploadFile"
          />
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
        <span>HB Kargo Fiyatları Güncellensin mi ? </span>
      </div>
      <template #footer>
        <Button
          label="Hayır"
          icon="pi pi-times"
          class="p-button-text"
          :disabled="loading"
          @click="showDialog = false"
        />
        <Button
          label="Evet"
          icon="pi pi-check"
          class="p-button-text"
          :loading="loading"
          :disabled="loading"
          @click="confirmDialog"
        />
      </template>
    </Dialog>
  </v-card>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';

export default {
  async created() {
      this.loading=true;
      await this.getHbCargoPrices().then(()=>{
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
        ],
        showDialog: false,
        file: null, // Seçilen dosya

    }
  },
  computed:{
  ...mapState({
        cargoPrices : state=> state.hbCargoPrices.cargoPrices,
      }),
  },
  methods:{
    ...mapActions(
        {
          getHbCargoPrices:'hbCargoPrices/getHbCargoPrices',
          getCargoPriceFromFile:'hbCargoPrices/getCargoPriceFromFile',
        }),
      confirmDialog(){
        this.loading=true;
        this.getCargoPriceFromN11().then(()=>{
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
      onFileSelect(event) {
      this.file = event.files[0]; // Seçilen dosyayı kaydet
      },

      async uploadFile() {
      if (!this.file) {
        this.$toast.add({ severity: 'error', summary: 'Hata', detail: 'Lütfen bir dosya seçin' });
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        //importHbCargoPricesFromFile
        await this.getCargoPriceFromFile(formData).then(()=>{
          this.$toast.add({ severity: 'success', summary: 'Başarılı', detail: 'Dosya başarıyla yüklendi' });
        })

      } catch (error) {
        this.$toast.add({ severity: 'error', summary: 'Hata', detail: 'Dosya yükleme hatası' });
      }
    },

  }

}

</script>
