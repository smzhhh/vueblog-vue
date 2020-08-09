<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<!--
reload()用于刷新页面并重新加载数据
https://blog.csdn.net/weixin_44096961/article/details/102386628
-->

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  #app {
    max-width: 960px;
    margin: 0 auto;
  }
</style>
