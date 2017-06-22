<template>
  <div>
    <m-header title="修改图书"></m-header>
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
        <button @click="update">修改图书</button>
        <router-link to="/list" tag="button">返回</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import MHeader from "components/MHeader";
  import {getBook,updateBook} from "api";
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
    created(){
      this.getOneBook();
    },
    methods: {
      getOneBook(){
        getBook(this.$route.params.id).then(res=>{
          this.book = res.data;
        })
      },
      update(){
        updateBook(this.$route.params.id,this.book).then(res=>{
            this.$router.push("/list");
         })
      }
    },
    activated(){  //如果调用了keep-alive，但是依然会调用activated方法；
      this.getOneBook();
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
