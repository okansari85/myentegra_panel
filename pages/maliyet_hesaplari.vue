<template>
   <v-card flat>
    <Modals
      ref="modals"
      :mdl-text="MdlText"
      :showbtn="false"
      @clicked-save="clickedSave"
    >
      <v-form ref="categoryForm" v-model="maliyetValid">
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="sablonAdi"
                :rules="textRules"
                :counter="50"
                label="Şablon Adı"
                required
                dense
                class="mb-8"
                clearable
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </Modals>
    <v-toolbar color="primary" dark extended extension-height="63" flat>
      <v-icon>mdi-magnify</v-icon>
      <v-toolbar-title style="margin-left:10px;">
        Maliyet Şablonları
      </v-toolbar-title>
    </v-toolbar>
    <v-card eager class="mx-auto" style="margin-top:-34px" max-width="90%" flat>
    <Toolbar class="mb-4">
        <template #start>
            <Button
            label="Yeni Şablon Ekle"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="showModal"
          />
        </template>
    </Toolbar>
    </v-card>
    <v-card eager class="mx-auto"  max-width="90%" flat>
    <v-container fluid class="pl-0 pr-0">
    <v-row>
      <v-col cols="12" md="6" sm="12" lg="4">
        <v-card outlined>
          <v-card-title>Card 1</v-card-title>
          <v-card-subtitle>Card Subtitle</v-card-subtitle>
          <v-card-text>
            This is the content of card 1.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" sm="12" lg="4">
        <v-card outlined>
          <v-card-title>Card 2</v-card-title>
          <v-card-subtitle>Card Subtitle</v-card-subtitle>
          <v-card-text>
            This is the content of card 2.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12" lg="4">
        <v-card outlined>
          <v-card-title>Card 3</v-card-title>
          <v-card-subtitle>Card Subtitle</v-card-subtitle>
          <v-card-text>
            This is the content of card 3.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-card>
   </v-card>
</template>
<script>
/*eslint-disable*/
export default{
  data() {
    return{
      MdlText:"Yeni Şablon Oluştur",
      maliyetValid:false,
      textRules: [
              v => !!v || 'Bu alan Gereklidir',
              v => (v && v.length >= 3) || 'İlgili alan 3 karakterden fazla olmalıdır.',
              v => (v && v.length <= 50) || 'İlgili alan en fazla 50 karakter olmalıdır.',
      ],
      sablonAdi:'',
    }
  },
  methods:{
    showModal(){
       this.$refs.modals.dialog = true;
       this.status='new';
       this.MdlText="Yeni Şablon Ekle"
    },
    clickedSave(){}
  }
}

</script>
