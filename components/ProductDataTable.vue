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
      @row-unselect="onRowUnselect"
      :selection.sync="selectedCustomers"
      :selectAll="selectAll"
    >
      <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
      <Column v-for="col of headers" :key="col.field" :field="col.field" :header="col.header" />
    </DataTable>
  </v-card>
</template>
<script>
/*eslint-disable*/
import {FilterMatchMode} from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
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
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }
}
</style>
