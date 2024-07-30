<template>
  <Modals
    ref="modals"
    :mdl-text="MdlText"
    :showbtn="false"
    :show-save-button="false"
    @clicked-save="clickedSave"
  >
    <v-expansion-panels>
      <v-expansion-panel v-for="(item,index ) in order.items" :key="item.id">
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
            <v-icon v-if="!is_confirmed" color="error">
              mdi-alert-circle
            </v-icon>
            <v-icon v-if="is_confirmed" color="success">
              mdi-check
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider />
        <v-expansion-panel-content>
          <TeyitItemForm
            ref="teyitItemForm"
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
      site:'',
      loading:false,
      is_confirmed:false,
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
       this.is_confirmed=obj.is_confirmed

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
      };

      this.loading = true;
      this.confirmItemAndOrder(obj).then((result) => {
        this.loading = false;
        this.is_confirmed=true
        this.$emit('completed')
        this.$refs.teyitItemForm[index].is_confirmed=1;

      });

    }

  },

}
</script>
