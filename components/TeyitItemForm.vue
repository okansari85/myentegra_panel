<template>
  <div>
    <div v-if="!is_confirmed">
      <div class="p-fluid formgrid grid pl-0 pr-0">
        <div class="field col-12 pl-0 pr-0 mr-0">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="productCode"
              type="text"
              placeholder="Search"
              @keyup.enter="handleEnter($event.target.value)"
            />
          </span>
        </div>
      </div>
      <v-divider />
    </div>
    <v-card :loading="loading_single_product_card" :style="is_confirmed ? 'margin-top:15px;' : ''" :class="is_confirmed ? 'mt-10s' : ''">
      <v-list three-line>
        <template v-if="soapresult || is_confirmed">
          <v-list-item>
            <div class="product_image">
              <img :src="product.cover_image.url" class="flag" style="width: 100%;height: 100%;object-fit: contain;">
            </div>
            <v-list-item-content>
              <v-list-item-title>{{ product.productTitle }} </v-list-item-title>
              <v-list-item-subtitle>{{ product.productCode }} - {{ product.category.name }} </v-list-item-subtitle>
            </v-list-item-content>
            <Button v-if="!is_confirmed" label="Teyit Et" icon="pi pi-check" class="p-button-success" @click="confirmIt(product,item,index)" />
            <Button
              v-if="is_confirmed"
              label="Değiştir"
              icon="pi pi-trash"
              @click="changeClick()"
            />
          </v-list-item>
        </template>
        <template v-else-if="!try_again">
          <v-list-item>
            <v-list-item-content v-show="!is_changed">
              <v-list-item-title>Envarterden ürün çekiliyor</v-list-item-title>
              <v-list-item-subtitle>Lütfen bu işlem sırasında sabırlı olunuz</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content v-show="is_changed">
              <v-list-item-title>Bulmak istediğiniz ürün kodunu yazın ve Enter'a basın</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ errorMessagge }}</v-list-item-title>
            </v-list-item-content>
            <Button label="Yeniden Dene" icon="pi pi-check" class="p-button-text" @click="handleEnter(productCode)" />
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
props:{
    sellerCode: {
      type: String,
      default : ""
    },
    siteTitle:{
    type: String,
    default: ""
    },
    item :{
      type:Object,
      default() {
        return {}
      }
    },
    confirmedProduct:{
      type:Object,
      default() {
        return {}
      }
    },
    index:{
      type:Number,
      default:0
    }
},

methods: {
    ...mapActions({
      getProductBySellerCode: "products/getProductBySellerCode",
    }),
    handleEnter(sellerCode){
    this.loading_single_product_card=true
    this.try_again=false
    this.soapresult=false
    this.eslestir_btn_disabled=true
    this.is_changed=0

    this.getProductBySellerCode(sellerCode).then(res=>{
      this.loading_single_product_card=false
      this.soapresult=true;
      this.eslestir_btn_disabled=false;
      this.product=res

    })
    .catch((err)=>{
      console.log(err.response.status)
                  switch (err.response.status) {
                    case 404:
                         this.errorMessagge="Envarterde Ürün bulumadı lütfen ekleyiniz!!"
                        break;
                    default:
                       this.errorMessagge="Ürün çekerken bir hata oluştu"
                        break;
                  }
                  this.loading_single_product_card=false;
                  this.try_again=true;
                  this.soapresult=false;
      });
    },
    confirmIt(product,item,index){
      this.$emit('confirm',product,item,index)
    },
    changeClick(){
      this.is_confirmed=0;
      this.is_changed=1;
    }

},
data(){
    return{
      order:[],
      product:[],
      loading_single_product_card:false,
      try_again:false,
      soapresult:false,
      errorMessagge:'',
      eslestir_btn_disabled:true,
      productCode:'',
      is_confirmed:0,
      is_changed:0,
    }
},

mounted() {
    this.is_confirmed = this.item.is_confirmed;
    this.productCode = this.sellerCode;

    if (this.is_confirmed){
        this.product=this.confirmedProduct
      }
      else{
        this.handleEnter(this.productCode);
      }
  }
}

</script>
<style>

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

</style>
