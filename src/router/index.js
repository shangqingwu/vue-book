import Vue from 'vue'
import Router from 'vue-router'
import Home from 'containers/Home';
import List from 'containers/List';
import Add from 'containers/Add';
import Collect from 'containers/Collect';
import Update from 'containers/Update';

Vue.use(Router); //router是vue的一个插件，需要use一下才能用；

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/add',
      component: Add
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/collect',
      component: Collect
    },
    {
      path:"/update/:id",
      component:Update
    },
    {
      path: '*', //当输入其他的路径时，重定向到home页面；
      redirect:"/home"
    }
  ],
  linkActiveClass:"active" //设置选中的按钮的class名，active类名控制颜色；-> 当点击的时候会自动加一个active类名；
})
