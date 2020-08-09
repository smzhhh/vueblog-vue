<template>
  <div>
    <div class="el-header">
      <Header></Header>
    </div>
    <div>
      <el-carousel :interval="5000" arrow="always" :height="bannerHeight+'px'">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <el-row>
            <el-col :span="24"><img ref="bannerHeight+'px'" :src="item.idView" class="bannerImg" @load="imgLoad"/>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
      name: "Index",
      components: {Header},
      data(){
        return{
          // 图片需要引入, 否则无法显示
          imgList: [
            {id: 0, idView: require('../assets/images/banner1.jpg')},
            {id: 1, idView: require('../assets/images/banner2.jpg')},
            {id: 2, idView: require('../assets/images/banner3.jpg')},
            {id: 3, idView: require('../assets/images/banner4.jpg')},
          ]
        }
      },
      methods: {
        imgLoad(){
          this.$nextTick(()=> {
            this.bannerHeight=this.$refs.bannerHeight[0].height;
            console.log(this.$refs.bannerHeight[0].height)
          })
        }
      },
      mounted() {
        this.imgLoad();
        window.addEventListener('resize', () => {
          this.bannerHeight = this.$refs.bannerHeight[0].height
          this.imgLoad();
        }, false)
      },
    }
</script>

<style scoped>
  .el-header{
    margin: 5px auto 40px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
