<template>
  <div>
    <Modals
      ref="modals"
      :mdl-text="MdlText"
      :showbtn="false"
      @clicked-save="clickedSave"
    >
      <v-container fluid style="overflow: auto;">
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            lg="9"
          >
            <v-stepper
              v-model="e1"
            >
              <v-stepper-header>
                <v-stepper-step
                  step="1"
                  :complete="e1 > 1"
                >
                  Ürün Bilgileri
                </v-stepper-step>
                <v-stepper-step
                  step="2"
                  :complete="e1 > 2"
                >
                  Ürün Resimleri
                </v-stepper-step>
                <v-stepper-step
                  :complete="e1 > 3"
                  step="3"
                >
                  Diğer Bilgiler
                </v-stepper-step>
              </v-stepper-header>
              <v-stepper-items non-linear>
                <v-stepper-content step="1">
                  <v-form ref="productForm" v-model="productValid">
                    <v-container fluid>
                      <v-row>
                        <v-col
                          cols="12"
                          md="12"
                          sm="12"
                          lg="12"
                          class="pl-0 mb-4 pb-0"
                        >
                          <VueTreeselect
                            v-model="category"
                            :options="categories"
                            :disable-branch-nodes="true"
                            :show-count="true"
                            placeholder="Kategori Seçiniz"
                            :normalizer="normalizer"
                            @select="handleSelect"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="12"
                          md="12"
                          sm="12"
                          lg="9"
                          class="pl-0 mb-3 pb-0"
                        >
                          <v-text-field
                            v-model="productName"
                            :rules="textRules"
                            :counter="65"
                            label="Ürün Adı*"
                            required
                            dense
                            outlined
                            class="mb-0 pt-0"
                            clearable
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="12"
                          sm="12"
                          lg="3"
                          class="pl-0 mb-0 pb-0"
                        >
                          <v-autocomplete
                            v-model="marka"
                            :items="markalar"
                            item-text="marka"
                            item-value="value"
                            :rules="selectRules"
                            outlined
                            dense
                            label="Marka"
                            clearable
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <client-only>
                    <VueEditor v-model="description" class="mb-5" />
                  </client-only>
                  <v-btn
                    color="primary"
                    :disabled="!productValid || category==null"
                    @click="e1 = 2"
                  >
                    Devam Et
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <MultiFileUpload class="mb-10 mt-5" @dosyaSecildi="handleDosyaSecildi" />
                  <v-btn
                    color="primary"
                    :disabled="selectedfiles.length>0 ? false:true"
                    @click="e1 = 3"
                  >
                    Devam Et
                  </v-btn>

                  <v-btn
                    text
                    @click="e1 = 1"
                  >
                    Geri Git
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card
                    class="mb-12"
                    flat
                  >
                    <v-form ref="productForm2" v-model="productValid2">
                      <v-container fluid>
                        <v-row>
                          <v-col
                            cols="12"
                            md="12"
                            sm="12"
                            lg="12"
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                lg="4"
                                class="pl-0 mb-0 pb-0"
                              >
                                <v-text-field
                                  v-model="productCode"
                                  v-mask="'########'"
                                  :counter="255"
                                  :rules="textRules"
                                  label="Ürün Kodu"
                                  outlined
                                  dense
                                  required
                                  clearable
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                lg="2"
                                class="pl-0 mb-0 pb-0"
                              >
                                <v-text-field
                                  v-model="stock"
                                  :counter="255"
                                  :rules="textRules"
                                  label="Stok"
                                  outlined
                                  dense
                                  required
                                  type="number"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                lg="2"
                                class="pl-0 mb-0 pb-0"
                              >
                                <v-currency-field
                                  v-model="price"
                                  label="Fiyat"
                                  :rules="textRules"
                                  outlined
                                  dense
                                  required
                                  clearable
                                  filled
                                  prefix="TRY"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                lg="2"
                                class="pl-0 mb-0 pb-0"
                              >
                                <v-text-field
                                  v-model="desi"
                                  :counter="99"
                                  :rules="textRules"
                                  label="Desi"
                                  outlined
                                  dense
                                  required
                                  type="number"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                lg="2"
                                class="pl-0 mb-0 pb-0"
                              >
                                <v-text-field
                                  v-model="profit_rate"
                                  :counter="99"
                                  :rules="textRules"
                                  label="Kar Marjı %"
                                  outlined
                                  dense
                                  required
                                  type="number"
                                />
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            cols="12"
                            md="12"
                            sm="12"
                            lg="6"
                            class="pl-2"
                            style="padding-left:2px !important"
                          >
                            <v-card>
                              <v-list-item two-line>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Maliyet
                                  </v-list-item-title>
                                  <v-list-item-subtitle>Fiyat * 1.10 * 1.20 + 30</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                              <v-card-text
                                class="pt-0"
                              >
                                <v-row align="center">
                                  <v-col
                                    class="text-h5"
                                    cols="12"
                                  >
                                    {{ formatCurrency((parseFloat(price)*1.1*1.2)+30) }}
                                  </v-col>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            sm="12"
                            lg="6"
                            class="pl-2"
                            style="padding-left:2px !important"
                          >
                            <v-card>
                              <v-list-item two-line>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Karlı Fiyat
                                  </v-list-item-title>
                                  <v-list-item-subtitle>Kar Marjı {{ profit_rate }} %</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                              <v-card-text
                                class="pt-0"
                              >
                                <v-row align="center">
                                  <v-col
                                    class="text-h5"
                                    cols="6"
                                  >
                                    {{ formatCurrency( ((parseFloat(price)*1.1*1.2)+30) * ( 1 + profit_rate / 100 ) ) }}
                                  </v-col>
                                  <v-col
                                    class="text-h5"
                                    cols="6"
                                  >
                                    <v-chip
                                      color="green"
                                      style="border-radius: 8px;
                                    font-size: 18px;
                                    height: 35px;color:white;"
                                    >
                                      {{ formatCurrency(((parseFloat(price)*1.1*1.2)+30) * ( 1 + profit_rate / 100 ) - ((parseFloat(price)*1.1*1.2)+30) ) }}
                                    </v-chip>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card>
                  <v-btn
                    text
                    @click="e1 = 2"
                  >
                    Geri Git
                  </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="12"
            lg="3"
          >
            <v-card>
              <v-list
                subheader
                class="pa-0"
              >
                <v-list-item>
                  <img
                    class="mr-3"
                    src="n11_color_logo.png"
                    style="width: 49px; object-fit: contain; text-align: center;"
                  >
                  <v-list-item-content>
                    <v-list-item-title style="font-weight:bold !important;color:#333;">
                      N11
                    </v-list-item-title>
                    <v-list-item-subtitle>Ürünü N11 ' de listele</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div class="text-center">
                      <v-switch />
                    </div>
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <img
                    class="mr-3"
                    src="hb_colored.png"
                    style="width: 42px;
                      object-fit: contain;
                      text-align: center;
                      margin-right: 0px;
                      margin-right: 18px !important;"
                  >
                  <v-list-item-content>
                    <v-list-item-title style="font-weight:bold !important;color:#333;">
                      HepsiBurada
                    </v-list-item-title>
                    <v-list-item-subtitle>Ürünü HepsiBurada ' da listele</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div class="text-center">
                      <v-switch />
                    </div>
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <img
                    class="mr-3"
                    src="pazarama_colored.png"
                    style="width: 49px; object-fit: contain; text-align: center;"
                  >
                  <v-list-item-content>
                    <v-list-item-title style="font-weight:bold !important;color:#333;">
                      Pazarama
                    </v-list-item-title>
                    <v-list-item-subtitle>Ürünü Pazarama ' da listele</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div class="text-center">
                      <v-switch />
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </Modals>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
  async created() {
      await this.getMainCategories().then(()=>{
      });
  },
  computed:{
    ...mapState({
        categories : state=> state.categories.categories,
    }),
  },
  data(){
    return{
      category:null,
      price: 0,
      e1:1,
      stock:'',
      switch1:'',
      profit_rate:'',
      marka:0,
      desi:'',
      description:'',
      selectedfiles: [],
      MdlText :"Yeni Ürün Ekle",
      productValid:false,
      productValid2:false,
      markalar:[
              {
                 marka:'Bosch',
                 value:1
             },
              {
                marka:'Siemens',
                 value:2
             },
              {
                marka:'Profilo',
                 value:3
             }
      ],
      textRules: [
              v => !!v || 'Bu alan Gereklidir',
              v => (v && v.length >= 1) || 'İlgili alan 3 karakterden fazla olmalıdır.',
              v => (v && v.length <= 65) || 'İlgili alan en fazla 65 karakter olmalıdır.',
      ],
      selectRules: [
          v => !!v || 'Bu alan Gerekli',
      ],
      normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length ? node.children : 0,
      }
      },
      productName:'',
      productCode:'',
      selectedCity: null,
    }
  },
  methods:{
    ...mapActions(
    {
        getMainCategories:'categories/getMainCategories',
        addNewProduct:'products/addNewProduct',
    }),
    showModal(){
       this.$refs.modals.dialog = true;
       this.status='new';
       this.MdlText="Yeni Ürün Ekle"
    },
    clickedSave(){

      let valid =this.validationControl();
      if (this.status == "new" && valid) {


        let product = {
          category_id: this.category,
          productTitle: this.productName,
          productCode: this.productCode,
          productImages:this.selectedfiles,
          desi:this.desi,
          price:this.price,
          profitRate:1 + this.profit_rate /100 ,
          marka:this.marka,
          description:this.description,
          stock:this.stock
        };

        this.addNewProduct(product).then(() => {
          this.$refs.modals.dialog = false;
          this.$emit('on-product-save', product);
        });


      }
    },
    validationControl(){
      this.$refs.productForm.validate();
      this.$refs.productForm2.validate();
      return (this.productValid && this.productValid2 && this.category!=null && this.selectedfiles.length>0) ? true:false;
    },
    handleSelect(selectedNode){

    },
    handleDosyaSecildi(files) {
      this.selectedfiles = files;

    },
    formatCurrency(value) {
            return value.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'});
    },
  }
}
</script>
<style>
.p-cascadeselect:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: unset!important;
  border-color: #2196F3;
}
.p-cascadeselect .p-cascadeselect-label {
    background: transparent;
    border: 0 none;
    padding: 0.7rem 0.5rem !important;
}

.v-text-field--filled .v-text-field__prefix, .v-text-field--filled .v-text-field__suffix {
    max-height: 32px;
    margin-top: 0px !important;
}

.v-list-item__content {
    align-items: center;
    align-self: center !important;
    display: flex;
    flex-wrap: wrap;
    flex: 1 1;
    overflow: hidden;
    padding: 12px 0;
}
.v-list--three-line .v-list-item, .v-list-item--three-line {
   min-height: 48px !important;
}
</style>
