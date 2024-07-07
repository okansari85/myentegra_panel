<template>
  <div>
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
            <template #shippingCompanyName="{ degisken }">
              <span>{{ degisken.shippingCompanyName }} / {{ degisken.campaignNumber }} </span>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : '' }} </span>
            </template>
          </VuetifyDataTable>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pt-2">
        <v-card>
          <VuetifyDataTable
            ref="dta"
            :headers="headers[0]"
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
            <template #shippingCompanyName="{ degisken }">
              <span>{{ degisken.shippingCompanyName }} / {{ degisken.campaignNumber }} </span>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : '' }} </span>
            </template>
          </VuetifyDataTable>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pt-2">
        <v-card>
          <VuetifyDataTable
            ref="dtb"
            :headers="headers[0]"
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
            <template #shippingCompanyName="{ degisken }">
              <span>{{ degisken.shippingCompanyName }} / {{ degisken.campaignNumber }} </span>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : '' }} </span>
            </template>
          </VuetifyDataTable>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pt-2">
        <v-card>
          <VuetifyDataTable
            ref="dtc"
            :headers="headers[0]"
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
            <template #shippingCompanyName="{ degisken }">
              <span>{{ degisken.shippingCompanyName }} / {{ degisken.campaignNumber }} </span>
            </template>
            <template #platformId="{ degisken }">
              <span>{{ degisken.platformId == '1' ? 'N11' : '' }} </span>
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
import Vue from 'vue';
export default {
  meta: {
    auth: { authority: 1 },
  },
  computed: {
    ...mapState({
      orders: (state) => state.siparisler.orders,
    }),
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
    clickedEdit(val) {},
    clickedDelete(val) {},
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
      headers: [
          [
            {text: 'Platform', value: 'platformId'},
            {text: 'Sipariş Tarihi', value: 'orderDate'},
            {text: 'Sipariş Numarası', value: 'market_order_number'},
            {text: 'Kargo / Kampanya Kodu', value: 'shippingCompanyName'},
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
      ],
      title: ['Yeni Siparişler (Teyit Edilecek)','Kargolanacak', 'Kargolandı', 'Tamamlandı'],
    }
  }
}
</script>
