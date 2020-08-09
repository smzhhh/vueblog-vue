<template>
    <div>
      <div class="el-header">
        <Header></Header>
      </div>
      <span><el-link type="success" href="/ship/add">创建船只</el-link></span>
      <el-table :data="ships" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80">
        </el-table-column>
        <el-table-column prop="shippingCompany" label="船公司" width="150">
        </el-table-column>
        <el-table-column prop="shipNameEn" label="英文船名" width="150">
        </el-table-column>
        <el-table-column prop="shipNameCn" label="中文船名">
        </el-table-column>
        <el-table-column prop="shipVoyageImport" label="进口航次">
        </el-table-column>
        <el-table-column prop="shipVoyageExport" label="出口航次">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="created" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope" >
            <el-button type="primary" icon="el-icon-edit" circle @click="editor(scope.row)" v-if="ownShip"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delete1(scope.row)" v-if="ownShip"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="mpage" background layout="prev, pager, next" :current-page="currentPage"
                     :page-size="pageSize" :total="total" @current-change=page>
      </el-pagination>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
      inject:['reload'], //用于刷新页面并重新加载数据
      name: "Ships",
      components: {Header},

      //数据回显
      data() {
        return {
          ships: [{}],
          currentPage: 1,
          total: 0,
          pageSize: 10,
          ownShip: false
        }
      },
      //获取船只数据
      methods: {
        page(currentPage) {
          const _this = this
          _this.$axios.get("/ships?currentPage=" + currentPage).then(res => {
            console.log(res)
            console.log("###############################")
            _this.ships = res.data.data.records
            _this.ship = res.data.data
            _this.currentPage = res.data.data.current
            _this.total = res.data.data.total
            _this.pageSize = res.data.data.size
            // 编辑按钮的显示，无权限不展示
            _this.ownShip = (_this.ships.userId === _this.$store.getters.getUser.id)
            console.log(_this.ownShip)
            console.log("##########"+_this.$store.getters.getUser.id+"##########")
            console.log("##########"+_this.ship.userId+"##########")
          })
        },

        editor(row) {
          this.id = row.id;
          const shipId = this.id
          //console.log(shipId)
          this.$axios.get('/ship/' + shipId).then(res => {
          this.$router.push('/ship/'+ shipId +'/edit')
          const ship = res.data.data
          this.ship.id = ship.id
          this.ship.shippingCompany = ship.shippingCompany
          this.ship.shipNameEn = ship.shipNameEn
          this.ship.shipNameCn = ship.shipNameCn
          this.ship.shipVoyageImport = ship.shipVoyageImport
          this.ship.shipVoyageExport = ship.shipVoyageExport
          this.ship.remark = ship.remark
          })
        },

        delete1(row) {
          this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //通过id删除指定文章
              this.id = row.id;
              const shipId = this.id
              //console.log(shipId)
                this.$axios.get('/ship/delete/' + shipId).then(res => {
                  if(res.data.code===200){
                    this.$message({type: 'success', message: '删除成功!'});
                    //刷新页面并重新加载数据
                    this.reload();
                  }else {
                    this.$message({type: 'error', message: '删除失败!'});
                  }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

          // 编辑按钮的显示，无权限不展示
          //this.ownShip = (ships.userId === this.$store.getters.getUser.id)
        },
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
  .mpage {
    margin: 0 auto;
    text-align: center;
  }
</style>
