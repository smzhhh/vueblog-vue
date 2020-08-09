<template>
  <div class="el-content">
    <div>
      <el-image
        style="width: 61px; height: 61px"
        class="el-logo"
        :src="img"></el-image>
    </div>
    <div class="el-logo-text">
      <h1>仲基欧巴技术实验室</h1>
    </div>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="#800080"
        active-text-color="#FF00FF">
        <el-menu-item index="1">
          <el-link type="success" href="/index">
            <span class="el-menu-text">主页</span>
          </el-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><span class="el-menu-text" >博客系统</span></template>
          <el-menu-item index="2-1">
            <span class="el-menu-text">
              <el-link href="/blogs">博客列表</el-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span class="el-menu-text">
              <el-link type="success" href="/blog/add">发表博客</el-link>
            </span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><span class="el-menu-text">船务管理系统</span></template>
          <el-menu-item index="3-1">
            <span class="el-menu-text">
              <el-link type="success" href="/ships">船只列表</el-link>
            </span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4"><span class="el-menu-text">关于我们</span></el-menu-item>
      </el-menu>
    </div>
    <div class="el-user-avatar">
      <el-avatar shape="square" :size="30" :src="user.avatar"></el-avatar>
    </div>
    <div class="el-user-username">
      <span>{{user.username}}</span>
    </div>
    <div class="el-menu-login">
      <el-link type="primary" href="/login"><span class="el-menu-login-text" v-show="!hasLogin">登录</span></el-link>
      <el-link type="danger" @click="logout"><span class="el-menu-login-text" v-show="hasLogin">退出</span></el-link>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Header",
      data() {
        return {
          activeIndex: '1',
          img: require('../assets/logo_1.png'),
          user:{
            username: '请先登录',
            avatar: require('../assets/default.jpg')
          },
          hasLogin: false
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          const _this = this
          _this.$axios.get("/logout",{
            headers:{
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            _this.$store.commit("REMOVE_INFO")
            _this.$router.push("/login")
          })
        }
      },
      created() {
        if (this.$store.getters.getUser.username) {
          this.user.username = this.$store.getters.getUser.username
          this.user.avatar = this.$store.getters.getUser.avatar

          this.hasLogin = true
        }
      }
    }
</script>

<style scoped>
  .el-content{
    width: 1500px;
    height: 60px;
    margin: auto;
  }
  .el-logo{
    float: left;
    margin: 5px -60px;
  }
  .el-logo-text{
    float: left;
    margin: -10px 20px;
  }
  .el-menu-demo {
    float: left;
    margin: 1px 50px;
  }
  .el-menu-text{
    font-size: 16px;
    text-align: center;
  }
  .el-user-avatar{
    float: left;
    margin: 19px -30px;
  }
  .el-user-username{
    float: left;
    margin: 22px 10px;
    font-size: 16px;

  }
  .el-menu-login{
    float: left;
    margin: 20px 10px;

  }
  .el-menu-login-text{
    font-size: 16px;
    text-align: center;
  }
</style>
