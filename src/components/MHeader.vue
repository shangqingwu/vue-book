<template>
    <div class="header">
      {{title}}
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
      props:["title"],
        components: {},
        methods: {}
    }
</script>
<style scoped>
  .header{
    background: #f1f1f1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666;
  }
</style>
