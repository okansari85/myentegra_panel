<template>
<div>
<v-card eager class="mx-auto" style="margin-top:-34px" max-width="90%" flat>
    <Toolbar class="mb-4">
        <template #start>
            <Button label="Kargo Fiyatlarını Güncelle" icon="pi pi-plus" class="p-button-success mr-2"/>
        </template>
        <template #end>
            <Button label="Export" icon="pi pi-upload" class="p-button-help"  />
        </template>
    </Toolbar>
</v-card>
<v-card eager class="mx-auto" max-width="90%">
    <DataTable :value="items" responsiveLayout="scroll">
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
    }
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