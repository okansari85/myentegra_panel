<!-- pages/category/_id.vue -->

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
    <CBreadCrumb :breadcrumb-items="breadcrumb" />
    <br/>
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { applyDrag, generateItems } from '../../src/utils'
import Vue from "vue";
export default {
  computed: {
    ...mapState({
      breadcrumb: (state) => state.breadcrumb.breadcrumb,
      categories : state=> state.categories.categories,
    }),
    mycategories: {
        get() {
          return this.$store.state.categories.categories
        },
        set(value) {
          this.$store.commit('categories/SET_CATEGORIES', value)
       },
    },
  },
  data() {
    return {
      category: {}, // Kategori verilerini tutacak
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
    };
  },

  async created() {
    this.loading=true;
    await this.fetchBreadcrumb(this.$route.params.id).then((res)=>{
          this.setCategories(res)
          this.loading=false;
     });
  },
  methods: {
    ...mapActions(
        {
        fetchBreadcrumb:'breadcrumb/fetchBreadcrumb',
        updateCategoryOrder:'categories/updateCategoryOrder',
        saveCategory:'categories/saveCategory',
        editCategory:'categories/editCategory',
        deleteCategory:'categories/deleteCategory',
    }),
    ...mapMutations({
      setCategories: 'categories/SET_CATEGORIES'
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
        let obj = {category_name:this.categoryName, parent_id:this.$route.params.id};
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

  }
};
</script>
