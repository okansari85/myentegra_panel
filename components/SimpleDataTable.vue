<template>
<v-card eager class="mx-auto" max-width="90%" style="margin-top: -64px;">
    <v-toolbar flat>
      <v-spacer />
      <v-text-field
        eager
        append-icon="mdi-magnify"
        label="Arama"
        single-line
        clearable
        hide-details
      />
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <DataTable :value="items" responsiveLayout="scroll">
    <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    </DataTable>
</v-card>
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
