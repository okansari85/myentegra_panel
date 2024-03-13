<template>
<div>
<v-card eager class="mx-auto" max-width="90%">
    <DataTable :value="items" showGridlines stripedRows >
    <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    </DataTable>
</v-card>
</div>
</template>
<script>
/*eslint-disable*/
import DataTable from 'primevue/datatable';

export default{
    props : {
        columns:{
            type: Array,
            default: function () { return [] }
        },
        items: {
            type: Array,
            default: function () { return [] }
        },
        lazy: {
            type:Boolean,
            defalut:false
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
    

}
</script>
<style>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}
</style>