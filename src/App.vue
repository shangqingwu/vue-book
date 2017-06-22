<template>
  <div>
    <transition name="trans">
        <keep-alive><!--让视图保持缓存，缓存页面；这是vue白给的；-->
          <router-view class="view"></router-view><!--当路由路径变化的时候，将内容通过router-view展示在App中；-->
        </keep-alive>
    </transition>
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
  .view{
    position: absolute;
    left: 0;
    top:0;
    bottom: 65px;
    width: 100%;
  }
  .trans-enter{  /*本来还没移动的时候，在页面最右边，需要移动100%，到0的位置；*/
    transform: translate(100%);
  }
  .trans-enter-active{ /*点击之后运动的时间为0.2s */
    transition: 0.2s linear;
  }
  .trans-leave-active{/*点击别的之后当前页再往左运动到-100*/
    transition: 0.2s linear;
    transform: translate(-100%);

  }
</style>
