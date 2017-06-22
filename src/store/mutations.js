import * as Types from "./types";

const mutations ={  //mutations里面放的是方法；
  //可以通过[]，将a.b括起来，先取到里面的变量名；-> es6的语法；
  [Types.ADD_COLLECT](state,obj){ //把这一项放到收藏数组中；
    // some判断这一项在不在数组中，返回布尔；
    let flag = state.collect.some(item=>item.id===obj.id);
    !flag && state.collect.push(obj);
    localStorage.setItem("collects",JSON.stringify(state.collect));
  },
  [Types.REMOVE_COLLECT](state,id){
    state.collect = state.collect.filter(item=>item.id!=id);
    localStorage.setItem("collects",JSON.stringify(state.collect));
  }

};
export default mutations;
