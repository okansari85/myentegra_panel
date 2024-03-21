<template>
  <img
    :src="ismarketProductMatched ? coloredImage : imageSrc"
    alt="Hover Image"
    :width="width"
    style="cursor: pointer; transition: opacity 0.5s ease;"
    :class="ismarketProductMatched ? '' : 'hover-opacity'"
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
    },
    ismarketProductMatched: {
      type:Boolean,
      default:false,
    }
  },
  data () {
    return {
      imageSrc: this.grayScaledImage,
    }
  },
  methods: {
    changeImage (colored) {
        this.imageSrc = colored && this.ismarketProductMatched!=true  ? this.coloredImage : this.grayScaledImage;
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
