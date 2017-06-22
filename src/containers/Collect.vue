<template>
    <div>
      <m-header title="收藏页"></m-header>
      <ul class="collect-list">
        <li v-for="col in collect">
          <img :src="col.bookCover" alt="">
          <div class="content">
            <span>{{col.bookName}}</span>
            <a @click="cancel(col.id)">取消收藏</a>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
  import MHeader from "components/MHeader";
  import {mapState,mapMutations} from "vuex";
  import * as Types from "../store/types";
  import {cancelCollect} from "api";
    export default {
        data(){
            return {}
        },
      computed:{
        ...mapState(["collect"])
      },
        components: {
          MHeader
        },
        methods: {
          ...mapMutations([Types.REMOVE_COLLECT]),
          cancel(id){
            this[Types.REMOVE_COLLECT](id);
            cancelCollect(id);
          }
        }
    }
</script>
<style scoped lang="less">
  .collect-list{
    li{
      display: flex;
      align-items:center;
      width: 100%;
      height:100px;
      border-bottom:1px solid #999;
      img{
        width: 40%;
        height: 100%;
        margin-right:10px;
      }
      .content{
        display: flex;
        flex-direction: column;
      }
    }
  }

</style>
