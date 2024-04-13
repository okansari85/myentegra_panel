<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      style="display:none;"
      accept="image/*"
      multiple
      @change="onFileSelected"
    >
    <v-container fluid>
      <v-row>
        <v-card
          v-for="(icon,index) in exitingfiles"
          :key="'A'+index"
          width="100"
          height="130"
          class="rounded-card mr-3 mb-3"
        >
          <v-card-actions class="justify-center text-center fill-height">
            <img :src="icon.icon_url" width="50" stye="object-fit:cover">
          </v-card-actions>
        </v-card>
        <Container
          drag-handle-selector=".column-drag-handle"
          lock-axis="x"
          :drop-placeholder="dropPlaceholderOptions"
          orientation="horizontal"
          behaviour="contain"
          style="min-width: 0px !important;"
          @drop="onDrop"
        >
          <Draggable
            v-for="(prog, index) in progressInfos"
            :key="index"
          >
            <v-card
              width="100"
              height="130"
              class="draggable-item rounded-card mr-3 mb-3'"
              :class="{ greenBrdr: prog.uploaded, redBrdr: prog.hasError }"
              flat
              :loading="prog.loading"
            >
              <v-card-actions class="justify-center text-center fill-height">
                <span
                  class="column-drag-handle"
                  style="position: absolute;
                  float: left;
                  padding: 0px 10px;
                  left: -6px;
                  top: 5px;
                  z-index: 9999;
                  cursor: pointer;"
                ><v-icon color="gray" class="handle mt-0">mdi-cursor-move</v-icon></span>
                <span
                  v-show="!prog.loading"
                  style="position: absolute;
                  cursor:pointer;
                  left: 84px;
                  top: -9px; "
                  @click="onRemove(index)"
                > <v-icon color="black" class="handle mt-0">mdi-close-circle</v-icon></span>
                <img :src="getFileImage(prog.file)" width="90%" stye="object-fit:contain;overflow:hidden;">
                <template v-if="prog.hasError">
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-icon
                        color="red"
                        v-bind="attrs"
                        style="position: absolute;left: 83px;bottom: -8px;"
                        v-on="on"
                      >
                        mdi-alert-circle
                      </v-icon>
                    </template>
                    <span>{{ prog.ErrorMessage }}</span>
                  </v-tooltip>
                </template>
              </v-card-actions>
            </v-card>
          </Draggable>
        </Container>
        <v-card
          width="100"
          height="130"
          class="rounded-card"
          flat
        >
          <v-card-actions class="justify-center text-center fill-height">
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="blue-grey"
              class="ma-2 white--text"
              fab
              small
              @click="inputBoxClicked()"
            >
              <v-icon dark>
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
/*eslint-disable*/
import { getFileImage, applyDrag, generateItems } from '../src/utils'
import { Container, Draggable } from "vue-smooth-dnd";
export default {
 components: { Container, Draggable },
 props:{
     exitingfiles:{
         type:Array,
         default:null,
     }
 },
 data(){
     return  {
         progressInfos: [],
         loading:false,
         dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true,
  },
     };
 },
 created() {

 },
 methods:{
      getFileImage(image){
          return getFileImage(image)
      },

     onFileSelected(event){

         let f = Array.prototype.slice.call(event.target.files)
         let index=this.progressInfos.length

         if  (f.length > 9  || this.progressInfos.length + f.length > 9) {
         alert("Maksimum dosya sayısı 10 u geçemez")
         return;
         }

         f.forEach(f => {

             if (!f.type.match("image.*")) return;

             this.progressInfos.push({
              percentage: 0,
              file: f,
              uploaded:false,
              hasError:false,
              loading:true,
              ErrorMessage:'',
            })

             this.onUpload(f,index);
             index++;
         });


     },
     inputBoxClicked(){
         this.$refs.fileInput.click();

     },
     onUpload(f,index){
          let that=this

          const fd = new FormData();
          fd.append('file',f,f.name)


          const myUploadProgress = (index) => (progress) => {
          that.progressInfos[index].percentage = Math.floor((progress.loaded * 100) / progress.total)
          that.loading=true
          }


          var config = {
              onUploadProgress: myUploadProgress(index)
          };


          this.$entegraApi.post('/uploadProductImages',fd,config)
          .then(res=>{
              console.log(res);
              that.progressInfos[index].uploaded=true
              that.progressInfos[index].hasError=false
              that.progressInfos[index].loading=false
              that.progressInfos[index].ErrorMessage=res.message ? res.message : ''
              that.progressInfos[index].file.id=res.data.data.imageId
              that.loading=false
              //that.addIcon(res.file)
              this.$emit('dosyaSecildi', this.progressInfos);
          })
          .catch(e=>{
               that.loading=false
               that.progressInfos[index].uploaded=false
               that.progressInfos[index].loading=false
               that.progressInfos[index].hasError=true
               that.progressInfos[index].ErrorMessage=e.message
          })
     },
     onDrop(val){
            this.progressInfos = applyDrag(this.progressInfos, val);
            let obj ={images:this.progressInfos};
            this.$entegraApi.post("/changeImageOrder",obj).then(r => {
              console.log(r);
            })

     },
     onRemove(index){
      this.removeFromServer(index);
     },
     removeFromServer(index){
      this.progressInfos[index].loading=true;
      this.loading=true;
      if(!this.progressInfos[index].hasOwnProperty('file')) return;
       if (this.progressInfos[index].uploaded) {
         let image_id = this.progressInfos[index].file.id ? this.progressInfos[index].file.id:"";
         this.$entegraApi.delete("/deleteProductImages/" + image_id).then(r => {
             this.progressInfos.splice(index, 1);
             this.loading=false;
             this.$emit('dosyaSecildi', this.progressInfos);
         }).catch(e=>{
               this.loading=false;
               that.progressInfos[index].loading=false;
               that.progressInfos[index].hasError=true;
               that.progressInfos[index].ErrorMessage=e.message;
          });
       }
     }
    },
 }

</script>
<style>
.inputBox{
  display: flex;
  align-items: center;
  justify-content: center;
  border:2px dashed #ccc;
  width:100px;
  height:100px;
  float:left;
  margin-right: 10px;
  cursor:pointer;
}
.inputbox img{
  position:absolute
}
.close-button{
  box-shadow: 0 0 0.25em 0.25em rgba(0, 0, 0, 0.25);
  width:20px;
  height:20px;
  border-radius: 20px;
  background-color:rgb(240, 95, 95);
  position: absolute;
  display: flex;
  align-content: center;
  padding: 2px;
  color:white;

}
.rounded-card{
  border-radius:10px !important;
  background-color:#fff  !important;
  border:1px dashed #333 !important;
}
.greenBrdr{
    border:1px dashed #12a03c !important;
}
.redBrdr{
    border:1px dashed #cf1b24 !important;
}
</style>
