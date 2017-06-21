<template>
  <div>
    <m-header title="列表页"></m-header>
    <scroller :on-refresh="refresh" ref="scroller" class="top"><!-- 可以在下面用this.$refs.scroller拿到scroller这个组件-->
      <ul class="list">
        <li v-for="book in books">
          <img v-lazy="book.bookCover" v-show="!flag">
          <div class="content">
            <h3 v-show="!flag">{{book.bookName}}</h3>
            <input type="text" v-model="newBook.bookName" v-show="flag">
            <input type="text" v-model="newBook.bookCover" v-show="flag">
            <p v-show="!flag">{{book.content}}</p>
            <input type="text" v-model="newBook.content" v-show="flag">
            <div class="btn">
              <button @click="remove(book.id)" v-show="!flag">删除</button>
              <button @click="change(book.id)" v-show="!flag">修改</button>
              <button @click="update(book.id)" v-show="flag">确认</button>
              <button @click="cancel" v-show="flag">取消</button>
            </div>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
  </div>
</template>
<script>
  import MHeader from "components/MHeader"
  import {getBooks, removeBook, getBook, updateBook} from "api"
  export default {
    data(){
      return {
        books: [],
        newBook: {
          bookName: "",
          bookCover: "",
          content: ""
        },
        flag: false
      }
    },
    created(){
      this.getList();
    },
    components: {
      MHeader
    },
    methods: {
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
      },
      change(id){
        this.flag = true;
        getBook(id).then(res=> {
          this.newBook.bookName = res.data.bookName;
          this.newBook.bookCover = res.data.bookCover;
          this.newBook.content = res.data.content;
        });
      },
      update(id){
//        console.log(id);
        updateBook(id, this.newBook).then(res=> {
//          console.log(res);
          this.flag = false;
        })
      },
      cancel(){
        this.flag = false;
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
  }

  .content {
    display: flex;
    flex-direction: column;
    margin: 5px;

  h3 {
    color: #666;
  }

  .btn {
    display: flex;
    justify-content: center;

  button {
    width: 40px;
    margin: 5px 10px 0 0;
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
