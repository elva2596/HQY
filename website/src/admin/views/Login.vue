<template lang="html">
  <div class="login">
    <el-form ref="login-form" :model="form"  class="login_form" :rules="rules" >
      <h3>欢迎登录后台管理系统</h3>
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="用户名"  auto-complete="off"></el-input>
      </el-form-item >
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码"  type="password"  auto-complete="off"></el-input>
      </el-form-item >
      <el-form-item >
        <el-button type="primary"   @click="submitForm('login-form')" :disabled="disabled">立即登录</el-button>
        <el-button @click="resetForm('login-form')" :disabled="disabled">重置</el-button>
      </el-form-item>
      <p class="admin-tip">没有密码? <span @click="register">立即注册</span></p>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  data(){
    return {
      form:{
        name:"",
        password:""
      },
      rules:{
        name:{required:true,message:"请填写用户名",trigger:"blur"},
        password:{required:true,message:"请填写密码",trigger:"blur"}
      },
      disabled:false
    }
  },
  computed:{
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          this.login(this.form)
              .then(({status})=>{
                // 这里进行路由的跳转
                if(status===1){
                  this.disabled = true
                  this.$message({
                    message:"登录成功",
                    type: 'success',
                    onClose:()=>{
                      this.$router.push("/admin")
                    }
                  })
                }else if(status===0){
                  this.$message({
                    message:"用户名或密码错误",
                    type: 'error'
                  })
                }else{
                  throw new Error("登录失败")
                }
              })
              .catch(err=>{
                this.$message({
                  message:err.message.toString(),
                  type: 'error',
                  showClose:true,
                  duration:0
                })
              })
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
    },
    register(){
      if(!this.disabled){
        this.$router.push("/register")
      }
    },
    ...mapActions(["login"])
    // this.login 映射为this.$store.dispatch("login")
  }
}
</script>

<style lang="css" scoped>
.login_form{
  width:350px;
  padding:10px 30px;
  margin:auto;
  background: white;
  /*背景以后要改*/
  border-radius: 5px;
}

</style>
