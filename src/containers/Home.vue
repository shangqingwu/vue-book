<template>
  <div>
    <m-header title="网上书城"></m-header>
    <!--轮播图组件可能会被复用-->
    <!--不能直接渲染slider，可能没有过来slider就渲染完了，导致轮播图不能使用；-->
    <!--所以要加一个v-if，当为false的时候，里面的代码不执行；只有全部加载完了之后，才能渲染；-->
    <div v-if="sliders.length">
      <slider :data="sliders"></slider>  <!--通过属性把sliders四张图传给子组件Slider-->
    </div>
    <h3>最新上架</h3>
    <ul class="hot">
      <li v-for="hot in hots">
        <img :src="hot.bookCover">
        <span>{{hot.bookName}}</span>
      </li>
    </ul>
    <loading v-if="isLoading"></loading>
  </div>
</template>
<script>
  import {getSliders, getHot} from "api";
  import Slider from "components/Slider";
  //  console.log(getSliders);
  import Loading from "components/Loading";
  import MHeader from "components/MHeader";
  export default {
    data(){
      return {
        sliders: [],//当前轮播图需要的数据；
        hots: [], // 热卖书籍；
        isLoading: true //先显示loading，等数据加载出来之后，再隐藏loading -> 让其变成false；
      }
    },
    created(){
      getSliders().then(res=> { // 异步；res就是成功后，从后台返回的数据，自己需要的所有数据在data中；
        this.sliders = res.data;
//            console.log(this.sliders);
      });
      getHot().then(res=> {
        this.hots = res.data;
        this.isLoading = false; //数据加载完成，隐藏loading；
      })
    },
    components: {
      Slider,  //注入到Home中；-> 注册一下；
      Loading,
      MHeader
    },
    methods: {}
  }
</script>
<style scoped lang="less">/*默认是css*/
h3 {
  color: #666;
  padding-left: 2%;
  margin: 10px 0;
  font-weight: normal;
}

.hot {
  display: flex;
  flex-wrap: wrap;

li {
  display: flex;
  flex-direction: column;
  width: 33.33%;
  text-align: center;

img {
  width: 80%;
}

}
}

</style>
