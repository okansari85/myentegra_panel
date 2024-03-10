<template>
  <v-card flat>
    <Modals
      ref="modals"
      :mdl-text="MdlText"
      :showbtn="false"
      @clicked-save="clickedSave"
    >
      <v-form ref="categoryForm" v-model="categoryValid">
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="categoryName"
                :rules="textRules"
                :counter="50"
                label="Kategori Adı"
                required
                dense
                class="mb-8"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </Modals>
    <Breadcrumb :home="home" :model="items" />
    <br>
    <CategoryList
      :items="mycategories"
      :loading="loading"
      @clicked-new="showModal"
      @clicked-edit="clickEditCategory"
      @clicked-delete="clickDeleteCategory"
      @on-drop="onDrop"
    />
  </v-card>
</template>
<script>
/*eslint-disable*/
import Breadcrumb from 'primevue/breadcrumb';
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import CategoryList from '~/components/CategoryList.vue';
import { applyDrag, generateItems } from '../../src/utils'
export default {
components: {CategoryList },
  data() {
        return {
          loading:false,
          categoryValid:false,
          categoryName:'',
          status:null,
            home: {icon: 'pi pi-home', to: '/categories'},
            items: [],
            MdlText:"Kategori Ekle",
            textRules: [
              v => !!v || 'Bu alan Gereklidir',
              v => (v && v.length >= 3) || 'İlgili alan 3 karakterden fazla olmalıdır.',
              v => (v && v.length <= 50) || 'İlgili alan en fazla 50 karakter olmalıdır.',
            ],

        }
  },
  async created() {
      this.loading=true;
      await this.getMainCategories().then(()=>{
        this.loading=false;
        this.parent_id=0;
      });
  },
  computed:{
  mycategories: {
        get() {
          return this.$store.state.categories.categories
        },
        set(value) {
          this.$store.commit('categories/SET_CATEGORIES', value)
        },
  },
  ...mapState({
        categories : state=> state.categories.categories,
      }),
},
methods:{
  ...mapActions(
        {
        getMainCategories:'categories/getMainCategories',
        updateCategoryOrder:'categories/updateCategoryOrder',
        saveCategory:'categories/saveCategory',
        editCategory:'categories/editCategory',
        deleteCategory:'categories/deleteCategory',
        }),
    showModal(){
       this.$refs.modals.dialog = true;
       this.status='new';
       this.MdlText="Kategori Ekle"
    },
    onDrop(dropResult) {
       this.mycategories = applyDrag(this.categories, dropResult);
       let obj ={categories:this.categories}
       console.log(obj);
       this.updateCategoryOrder(obj).then(()=>{
        console.log("Başarılı");
      })
    },
    clickEditCategory(val){
      this.status='edit'
      this.MdlText = "Kategori Düzenle"
      this.category_id=val.id
      this.categoryName=val.name;
      this.$refs.modals.dialog = true;
    },
    clickedSave(){
      this.$refs.categoryForm.validate();
      if(this.status=='new' && this.categoryValid){
        let obj = {category_name:this.categoryName, parent_id:0};
        this.saveCategory(obj).then(()=>{
          this.status=null
          this.$refs.modals.dialog = false
          this.categoryName=""
        })
      }
      if(this.status=='edit' && this.categoryValid){
        let obj = {category_id: this.category_id,category_name:this.categoryName};
        this.editCategory(obj).then(()=>{
          this.status=null
          this.$refs.modals.dialog=false
          this.categoryName=''
        })
      }
    },
    clickDeleteCategory(val){
        this.deleteCategory(val).then(()=>{
            console.log("silindi")
         })
    },
},
}
</script>
<style>
.draggable-item{
    border-bottom:1px solid #efefef;
    cursor:pointer;
}
.column-drag-handle{
    cursor:move;
}
.active{
    background-color: #efefef;
}
</style>
