<template>
  <div>
    <div class="content">
      <keep-alive><!--让视图保持缓存，缓存页面；这是vue白给的；-->
        <router-view></router-view><!--当路由路径变化的时候，将内容通过router-view展示在App中；-->
      </keep-alive>
    </div>
    <tab></tab>
  </div>
</template>

<script>
  import Tab from "components/Tab";
  export default {
    name: 'app',
    components: {
      Tab
    }
  }
</script>

<style scoped>
  .content{
    margin-bottom: 65px;
  }
</style>
