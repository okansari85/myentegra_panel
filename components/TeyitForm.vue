<template>
  <Modals
    ref="modals"
    :mdl-text="MdlText"
    :showbtn="false"
    :show-save-button="false"
    @clicked-save="clickedSave"
  >
    <v-expansion-panels>
      <v-expansion-panel v-for="(item,index) in localOrderItems" :key="item.id">
        <v-expansion-panel-header disable-icon-rotate>
          <v-list-item two-line class="pa-0">
            <v-list-item-content>
              <v-list-item-title>{{ item.orderable.productSellerCode }}{{ item.orderable.merchantSku }} x {{ item.orderable.quantity }}</v-list-item-title>
              <v-list-item-subtitle class="text-wrap">
                {{ item.orderable.productName }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <template #actions>
            <v-icon v-if="!item.is_confirmed" color="error">
              mdi-alert-circle
            </v-icon>
            <v-icon v-if="item.is_confirmed" color="success">
              mdi-check
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider />
        <v-expansion-panel-content>
          <TeyitItemForm
            ref="teyitItemForms"
            :index="index"
            :seller-code="sellerCode[index]"
            :item="item"
            :confirmed-product="item.product"
            @confirm="confirmITem"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </Modals>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
  props:{
    MdlText: {
    type: String,
    default: "Sipariş Kalemleri Teyitle"
    },
  },
  data(){
    return{
      order:[],
      localOrderItems: [],
      site:'',
      loading:false,
    }
  },
  computed:{
    sellerCode(){
      return this.order.items.map(item => this.getProductCode(item));
    }
  },
  methods:{
    ...mapActions({
      confirmItemAndOrder: "siparisler/confirmItemAndOrder",
    }),
    clickedSave(){
    },
    showModal(obj=null){
       this.$refs.modals.dialog = true;
       this.order= obj;
       this.site = obj.platformId == '1' ? 'n11' : obj.platformId  == '2' ? 'hb' : '';
       this.localOrderItems = JSON.parse(JSON.stringify(obj.items));
    },

    handleEnter(value,site){
      console.log(value);
    },
    getProductCode(item) {
      return this.site === 'n11'
        ? item.orderable.productSellerCode
        : this.site === 'hb'
        ? item.orderable.merchantSku
        : '';
    },
    confirmITem(val,item,index){

      let obj = {
        product_id: val.id,
        item_id:item.id,
        index:index,
      };


      this.loading = true;


      this.confirmItemAndOrder(obj).then((result) => {
        this.loading = false;

        this.$set(this.localOrderItems, index, {
          ...this.localOrderItems[index],
            is_confirmed: 1
          });
          this.$refs.teyitItemForms[index].is_confirmed=1;
          this.$emit('completed')
      });


    }

  },

}
</script>
