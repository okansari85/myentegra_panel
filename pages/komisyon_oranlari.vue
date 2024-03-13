<template>
  <div>
    <v-card flat>
       <v-toolbar color="primary" dark extended extension-height="63" flat>
         <v-icon>mdi-magnify</v-icon>
         <v-toolbar-title style="margin-left:10px;">
           N11 Komisyon Oranları
         </v-toolbar-title>
       </v-toolbar>
       <v-card eager class="mx-auto" style="margin-top:-34px" max-width="90%" flat>
       <Toolbar class="mb-4">
           <template #start>
               <Button
               @click="openDialog"
               label="Komisyon oranlarını güncelle"
               icon="pi pi-plus"
               class="p-button-success mr-2"/>
           </template>
       </Toolbar>
       </v-card>
       <Dialog :visible.sync="showDialog" :styles="{width: '450px'}" header="Confirm" :modal="true">
       <div class="confirmation-content">
           <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
           <span >Komisyon oranlarını güncellemek ister misiniz?</span>
       </div>
       <template #footer>
        <Button label="Hayır"
        icon="pi pi-times"
        class="p-button-text"
        @click="showDialog = false"
        :disabled="loading"/>
        <Button label="Evet"
        icon="pi pi-check"
        class="p-button-text"
        @click="confirmDialog"
        :loading="loading"
        :disabled="loading"/>
       </template>
     </Dialog>
     </v-card>
     <VuetifyDataTable
        :headers="headers"
        :items="getallcomissions"
        :loading="loading"
        :items-length="getcomissionscount"
        @handle-options="handleOptions"
        :title="datatitle"
        @clicked-delete="clickedDelete"
        @clicked-edit="clickedEdit"
        ref="dt"
        :keyOfItem="keyItem"
        />
      </div>
   </template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions } from "vuex";
import Vue from "vue";
   export default {
     computed:{
         ...mapState({
          comissions : state=> state.n11Comission.comissions,
         }),
         ...mapGetters({
          getcomissionscount: "n11Comission/getcomissionscount",
          getcommissionperpage: "n11Comission/getcommissionperpage",
          getallcomissions: "n11Comission/getallcomissions",
        }),
     },
     methods:{
       ...mapActions(
          {
            getComissions:'n11Comission/getComissions',
            getComissionsFromN11:'n11Comission/getComissionsFromN11',
         }),
         handleOptions(options, search) {
            let obj = {
              arama: search,
              page: options.page,
              per_page: options.itemsPerPage,
            };
            this.loading = true;
            this.getComissions(obj).then((result) => {
              this.loading = false;
            });
          },
         confirmDialog(){
           this.loading=true;
           this.getComissionsFromN11().then(()=>{
            this.showDialog = false;
                  this.$swal({
                    icon: 'success',
                    title: 'Güncellendi',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.handleOptions(this.$refs.dt.options, "");
           });
         },
         openDialog() {
               this.showDialog = true;
         },
         clickedEdit(val) {},
         clickedDelete(val) {},
         
     },
     data(){
            return {
                messages: [],
                showDialog: false,
                search: "",
                  headers: [
                    { text: "Kategori Adı", value: "category_name", sortable: false },
                    { text: "Komisyon Oranı", value: "komsiyon_orani", sortable: false },
                    { text: "Pazarlama Hizmet Oranı", value: "pazarlama_hizmet_orani", sortable: false },
                    { text: "Pazaryeri Hizmet Oranı", value: "pazaryeri_hizmet_orani", sortable: false },
                    { text: "N11 Kategori ID", value: "n11_category_id", sortable: false },
                  ],
                  datatitle: "N11 Komisyon Oranları",
                  loading: false,
                  keyItem: "id",
        
            }
        },
   }
   </script>
   <style>
   .searchBtn {
     background-color: blue;
     border-radius: 0 4px 4px 0;
     width: 100%;
   }
   .custom .v-input__append-inner {
     margin: 0 !important;
     padding: 0 !important;
     width: 20%;
     height: 100%;
   }
   .custom .v-input__slot {
     padding-right: 0 !important;
   }
   .theme--light.v-btn {
     color: white;
   }
   </style>