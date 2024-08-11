<!-- eslint-disable vue/no-lone-template -->
<template>
  <div>
    <ProductForm
      ref="productFormComp"
      @on-product-save="onProductSave"
    />
    <v-card eager class="mx-auto mb-2" flat>
      <ProgressBarComp
        ref="progressBarCompon"
      />
    </v-card>
    <v-card eager class="mx-auto" flat>
      <Toolbar class="mb-4">
        <template #start>
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="primary"
            @click="clickNewProduct()"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="primary"
            @click="handleUpdateStockPrice()"
          >
            <v-icon dark>
              mdi-update
            </v-icon>
          </v-btn>
        </template>
        <template #end>
          <span class="p-input-icon-right">
            <InputText v-model="filters['global'].value" type="text" @change="onFilter" />
            <i class="pi pi-search" />
          </span>
        </template>
      </Toolbar>
    </v-card>
    <v-card eager class="mx-auto" style="">
      <v-divider />
      <DataTable
        ref="dt"
        class="editable-cells-table"
        responsive-layout="stack"
        :value="items"
        :lazy="true"
        :paginator="true"
        :rows="rows"
        :loading="loading"
        data-key="id"
        :total-records="totalRecords"
        :row-hover="true"
        :global-filter-fields="['productTitle']"
        :filters.sync="filters"
        :selection.sync="selectedCustomers"
        :select-all="selectAll"
        edit-mode="cell"
        @page="onPage($event)"
        @select-all-change="onSelectAllChange"
        @row-select="onRowSelect"
        @row-unselect="onRowUnselect"
      >
        <Column selection-mode="multiple" />
        <Column field="productTitle" header="Ürün">
          <template #body="slotProps">
            <div class="product_container">
              <div class="product_image">
                <img :src="slotProps.data.cover_image.url" :alt="slotProps.data.cover_image.url" class="flag" style="width: 100%;height: 100%;object-fit: contain;">
              </div>
              <div>
                <span> {{ slotProps.data.productTitle }}</span>
              </div>
            </div>
          </template>
        </Column>
        <Column field="productCode" header="Stok Kodu" style="width: 5%" />
        <Column field="stock" header="STOK" :styles="{width: '5%'}">
          <template #body="slotProps">
            <InputText v-model="slotProps.data.stock" class="custom-width" />
          </template>
          <template #editor="{ data, field }">
            <InputText
              v-model="data[field]"
              class="custom-width"
            />
          </template>
        </Column>
        <Column field="desi" header="Desi">
          <template #body="slotProps">
            <InputText v-model="slotProps.data.desi" class="custom-width" />
          </template>
          <template #editor="{ data, field }">
            <InputText
              v-model="data[field]"
              class="custom-width"
            />
          </template>
        </Column>
        <Column field="price" header="Fiyat" style="width: 5%">
          <template #body="slotProps">
            <InputText v-model="slotProps.data.price" class="custom-width" />
          </template>
          <template #editor="{ data, field }">
            <InputText class="custom-width" v-model="data[field]" show-buttons mode="currency" currency="TRY" />
          </template>
        </Column>
        <Column field="price" header="Maliyet" style="width: 5%">
          <template #body="slotProps">
            <span> {{ formatCurrency((slotProps.data.price * 1.1 *1.2)+30) }}</span>
          </template>
        </Column>
        <Column field="profit_rate" header="Kar Marjı" style="width: 5%">
          <template #body="slotProps">
            <InputText v-model="slotProps.data.profit_rate" class="custom-width" />
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" :min-fraction-digits="2" :max-fracion-digits="2" class="custom-width" />
          </template>
        </Column>
        <Column field="price" header="Kar" style="width: 5%">
          <template #body="slotProps">
            <v-chip
              color="green"
              style="border-radius: 8px;
    font-size: 14px;
    height: 30px;color:white;"
            >
              {{ formatCurrency( (((slotProps.data.price * 1.1 *1.2)+30)*slotProps.data.profit_rate)-((slotProps.data.price * 1.1 *1.2)+30)) }}
            </v-chip>
          </template>
        </Column>
        <Column field="price" header="Karlı Fiyat" style="width: 20%">
          <template #body="slotProps">
            <span> {{ formatCurrency(((slotProps.data.price * 1.1 *1.2)+30)*slotProps.data.profit_rate) }}</span>
          </template>
        </Column>
        <Column :exportable="false" header="Pazaryerleri" :styles="{'min-width':'8rem'}">
          <template #body="slotProps">
            <GrayScaleImage
              :ismarket-product-matched="slotProps.data.n11_product !=null"
              colored-image="n11_color_logo.png"
              gray-scaled-image="n11_gray_logo.png"
              width="40"
              @handle-logo-click="clickedLogo(slotProps.data,'n11')"
            />
            <GrayScaleImage
              :ismarket-product-matched="slotProps.data.hb_product !=null"
              colored-image="hb_colored.png"
              gray-scaled-image="hb_gray.png"
              width="30"
              @handle-logo-click="clickedLogo(slotProps.data,'hb')"
            />
            <GrayScaleImage
              :ismarket-product-matched="slotProps.data.pazarama_product !=null"
              colored-image="pazarama_colored.png"
              gray-scaled-image="pazarama_grayed.png"
              width="30"
              @handle-logo-click="clickedLogo(slotProps.data,'pazarama')"
            />
          </template>
        </Column>
        <Column header="Islemler" :styles="{'min-width':'5rem'}">
          <template #body="slotProps">
            <v-icon
              small
              @click="clickEditProduct(slotProps.data)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </Column>
      </DataTable>
      <Dialog
        :header="ModalHeader"
        :visible.sync="displayMaximizable"
        :container-style="{width: '50vw'}"
        :maximizable="true"
        :modal="true"
      >
        <v-list v-if="displayMaximizable" three-line>
          <template id="okan">
            <v-list-item>
              <div v-if="displayMaximizable" class="product_image">
                <img :src="clickedProduct.cover_image.url" class="flag" style="width: 100%;height: 100%;object-fit: contain;">
              </div>
              <v-list-item-content>
                <v-list-item-title>{{ clickedProduct.productTitle }}</v-list-item-title>
                <v-list-item-subtitle>{{ clickedProduct.productCode }} - {{ clickedProduct.category.name }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-divider />
        <div class="p-fluid formgrid grid pl-0 pr-0">
          <div v-if="displayMaximizable" class="field col-12 pl-0 pr-0 mr-0">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="productCode" type="text" placeholder="Search" @keyup.enter="handleLogo(productCode,site)" />
            </span>
          </div>
        </div>
        <v-divider />
        <v-card :loading="loading_single_product_card">
          <v-list three-line>
            <template v-if="soapresult">
              <v-list-item>
                <div v-if="site=='n11'" class="product_image">
                  <img :src="n11_product.images.image.url" class="flag" style="width: 100%;height: 100%;object-fit: contain;">
                </div>
                <v-list-item-content>
                  <v-list-item-title> {{ site =='n11' ? n11_product.title : site=='hb' ? hb_product.hepsiburada_sku :'' }} </v-list-item-title>
                  <v-list-item-subtitle>{{ site=='hb' ? hb_product.merchant_sku : '' }} {{ site =='n11' ? n11_product.productSellerCode : '' }} - {{ site =='n11' ? n11_product.category.fullName : '' }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else-if="!try_again">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ sitename }} ' den ürün çekiliyor</v-list-item-title>
                  <v-list-item-subtitle>Lütfen bu işlem sırasında sabırlı olunuz</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ errorMessagge }}</v-list-item-title>
                </v-list-item-content>
                <Button label="Yeniden Dene" icon="pi pi-times" class="p-button-text" @click="handleLogo(productCode,site)" />
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <template #footer>
          <Button label="Vazgeç" icon="pi pi-times" class="p-button-text" @click="closeMaximizable" />
          <Button
            v-if="site=='n11'"
            label="Eşleştir"
            icon="pi pi-check"
            autofocus
            :disabled="eslestir_btn_disabled"
            @click="handleMatch(n11_product,clickedProduct)"
          />
          <Button
            v-if="site=='hb'"
            label="Eşleştir"
            icon="pi pi-check"
            autofocus
            :disabled="eslestir_btn_disabled"
            @click="handleMatch(hb_product,clickedProduct)"
          />
        </template>
      </Dialog>
    </v-card>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {FilterMatchMode} from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge';
export default{
props:{
  items: {
      type: Array,
      default: function () { return [] }
  },
  headers: {
      type: Array,
      default: null
  },
  loading:{
      type:Boolean,
      default:false
  },
  totalRecords:{
    type:Number,
    default:0
  },
  rows:{
    type: Number,
    default:10,
  }
},
computed: {
    ...mapState({
      n11_product: (state) => state.products.n11_product,
      hb_product: (state) => state.products.hb_product,
    }),
},
data() {
        return {
            selectedCustomers: null,
            selectAll: false,
            lazyParams: {},
            filters: {
                'global': {value: '', matchMode: FilterMatchMode.CONTAINS},
            },
            displayMaximizable: false,
            ModalHeader:'',
            clickedProduct:[],
            productCode:'',
            value:null,
            loading_single_product_card:false,
            try_again:false,
            site:'',
            soapresult:false,
            errorMessagge:'',
            eslestir_btn_disabled:true,
            sitename:''
        }
},

mounted() {
        this.lazyParams = {
            first: 0,
            rows: this.$refs.dt.rows,
            sortField: null,
            sortOrder: null,
            filters: this.filters
        };

        this.$emit("handle-options",this.lazyParams)
    },
    methods: {
      ...mapActions({
          getN11ProductBySellerCode: "products/getN11ProductBySellerCode",
          matchProduct : "products/matchProduct",
          matchHbProduct: "products/matchHbProduct",
          getHbListingByMerchantSku : "products/getHbListingByMerchantSku",
        }),
        openMaximizable() {
            this.displayMaximizable = true;
        },
        closeMaximizable() {
            this.displayMaximizable = false;
        },
        handleUpdateStockPrice(){
          this.$refs.progressBarCompon.fetchProgress();
        },
        handleMatch(product,db_product){
          if (this.site == 'n11'){
          let obj = {
              n11_product: product,
              db_product: db_product,
            };

            this.matchProduct(obj).then((res) => {
              //gelen kayıtlara ba
              this.$refs.progressBarCompon.findBatchID();
            });
          }
          if (this.site=='hb'){
            let obj = {
              hb_product_id : product.id,
              db_product_id : db_product.id,
            }

            this.matchHbProduct(obj).then((res) => {
              //gelen kayıtlara ba
              // this.$refs.progressBarCompon.findBatchID();
              this.closeMaximizable();
            });

          }
        },
        clickedLogo(data,site){
          this.clickedProduct = data;
          this.site=site;
         // data.n11_product !=null ?
          this.handleLogo(this.clickedProduct.productCode,site);
          this.eslestir_btn_disabled=true
        },
        async handleLogo(data,site){
          this.productCode= data;
          this.displayMaximizable = true;
          this.loading_single_product_card=true
          this.try_again=false
          this.soapresult=false
          this.eslestir_btn_disabled=true
          this.sitename = site == "hb" ? "HB" : site=="n11" ? "N11" : ''
          this.ModalHeader = this.sitename + " Ürün Eşleştir"


          if (site=="hb"){
            await this.getHbListingByMerchantSku(data).then((res)=>{
                    this.loading_single_product_card=false
                    this.soapresult=true;
                    this.eslestir_btn_disabled=false;
            })
           .catch((err)=>{
                  switch (err.response.status) {
                    case 404:
                         this.errorMessagge="Ürün bulumadı"
                        break;
                    default:
                       this.errorMessagge="HB 'den ürün çekerken bir hata oluştu"
                        break;
                  }
                  this.loading_single_product_card=false;
                  this.try_again=true;
                  this.soapresult=false;
           });

          }

          if (site=="n11"){
            await this.getN11ProductBySellerCode(data).then((res)=>{
                   this.loading_single_product_card=false
                   if  (!res.result.status =='success' || res.length==0){
                    this.try_again=true;
                    this.soapresult=false;
                   }
                   else if (res.result.status=='failure'){
                    this.soapresult=false;
                    this.try_again=true;
                    this.errorMessagge="Ürün Bulunamadı"
                   }
                   else if (res.result.status =='success'){
                    this.soapresult=true;
                    this.eslestir_btn_disabled=false;

                   }

            })
           .catch((err)=>{
                  this.errorMessagge="N11 ' den ürün çekerken bir hata oluştu"
                  this.loading_single_product_card=false;
                  this.try_again=true;
                  this.soapresult=false;
           });

          }

        },
        formatCurrency(value) {
            return new Intl.NumberFormat('tr-TR', {style: 'currency',currency: 'TRY',}).format(value);
        },
        onPage(event) {
           console.log(event);
            this.lazyParams = event;
            this.$emit("handle-options",this.lazyParams)
        },
        onSort(event) {
            this.lazyParams = event;
            this.$emit("handle-options",this.lazyParams)
        },
        onFilter() {
            this.lazyParams.filters = this.filters;
            this.$emit("handle-options",this.lazyParams)
        },
        onSelectAllChange(event) {
            const selectAll = event.checked;

            if (selectAll) {
              /*
                this.customerService.getCustomers().then(data => {
                    this.selectAll = true;
                    this.selectedCustomers = data.customers;
                });
                */
            }
            else {
                this.selectAll = false;
                this.selectedCustomers = [];
            }
        },
        onRowSelect() {
            this.selectAll = this.selectedCustomers.length === this.totalRecords
        },
        onRowUnselect() {
            this.selectAll = false;
        },
        clickNewProduct(){
          this.$refs.productFormComp.showModal('new');

        },
        clickEditProduct(product){
          console.log(product);
          this.$refs.productFormComp.showModal('edit', product);
        },
        onProductSave(){
          console.log("onsave");
          this.$emit("handle-options",this.lazyParams)
        }
}

}
</script>
<style>

.inputOnDataTable input
{
    width: 70px !important;
}
.p-datatable table {
    border-collapse: seperate !important;
    border-spacing : 0px 10px;
    min-width: 100%;
    table-layout: fixed;
    font-size: 14px;
}

::v-deep .p-datatable-wrapper {
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
}
::v-deep .p-datatable-table > thead > tr:first-of-type > th:first-of-type  {
  border-radius: 0.5rem 0 0 0!important;
}

/* Top Right Would be: */
::v-deep .p-datatable-table > thead > tr:first-of-type > th:last-of-type {
    border-radius: 0 0.5rem 0 0 !important;
}

/* Bottom Left Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
    border-radius:  0  0  0 0.5rem!important;
}

/* Bottom Right Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
    border-radius:  0  0 0.5rem 0 !important;
}
.ui-datatable * {
     border : 0px !important;
}
:deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

:deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

:deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

:deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;

    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
        font-size: 12px !important;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }
}
.product_image{
    max-width: 50px;
    min-width: 50px;
    min-height: 50px;
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-right: 12px;
    border-radius: 4px;
    background-color: #fff;
    border: solid 1px #e5e5e5;
}

.product_container{
    display: flex;
    flex-direction: row;
    align-content: flex-end;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}


.custom-width {
  width: 70px !important;
}



</style>
