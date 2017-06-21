<template>
    <div>
      <m-header title="添加图书"></m-header>
      <div class="add">
        <div class="group">
          <label for="bookName">书名 : </label>
          <input type="text" id="bookName" placeholder="请输入书名" v-model="book.bookName">
        </div>
        <div class="group">
          <label for="bookCover">地址 : </label>
          <input type="text" id="bookCover" placeholder="请添加封面" v-model="book.bookCover">
        </div>
        <div class="group">
          <label for="content">详情 : </label>
          <input type="text" id="content" placeholder="请输入详细内容" v-model="book.content">
        </div>
        <div class="group">
          <button @click="add">添加图书</button>
        </div>
      </div>
    </div>
</template>
<script>
  import MHeader from "components/MHeader";
  import {addBook} from "api";
    export default {
        data(){
            return {
              book:{
                bookName:"",
                bookCover:"",
                content:""
              }
            }
        },
        components: {
          MHeader
        },
        methods: {
          add(){
            addBook(this.book).then(res=>{
              //添加成功后返回列表页；
              // $route跟的是属性，$router跟的是方法；
              this.$router.push("/list");
            })
          }
        }
    }
</script>
<style scoped lang="less">
  .add{
    display: flex;
    flex-direction: column;/*子元素整体列布局*/
    padding:0 20px;
    .group{
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;/*子元素整体列布局*/
      label{
        font-size: 16px;
        line-height: 25px;
      }
      input{
        border: 1px solid #ccc;
        height: 30px;
      }
      button{
        height: 35px;
      }
    }
  }

</style>
