<template>
  <div>
    <TeyitForm
      ref="teyitForm"
      :mdl-text="siparisText"
      @completed="confirmCompleted()"
    />
    <v-tabs
      v-model="tab"
      slider-color="yellow"
      background-color="transparent"
      color="black"
      show-arrows
      @change="onTabClick(tab)"
    >
      <v-tab>Yeni Sipariş</v-tab>
      <v-tab>Kargolanacak</v-tab>
      <v-tab>Kargolandı</v-tab>
      <v-tab>Tamamlandı</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item class="pt-2">
        <v-card>
          <VuetifyDataTable
            ref="dt"
            :headers="headers[0]"
            :loading="loading"
            :items="getallorders"
            :title="title[0]"
            :items-length="getorderscount"
            :key-of-item="keyItem"
            :slots="slots"
            @clicked-edit="clickedEdit"
            @clicked-delete="clickedDelete"
            @handle-options="handleOptions"
          >
            <template #buyer="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.buyer.fullName }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    {{ degisken.buyer.adresses[1].district }} / {{ degisken.buyer.adresses[1].city }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #orderDate="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ formattedDate(degisken.orderDate) }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.market_order_number }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #shippingCompanyName="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.shippingCompanyName }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    {{ degisken.campaignNumber }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #items="{ degisken }">
              <v-list-item v-for="item in degisken.items" :key="item.id" two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ item.orderable.productSellerCode }}{{ item.orderable.merchantSku }} {{ item.orderable.productStockCode }} x {{ item.orderable.quantity }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    {{ item.orderable.productName }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #dueAmount="{ degisken }">
              <span style="font-weight: bold;font-size:16px;"><b>{{ parseFloat(degisken.dueAmount).toFixed(2) }}</b></span>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : degisken.platformId == '2' ? 'HB' : degisken.platformId== '3' ? 'PAZARAMA' : '' }} </span>
            </template>
            <template #is_confirmed="{ degisken }">
              <v-icon
                v-if="degisken.is_confirmed == '0'"
                color="red"
                large
                @click="showTeyitForm(degisken)"
              >
                mdi-alert-circle
              </v-icon>
              <v-icon
                v-if="degisken.is_confirmed == '1'"
                color="green"
                large
                @click="showTeyitForm(degisken)"
              >
                mdi-check
              </v-icon>
            </template>
          </VuetifyDataTable>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pt-2">
        <v-card>
          <VuetifyDataTable
            ref="dta"
            :headers="headers[1]"
            :loading="loading"
            :items="getallorders"
            :title="title[1]"
            :items-length="getorderscount"
            :key-of-item="keyItem"
            :slots="slots"
            @clicked-edit="clickedEdit"
            @clicked-delete="clickedDelete"
            @handle-options="handleOptions"
          >
            <template #buyer="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.buyer.fullName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.buyer.adresses[1].district }} / {{ degisken.buyer.adresses[1].city }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #orderDate="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ formattedDate(degisken.orderDate) }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.market_order_number }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #shippingCompanyName="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.shippingCompanyName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.campaignNumber }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #items="{ degisken }">
              <v-list-item v-for="item in degisken.items" :key="item.id" two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ item.orderable.productSellerCode }}{{ item.orderable.merchantSku }} {{ item.orderable.productStockCode }} x {{ item.orderable.quantity }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    {{ item.orderable.productName }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : degisken.platformId == '2' ? 'HB' : degisken.platformId== '3' ? 'PAZARAMA' : '' }} </span>
            </template>
            <template #dueAmount="{ degisken }">
              <span style="font-weight: bold;"><b>{{ degisken.dueAmount }}</b></span>
            </template>
          </VuetifyDataTable>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pt-2">
        <v-card>
          <VuetifyDataTable
            ref="dtb"
            :headers="headers[2]"
            :loading="loading"
            :items="getallorders"
            :title="title[2]"
            :items-length="getorderscount"
            :key-of-item="keyItem"
            :slots="slots"
            @clicked-edit="clickedEdit"
            @clicked-delete="clickedDelete"
            @handle-options="handleOptions"
          >
            <template #buyer="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.buyer.fullName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.buyer.adresses[1].district }} / {{ degisken.buyer.adresses[1].city }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #orderDate="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ formattedDate(degisken.orderDate) }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.market_order_number }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #shippingCompanyName="{ degisken }">
              <v-list-item three-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.shippingCompanyName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.campaignNumber }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : degisken.platformId == '2' ? 'HB' : degisken.platformId== '3' ? 'PAZARAMA' : '' }} </span>
            </template>
            <template #items="{ degisken }">
              <v-list-item v-for="item in degisken.items" :key="item.id" two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ item.orderable.productSellerCode }}{{ item.orderable.merchantSku }} {{ item.orderable.productStockCode }} x {{ item.orderable.quantity }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    {{ item.orderable.productName }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #shippedDate="{ degisken }">
              <v-list-item three-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-subtitle>{{ formattedDate(degisken.shippedDate) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #dueAmount="{ degisken }">
              <span style="font-weight: bold;"><b>{{ degisken.dueAmount }}</b></span>
            </template>
          </VuetifyDataTable>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pt-2">
        <v-card>
          <VuetifyDataTable

            ref="dtc"
            :headers="headers[3]"
            :loading="loading"
            :items="getallorders"
            :title="title[3]"
            :items-length="getorderscount"
            :key-of-item="keyItem"
            :slots="slots"
            @clicked-edit="clickedEdit"
            @clicked-delete="clickedDelete"
            @handle-options="handleOptions"
          >
            <template #buyer="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.buyer.fullName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.buyer.adresses[1].district }} / {{ degisken.buyer.adresses[1].city }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #orderDate="{ degisken }">
              <v-list-item two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ formattedDate(degisken.orderDate) }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.market_order_number }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #shippingCompanyName="{ degisken }">
              <v-list-item three-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ degisken.shippingCompanyName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ degisken.campaignNumber }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #shippedDate="{ degisken }">
              <v-list-item three-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-subtitle>{{ formattedDate(degisken.shippedDate) }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : degisken.platformId == '2' ? 'HB' : degisken.platformId== '3' ? 'PAZARAMA' : '' }} </span>
            </template>
            <template #items="{ degisken }">
              <v-list-item v-for="item in degisken.items" :key="item.id" two-line class="pa-0">
                <v-list-item-content>
                  <v-list-item-title>{{ item.orderable.productSellerCode }}{{ item.orderable.merchantSku }} {{ item.orderable.productStockCode }} x {{ item.orderable.quantity }}</v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">
                    {{ item.orderable.productName }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #dueAmount="{ degisken }">
              <span style="font-weight: bold;"><b>{{ parseFloat(degisken.dueAmount).toFixed(2) }}</b></span>
            </template>
          </VuetifyDataTable>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import TeyitForm from "~/components/TeyitForm.vue";
export default {
  meta: {
    auth: { authority: 1 },
  },
  computed: {
    ...mapGetters({
      getorderscount: "siparisler/getorderscount",
      getordersperpage: "siparisler/getordersperpage",
      getallorders: "siparisler/getallorders",
      getordernew: "siparisler/getordernew",
    }),
  },
  methods: {
    ...mapActions({
      getOrders: "siparisler/getOrders",
      resetState :"siparisler/resetState",
    }),
    formattedDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const dateObj = new Date(date);
      return date ? dateObj.toLocaleDateString('tr-TR', options) : '';
    },
    clickedEdit(val) {},
    clickedDelete(val) {},
    confirmCompleted(){
      this.handleOptions({
            page:1,
            itemsPerPage:15,
          }, "");
    },
    handleOptions(options, search) {
      let obj = {
        search: search,
        page: options.page,
        per_page: options.itemsPerPage,
        status:this.status,
      };
      this.loading = true;
      this.getOrders(obj).then((result) => {
        this.loading = false;
      });
    },
    showTeyitForm(obj=null){
          this.siparisText = obj.market_order_number + ' - ' +  this.formattedDate(obj.orderDate) + ' - ' + obj.buyer.fullName
          this.$refs.teyitForm.showModal(obj);
    },
    onTabClick(e){
      this.resetState();
      if (e==0){
        this.status = 1;
      }
      if (e==1){
        this.status = 2;
      }
      if (e==2){
        this.status = 3;
      }
      if (e==3){
        this.status = 4;
      }
      this.handleOptions({
            page:1,
            itemsPerPage:15,
          }, "");
    }
  },
  data () {
    return {
      tab: null,
      keyItem: "id",
      status:1,
      loading:true,
      siparisText:'',
      headers: [
          [
            {text: 'Platform', value: 'platformId'},
            {text: 'Sipariş Bilgileri', value: 'orderDate'},
            {text: 'Müşteri Bilgileri', value: 'buyer'},
            {text: 'Ürün Bilgileri', value: 'items'},
            {text: 'Kargo Bilgileri', value: 'shippingCompanyName'},
            {text: 'Sipariş Tutaru', value: 'dueAmount'},
            {text: 'Teyitli mi', value: 'is_confirmed'},
          ],
          [
            {text: 'Platform', value: 'platformId'},
            {text: 'Sipariş Bilgileri', value: 'orderDate'},
            {text: 'Müşteri Bilgileri', value: 'buyer'},
            {text: 'Ürün Bilgileri', value: 'items'},
            {text: 'Kargo Bilgileri', value: 'shippingCompanyName'},
            {text: 'Sipariş Tutaru', value: 'dueAmount'},
          ],
          [
            {text: 'Platform', value: 'platformId'},
            {text: 'Sipariş Bilgileri', value: 'orderDate'},
            {text: 'Müşteri Bilgileri', value: 'buyer'},
            {text: 'Ürün Bilgileri', value: 'items'},
            {text: 'Kargo Bilgileri', value: 'shippingCompanyName'},
            {text: 'Kargolanma Tarihi', value: 'shippedDate'},
            {text: 'Sipariş Tutaru', value: 'dueAmount'},
          ],
          [
            {text: 'Platform', value: 'platformId'},
            {text: 'Sipariş Bilgileri', value: 'orderDate'},
            {text: 'Müşteri Bilgileri', value: 'buyer'},
            {text: 'Ürün Bilgileri', value: 'items'},
            {text: 'Kargo Bilgileri', value: 'shippingCompanyName'},
            {text: 'Kargolanma Tarihi', value: 'shippedDate'},
            {text: 'Sipariş Tutarı', value: 'dueAmount'},
          ],
      ],
      slots: [
        {
          Id: 1,
          slotName: "shippingCompanyName",
        },
        {
          Id: 2,
          slotName: "platformId",
        },
        {
          Id: 3,
          slotName: "orderDate",
        },
        {
          Id: 4,
          slotName: "buyer",
        },
        {
          Id: 5,
          slotName: "dueAmount",
        },
        {
          Id: 6,
          slotName: "items",
        },
        {
          Id: 7,
          slotName: "is_confirmed",
        },
        {
          Id: 8,
          slotName: "shippedDate",
        },
      ],
      title: ['Yeni Siparişler (Teyit Edilecek)','Kargolanacak', 'Kargolandı', 'Tamamlandı'],
    }
  }
}
</script>
