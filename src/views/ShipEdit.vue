<template>
  <div>
    <Header></Header>

    <div class="m-content">
      <el-form :model="shipForm" :rules="rules" ref="shipForm" label-width="100px" class="demo-shipForm">
        <el-form-item label="船公司" prop="shippingCompany">
          <el-input v-model="shipForm.shippingCompany"></el-input>
        </el-form-item>
        <el-form-item label="英文船名" prop="shipNameEn">
          <el-input v-model="shipForm.shipNameEn"></el-input>
        </el-form-item>
        <el-form-item label="中文船名" prop="shipNameCn">
          <el-input v-model="shipForm.shipNameCn"></el-input>
        </el-form-item>
        <el-form-item label="进口航次" prop="shipVoyageImport">
          <el-input v-model="shipForm.shipVoyageImport"></el-input>
        </el-form-item>
        <el-form-item label="出口航次" prop="shipVoyageExport">
          <el-input v-model="shipForm.shipVoyageExport"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="shipForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('shipForm')">创建</el-button>
          <el-button @click="resetForm('shipForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
      name: "ShipEdit",
      components: {Header},
      data() {
        return {
          shipForm: {
            id: '',
            shippingCompany: '',
            shipNameEn: '',
            shipNameCn: '',
            shipVoyageImport: '',
            shipVoyageExport: '',
            remark: ''
          },
          rules: {
            title: [
              { required: true, message: '请输入船公司', trigger: 'blur' },
              // { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
            ],
            description: [
              { required: true, message: '请输入英文船名', trigger: 'blur' }
            ],
            content: [
              { trequired: true, message: '请输入中文船名', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {

              const _this = this
              this.$axios.post('/ship/edit', this.shipForm,{
                headers:{
                  "Authorization": localStorage.getItem("token")
                }
              }).then(res => {
                console.log(res)
                _this.$alert('操作成功', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push("/ships")
                  }
                });
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      created() {
        const shipId = this.$route.params.shipId
        // console.log(shipId)
        const _this = this
        if(shipId) {
          this.$axios.get('/ship/' + shipId).then(res => {
            const ship = res.data.data
            _this.shipForm.id = ship.id
            _this.shipForm.shippingCompany = ship.shippingCompany
            _this.shipForm.shipNameEn = ship.shipNameEn
            _this.shipForm.shipNameCn = ship.shipNameCn
            _this.shipForm.shipVoyageImport = ship.shipVoyageImport
            _this.shipForm.shipVoyageExport = ship.shipVoyageExport
            _this.shipForm.remark = ship.remark
          })
        }
      }
    }
</script>

<style scoped>

</style>
