<template>
  <div><Breadcrumb :home="home" :model="breadcrumbItems" /> </div>
</template>

<script>
/*eslint-disable*/
import { Breadcrumb } from 'primevue/breadcrumb';
export default {
  props:{
    breadcrumbItems:{
      type:Array,
      default: function () { return [] }
    }
  },
  data() {
    return {
      home: { icon: 'pi pi-home', to: '/categories' }, // Ana sayfa breadcrumb öğesi
    };
  },
};
</script>
