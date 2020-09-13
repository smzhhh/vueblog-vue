<template>
  <div>
    <div class="el-header">
      <Header></Header>
    </div>
    <div class="el-about">
      <About></About>
    </div>
    <div class="el-blogs">
      <el-row class="el-row" v-for="blog in blogs" align="top">
        <el-card :body-style="{ margin: '0px', padding: '0px', width: '350px', height: '150px' }">
          <h4>
            <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
              {{blog.title}}
            </router-link>
          </h4>
          <p>{{blog.description}}</p>
        </el-card>

      </el-row>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import Header from "../components/Header";
  import About from "../components/About";

  export default {
    name: "Test",
    components: {Header, About},
    data(){
      return {
        blogs: {},
        currentPage: 1,
        total: 0,
        pageSize: 10
      }
    },
    methods: {
      page(currentPage){
        const _this = this
        _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
          _this.blogs = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
          _this.pageSize = res.data.data.size
        })
      }
    },
    created() {
      this.page(1)
    }
  }
</script>

<style scoped>
  .el-header{
    margin: 5px auto 40px;
  }
  .el-blogs{
    background: yellow;

    /*margin: 100px 10px 50px 20px;*/
  }
  .el-row{
    width: 800px;
    height: 200px;
  }


</style>
