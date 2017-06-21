// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/index.less'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad);
import VueScroller from 'vue-scroller'
Vue.use(VueScroller); //引用这个组件后，页面会增加一个全局组件scroller；

Vue.config.productionTip = false;


// console.log(App);  // 这是一个对象，里面有render函数和component等，要想把render函数放在这里面就直接将App展开就行了；
new Vue({
  el: '#app',
  router,
  // 在搭建框架的时候，会选择runtime+compiler（3种方式都可以） 或 runtime only（不支持template的写法，只能用后面2种；）
  /*方法1： template: '<App/>',
   components: { App }  这一行就不用了，因为...App就直接把这个组件拿过来了，就不需要写这个了；如果这一句话加上了，那么当Hello注册到这里面之后，又会被App这个组件覆盖；*/
  /* 方法2：
  render(createElement){
    return createElement("div","hi");
  },   // 但是这样写太麻烦了，可以简化；
  render(h){
    //console.log(h(App)); // 这是一个虚拟node
    return h(App);
  },*/
  // 方法3：
   ...App, // App是一个对象，里面有render函数，要想把render函数放在这里面就直接将App展开就行了；
});
