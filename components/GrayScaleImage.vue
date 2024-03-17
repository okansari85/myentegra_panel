<template>
  <img
    :src="imageSrc"
    alt="Hover Image"
    :width="width"
    style="cursor: pointer; transition: opacity 0.5s ease;"
    class="hover-opacity"
    @mouseover="changeImage(true)"
    @mouseout="changeImage(false)"
    @click="clickedLogo"
  >
</template>

<script>
/*eslint-disable*/
export default {
  props:{
    width:{
      type: String,
      default: 40,
    },
    grayScaledImage:{
      type:String,
      default:'',
    },
    coloredImage:{
      type:String,
      default:'',
    }
  },
  data () {
    return {
      imageSrc: this.grayScaledImage,
    }
  },
  methods: {
    changeImage (colored) {
      this.imageSrc = colored  ? this.coloredImage : this.grayScaledImage;
    },
    clickedLogo(){
      this.$emit("handle-logo-click");
    }
  }
}
</script>

<style scoped>
.hover-opacity {
  transition: opacity 0.5s ease;
  opacity: 0.5;
}

.hover-opacity:hover {
  opacity: 1; /* Adjust as needed */
}
</style>
