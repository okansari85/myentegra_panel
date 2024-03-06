<template>
   <v-card eager class="mx-auto" max-width="90%" style="margin-top: -64px;">
    <v-toolbar flat>
      <v-spacer />
      <v-text-field
        v-model="filters['global'].value"
        eager
        append-icon="mdi-magnify"
        label="Arama"
        single-line
        clearable
        hide-details
        @change="onFilter"
      />
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <DataTable
      :value="items"
      :lazy="true"
      :paginator="true"
      :rows="rows"
      :loading="loading"
      ref="dt"
      dataKey="id"
      :total-records="totalRecords"
      @page="onPage($event)"
      :rowHover="true"
      :globalFilterFields="['productTitle']"
      :filters.sync="filters"
      @select-all-change="onSelectAllChange"
      @row-select="onRowSelect"
      :selection.sync="selectedCustomers"
      @row-unselect="onRowUnselect"
      :selectAll="selectAll"
      showGridlines
    >
      <Column selection-mode="multiple" />
      <Column field="productTitle" header="Ürün">
        <template #body="slotProps">
          <div class="product_container">
            <div class="product_image">
              <img :src="'http://localhost:8000/storage/files/' + slotProps.data.cover_image.url" :alt="slotProps.data.cover_image.url" class="flag" style="width: 100%;height: 100%;object-fit: contain;"/>
              </div>
            <div>
              <span> {{ slotProps.data.productTitle }}</span>
            </div>
          </div>
        </template>
      </Column>
      <Column field="productCode" header="Stok Kodu"  style="width: 20%"></Column>
      <Column field="stock" header="STOK">
        <template #body="slotProps">
          <span> {{ slotProps.data.stock }}</span>
        </template>
      </Column>
      <Column field="desi" header="Desi">
        <template #body="slotProps">
          <span> {{ slotProps.data.desi }}</span>
        </template>
      </Column>
      <Column field="price" header="Fiyat" style="width: 20%">
        <template #body="slotProps">
          <span> {{ formatCurrency(slotProps.data.price * 1) }}</span>
        </template>
      </Column>
      <Column field="price" header="Maliyet" style="width: 20%">
        <template #body="slotProps">
          <span> {{ formatCurrency((slotProps.data.price * 1.1 *1.2)+30) }}</span>
        </template>
      </Column>
      <Column field="profit_rate" header="Kar Marjı" style="width: 20%">
        <template #body="slotProps">
          <span> {{ slotProps.data.profit_rate }}</span>
        </template>
      </Column>
      <Column field="price" header="Kar" style="width: 20%">
        <template #body="slotProps">
          <v-chip color="green"
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
    </DataTable>
  </v-card>
</template>
<script>
/*eslint-disable*/
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
data() {
        return {
            selectedCustomers: null,
            selectAll: false,
            lazyParams: {},
            filters: {
                'global': {value: '', matchMode: FilterMatchMode.CONTAINS},
            },

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
        formatCurrency(value) {
            return value.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'});
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
        }
}

}
</script>
<style>
.p-datatable table {
    border-collapse: collapse;
    min-width: 100%;
    table-layout: fixed;
    font-size: 14px;
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

</style>
