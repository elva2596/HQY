<template lang="html">
  <div class="container">
    <el-table
        :data="tableData"
         border>
        <el-table-column type="index"  ></el-table-column>
        <el-table-column label="文本标题" prop="tittle_cn" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
             <el-button size="small" @click="edit(scope.$index,scope.row)">编辑</el-button>
             <el-button size="small" type="primary" @click="preview(scope.$index,scope.row)">查看</el-button>
             <el-button size="small" type="danger" @click="remove(scope.$index,scope.row)">删除</el-button>
           </template>
        </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible"  :title="title" :size="size">
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
      tableData:[],
      isShow:true,
      loading:false,
      disabled:false,
      visible:false,
      type:'',
      size:'',
      title:'',
    }
  },
  methods:{
    edit(index,row){
      this.visible=true
      this.size= "full"
      this.$store.dispatch("editOneText",row._id)
      console.log(index,row)
    },
    preview(index,row){
      console.log(index,row)
    },
    remove(index,row){
      this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteText(row._id).then(re=>{
            this.tableData.splice(index,1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            console.log(re)
            })
        }).catch(() => {
        });
    },
    update(){
          this.disabled = true
          this.$store.dispatch("updateOneText",this.textInfo)
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
    },
    cancel(){
      this.visible = false
    },
  },
  created(){
    getTexts().then(({data})=>{
      console.log(data.data)
      this.tableData = data.data
    })
  },
  computed:{
    ...mapState(["textInfo"])
  }
}
</script>

<style lang="css" scoped>
.btns{
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
