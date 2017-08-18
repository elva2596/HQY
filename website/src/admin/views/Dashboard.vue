<template lang="html">
  <el-row class="container">
    <el-row class="header" type="flex" justify="space-between">
      <el-col :span="4">AD<span class="min">MIN</span></el-col>
      <el-col :span="4">
        <el-dropdown trigger="click" menu-align="start">
              <span  style="color:#c0ccda;cursor: pointer;font-weight:700">
                更多操作<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >网站首页</el-dropdown-item>
                <el-dropdown-item divided @click.native="confirm">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="center" >
      <el-col :span="3" class="el-menu-vertical">
        <el-menu :default-active="defaultPath" class="el-menu-vertical" theme="dark" :router="true" >
          <!-- <template v-for="(item,key) in $router.options.routes" v-if="!item.hidden" :keys="key">
            <el-menu-item v-for="(child,key) in item.children" :index="item.path+'/'+child.path" v-if="!child.hidden" :keys="key">{{child.name}}</el-menu-item>
          </template> -->
            <el-menu-item v-for="(child,key) in $router.options.routes[3].children" v-if="!child.hidden" :keys="key" :index="'/admin/'+child.path">{{child.name}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <router-view></router-view>
      </el-col>

    </el-row>
  </el-row>
</template>

<script>
import {mapActions} from "vuex"
export default {
  data(){
    return {
    }
  },
  computed:{
    defaultPath(){
      // 使用计算属性来解决浏览器刷新时候恢复在原来的导航处
      return this.$route.path;
    }
  },
  methods:{
    ...mapActions(["signOut"]),
    async confirm(){
      console.log(this.$router.options.routes[3].children)
      try {
        let val = await this.$confirm("确认退出吗?","提示",{
          confirmButtonText:"确认",
          cancelButtonText:"取消",
          type:"warning"
        })
        if(val==="confirm"&&await this.signOut()){
          this.$message({
            message:"退出成功",
            type: 'success',
            duration:1500,
            onClose:()=>{
              this.$router.replace("/login")
            }
          })
        }
      }catch(e){
          console.log(e)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.header{
  height: 60px;
  background: #2c3e50;
  color:white;
  line-height: 60px;
  font-size: 24px
}
.header .min{
  font-style: italic;
  color:rgb(32, 160, 255);
}
  .container,
  .el-menu-vertical{

    height: calc(100%);
  }
  .container{
    position: relative;
  }
  .center{
      height: calc(100% - 60px);
  }
  .el-menu-vertical{
    text-align: left;
  }
</style>
