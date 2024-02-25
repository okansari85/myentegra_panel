<template>
  <v-card
    elevation="0"
    outlined
    :loading="loading"
  >
    <v-card-title class="black--text" style="font-size:16px;">
      Kategoriler
      <v-spacer />
      <v-btn
        color="white"
        class="text--primary"
        fab
        small
        dense
        @click="newItem"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider />
    <Container
      drag-handle-selector=".column-drag-handle"
      lock-axis="y"
      :drop-placeholder="dropPlaceholderOptions"
      @drop="onDrop"
    >
      <Draggable v-for="item in items" :key="item.id">
        <div class="draggable-item pt-5 pb-5">
          <span class="column-drag-handle" style="float:left; padding:0 10px;"><v-icon color="red" class="handle mt-0">mdi-cursor-move</v-icon></span>
          <span> <nuxt-link :to="`/categories/${item.id}`"> {{ item.name }}</nuxt-link></span>
          <span style="float:right;padding-right:10px;">
            <v-icon color="gray" class="handle mt-0" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon color="gray" class="handle mt-0" @click="deleteItem(item.id)">mdi-delete</v-icon></nuxtlink></span>
        </div>
      </Draggable>
    </Container>
  </v-card>
</template>
<script>
/*eslint-disable*/
import { Container, Draggable } from "vue-smooth-dnd";
export default{
components: { Container, Draggable },
props:{
  items: {
      type: Array,
      default: function () { return [] }
    },
    loading:{
      type:Boolean,
      default:false
    }
},
data(){
  return {
  dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true,
  },
}
},
methods:{
        editItem(val){
            this.$emit('clicked-edit', val)
        },
        deleteItem(val){
            this.$emit('clicked-delete', val)
        },
        newItem(){
            this.$emit('clicked-new')
        },
        onDrop(val){
            this.$emit('on-drop',val)
        }
    }
}
</script>
