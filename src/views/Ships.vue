<template>
    <div>
      <Header></Header>
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
            <el-button type="primary" icon="el-icon-edit" circle @click="editor(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delete1(scope.row)"></el-button>
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
      name: "Ships",
      components: {Header},
      data() {
        return {
          ships: [{}],
          currentPage: 1,
          total: 0,
          pageSize: 10,
        }
      },
      methods: {
        page(currentPage) {
          const _this = this
          _this.$axios.get("/ships?currentPage=" + currentPage).then(res => {
            //console.log(res)
            _this.ships = res.data.data.records
            _this.currentPage = res.data.data.current
            _this.total = res.data.data.total
            _this.pageSize = res.data.data.size
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

          // 编辑按钮的显示，无权限不展示
          //_this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
          })
        },

        delete1(row) {
          this.id = row.id;
          const deshipId = this.id
          console.log(deshipId)
            this.$axios.get('/ship/' + shipId).then(res => {
              this.$router.push('/ship/'+ shipId +'/delete')

          })
        }
      },
      created() {
        this.page(1)

        }

    }
</script>

<style scoped>
  .mpage {
    margin: 0 auto;
    text-align: center;
  }
</style>
