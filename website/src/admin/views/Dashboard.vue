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
    <el-row class="center" type="flex">
      <div :span="4" class="el-menu-vertical">
        <el-menu
            :default-active="$route.path"
            class="el-menu" theme="dark"
            :router="true"
            :unique-opened="true"
            :collapse="isCollapse">
          <template
              v-for="(item,index) in $router.options.routes"
              v-if="!item.hidden">
            <el-submenu
                :index="index+''"
                v-if="!item.leaf"
                :collapse="isCollapse">
              <template slot="title">
                <!-- <i class="el-icon-message"></i> -->
                <icon :name="item.icon" class="icon"></icon>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                  v-for="child in item.children"
                  :index="item.path+'/'+child.path"
                  :key="child.path" v-if="!child.hidden">
                <icon :name="child.icon" class="icon"></icon>
                <span>{{child.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item
                v-else-if="item.leaf&&item.children.length>0"
                :index="item.path+'/'+item.children[0].path"
                :key="index+''">
              <icon :name="item.icon" class="icon"></icon>
              <span>{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div  class="content">
        <el-row class="content-header" >
          <el-col :span="1" class="thumb">
            <icon name="reorder" class="align-justify"  @click.native="thumb"></icon>
          </el-col>
          <el-col :span="23" >
            <el-breadcrumb >
              <el-breadcrumb-item style="height:30px;line-height:30px;text-align:left;" v-for="item in $route.matched" :key="item.name">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row>
          <router-view></router-view>
        </el-row>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import {mapActions,mapState} from "vuex"
export default {
  data(){
    return {
      isCollapse:true
    }
  },
  computed:{
    // ...mapState(["isCollapse"])
  },
  methods:{
    ...mapActions(["signOut"]),
    async confirm(){
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
    },
    thumb(){
      this.isCollapse = !this.isCollapse
    }
  },
  mounted(){
    console.log(this.$route.matched)
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
  .container{
    height: 100%;
  }
  .container{
    position: relative;
  }
  .center{
      height: calc(100% - 60px);
  }
  .el-menu-vertical{
    height: 100%;
    text-align: left;
  }
  .el-menu:not(.el-menu--collapse){
    min-height:100%;
    width:230px;
  }
  .el-menu{
    min-height:100%;
    border-radius: 0;
   vertical-align:text-top;
  }
  .content{
    height:100%;
    overflow: auto;
    flex:1;
  }
  .thumb{
    text-align: left;
    color:black;
  }
  .align-justify{
    width:36px;
    height: 28px;
    cursor: pointer;
    padding:4px 8px;
  }
  .icon{
    transform: translateY(3px);
    margin-right:8px;
  }
</style>
