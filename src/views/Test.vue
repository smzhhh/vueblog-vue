<template>
  <div>
    <div class="el-header">
      <Header></Header>
    </div>
    <div>
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
  export default {
    name: "Test",
    components: {Header},
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
  .el-row{
    width: 600px;
    height: 200px;
  }
  .mpage {
    margin: 0 auto;
    text-align: center;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
