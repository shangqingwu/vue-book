<template>
  <nav>
    <router-link to="/home"><!--相当于是a标签-->
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/list">
      <i class="iconfont icon-list"></i>
      <span>列表</span>
    </router-link>
    <router-link to="/collect">
      <i class="iconfont icon-shoucang"></i>
      <span>收藏</span>
    </router-link>
    <router-link to="/add">
      <i class="iconfont icon-14052229"></i>
      <span>添加</span>
    </router-link>
  </nav>
</template>

<script>
export default {
 data(){
   return {}
 },
  computed:{},
  components:{}
}
</script>

<style scoped lang="less">/*告诉他语言是less*/
  nav{
    height: 60px;
    width:100%;
    display: flex;
    flex: 1;
    position: fixed;
    left:0;
    bottom: 0;
    border-top:1px solid #ccc;
    align-items: center; /*上下居中*/
    background:#fff;
    a{
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      i {
        font-size: 20px;
      }
    }
    .active{ /*当点击的时候会自动加一个active类名*/
      color: red;
    }
  }
</style>
