<template>
  <div>
    <m-header title="列表页"></m-header>
    <scroller :on-refresh="refresh" ref="scroller" class="top"><!-- 可以在下面用this.$refs.scroller拿到scroller这个组件-->
      <ul class="list">
        <li v-for="book in books">
          <img v-lazy="book.bookCover">
          <div class="content">
            <h3>{{book.bookName}}</h3>
            <p>{{book.content}}</p>
            <i class="iconfont icon-shoucang" :class="{iconColor:book.collected}" @click="save(book)"></i>
            <p class="btn">
              <router-link tag="button" :to="{path:'/update/'+book.id}">修改</router-link>
              <button @click="remove(book.id)">删除</button>
            </p>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
  </div>
</template>
<script>
  import MHeader from "components/MHeader";
  import {getBooks, removeBook, getBook, updateBook,collectBook} from "api";
  import {mapMutations} from "vuex";
  import * as Types from "../store/types";
  export default {
    data(){
      return {
        books: [],
        collected:false
      }
    },
    created(){
      this.getList();
    },
    components: {
      MHeader
    },
    methods: {
      ...mapMutations([Types.ADD_COLLECT]),
      save(book){
          this[Types.ADD_COLLECT](book);//直接把book传到mutation中，作为第二个参数，放到state的collect数组中；
        collectBook(book.id).then(res=>{
          this.$router.push("/collect");
        });
      },
      refresh(){  //获取最新数据；
        this.getList();
      },
      getList(){
        getBooks().then(res=> {
          this.books = res.data;
//              console.log(res.data);
//              加载数据后，先获取scroller组件，用组件调用finishPullToRefresh方法；-> 刷新完就停止刷新；
          this.$refs.scroller.finishPullToRefresh();
        }, err=> {
          console.log(err);
        })
      },
      remove(id){
        removeBook(id).then(res=> {
          //前台手动删除，不要调用getList方法，如果调用的话，又会发送一次请求，耗性能；
          this.books = this.books.filter(book=>book.id != id);
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .top {
    margin-top: 40px;
  }

  .list {

  li {
    display: flex;
    border-bottom: 1px solid #ccc;

  img {
    width: 100px;
    height: 90px;
    margin:10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    margin: 5px;
    line-height:25px;
  .icon-shoucang{
    color: #999;
  }
  .iconColor{
    color: red;
  }

  h3 {
    color: #666;
  }

  .btn {
    display: flex;
    justify-content: space-between;
    width:100px;
  button {
    width: 40px;
  }

  }

  }
  img[lazy="loaded"] {
    animation: feadIn 0.5s;
  }

  img[lazy="loading"] {
    background: url("../assets/loading.gif") no-repeat center;
    background-size: 50%;
  }

  }
  }
  @keyframes feadIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
