<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in data">
          <img :src="item">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
  import Swiper from "swiper"; //直接找到dist的js下的swiper.js；
  import "swiper/dist/css/swiper.css";//引入swiper的css样式；
  export default {
    data(){
      return {}
    },
    mounted(){
      new Swiper ('.swiper-container', {
        loop: true,
        pagination: '.swiper-pagination'
      })
    },
    props: ["data"],//子组件通过props接收父组件传进来的数据，不验证的话，直接写数组；
    components: {},
    methods: {}
  }
</script>
<style scoped>
  img{
    width: 100%;

  }
</style>

