import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
Vue.use(Vuex);
const state = {
  collect:JSON.parse(localStorage.getItem("collects"))||[]  //存放所有的商品，因为是多项，所以是数组；
};
export default new Vuex.Store({
  state,
  getters,
  mutations
})
