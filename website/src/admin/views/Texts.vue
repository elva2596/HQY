<template lang="html">
  <div class="container">
    <el-table
        :data="textsLists"
         border>
        <el-table-column label="文本标题" prop="tittle_cn" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
             <el-button size="small" @click="edit(scope.$index,scope.row)">编辑</el-button>
             <el-button size="small" type="primary" @click="preview(scope.$index,scope.row)">查看</el-button>
             <el-button size="small" type="danger" @click="remove(scope.$index,scope.row)">删除</el-button>
           </template>
        </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible"  :tittle="tittle" :size="size">
      <Text-form ref="updateExh">
        <el-row class="btns" slot="btns">
          <el-button type="primary"  @click="update" :disabled="disabled">立即更新</el-button>
          <el-button  icon="delete" @click="cancel" :disabled="disabled">取消</el-button>
        </el-row>
      </Text-form>
    </el-dialog>
  </div>
</template>

<script>
import TextForm from "@/admin/components/TextForm"
import {mapState} from "vuex"
import {getTexts,deleteText} from "@/api"
export default {
  components:{
    "Text-form":TextForm
  },
  data(){
    return {
      isShow:true,
      disabled:false,
      visible:false,
      size:'',
      tittle:'',
      curIndex:''
    }
  },
  methods:{
    edit(index,row){
      this.visible=true
      this.size= "full"
      this.curIndex = index
      this.$store.dispatch("editOneText",row._id)
    },
    preview(index,row){
      this.$router.push({path:`/text/${row._id}`})
    },
    remove(index,row){
      this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$store
            .dispatch("deleteText",{id:row._id,index})
            .then(()=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })
            .catch(err=>{
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            })
      })
      .catch((err) => {
        console.log(err)
      });
    },
    update(){
      this.disabled = true
      console.log(this.textInfo)
      this.$store
          .dispatch("updateOneText",{textInfo:this.textInfo,index:this.curIndex})
          .then(()=>{
            this.$message({
              message:"保存成功",
              type: 'success',
              onClose:()=>{
                this.visible = false
                this.disabled = false
              }
            })
          })
          .catch((err)=>{
            this.$message({
              message:"保存失败",
              type: 'error',
              onClose:()=>{
                this.disabled = false
              }
            })
          })
    },
    cancel(){
      this.visible = false
    },
  },
  created(){
    this.$store.dispatch("getTexts")
  },
  computed:{
    ...mapState(["textInfo","textsLists"])
  }
}
</script>

<style lang="css" scoped>
.btns{
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
