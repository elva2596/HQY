<template lang="html">
  <div>
    <el-table
        :data="newsLists"
         border>
        <el-table-column label="新闻标题" prop="tittle_cn" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
             <el-button size="small" @click="edit(scope.$index,scope.row)">编辑</el-button>
             <!-- <el-button size="small" type="primary" @click="preview(scope.$index,scope.row)">查看</el-button> -->
             <el-button size="small" type="danger" @click="remove(scope.$index,scope.row)">删除</el-button>
           </template>
        </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible"  :tittle="tittle" :size="size">
      <news-form ref="updateNew">
        <el-row class="btns" slot="btns">
          <el-button type="primary"  @click="update" :disabled="disabled">立即更新</el-button>
          <el-button  icon="delete" @click="cancel" :disabled="disabled">取消</el-button>
        </el-row>
      </news-form>
    </el-dialog>
  </div>

</template>

<script>
import {mapActions,mapState} from "vuex"
import utils from "@/utils"
import newsForm from "@/admin/components/newsForm.vue"
var origin = '';
export default {
  data(){
    return {
      isShow:true,
      disabled:false,
      visible:false,
      size:'',
      tittle:'',
      isDelete:false,
      curIndex:'',
    }
  },
  methods:{
    edit(index,row){
      this.visible=true
      this.size= "full"
      this.curIndex = index
      this.$store.dispatch("editNew",row._id)
    },
    remove(index,row){
      this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
          this.$store
              .dispatch("deleteNew",{id:row._id,index})
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
      this.$store
          .dispatch("updateOneNew",{newsInfo:this.newsInfo,index:this.curIndex})
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
  components:{
    "news-form":newsForm
  },
  computed:{
    ...mapState(["newsInfo","newsLists"])
  },
  created(){
    this.$store.dispatch("getAllNews")
  }
}
</script>

<style lang="css" scoped>
.dialog{
  position: absolute;
  background: rgba(0,0,0,0.4);
  top:0;
  bottom:0;
  left:0;
  right:0;
  color:white;
}
.wrap{
  border-radius: 6px;
  box-shadow: 1px 1px 10px  #333333;
  margin-bottom: 30px;
  margin-top: 30px;
}
.form-wrap{
  box-shadow: 1px 1px 10px  #333333;
    border-radius: 6px;
    margin: 40px 60px;
    margin-top:0;
}
.work-form{
  padding: 30px 60px 30px 40px;
  border-top:2px solid  #d9d9d9 ;
  margin-bottom: 30px;
  text-align: left;
}

.btns{
  padding-bottom: 20px;
  padding-top: 20px;
  border-top:2px solid  #d9d9d9 ;
}
</style>
