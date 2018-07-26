<template lang="html">
    <works-form ref="createWork">
      <el-row class="btns" slot="btns">
        <el-button type="primary" v-if="isShow" @click="submit"  :loading="loading">立即提交</el-button>
        <el-button @click="add" type="success" icon="plus" :disabled="disabled">新增</el-button>
        <el-button type="danger" icon="delete" @click="remove" :disabled="disabled">删除</el-button>
      </el-row>
    </works-form>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {createWork} from "@/api"
import worksFrom from "@/admin/components/worksFrom"
import utils from "@/utils"
export default {
    components:{
      "works-form":worksFrom,
    },
    data() {
      return {
        isShow:true,
        imageUrl:"",
        loading:false,
        disabled:false,
      };
    },
    computed:{
    ...mapState(["actionUrl","workInfo","rules","headRule"])
    },
    created(){
      this.$store.commit("RESET_ALLFIELDS",{
        title_cn:"",
        title_en:"",
        create_time:"",
        coverUrl:{},
        works:[
          {
            name_cn:"",
            name_en:"",
            desc_cn:"",
            desc_en:"",
            imageUrl:{},
            count:"一"
          },
        ]
      })
    },
    methods: {
      add(){
        const rule = {
                name_cn:[
                  {required:true,message:"请填写中文标题",trigger:"blur"}
                ],
                name_en:[
                  {required:true,message:"请填写英文标题",trigger:"blur"}
                ],
                create_time:[
                  {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                ],
                width:[
                  {required:true,message:"请填写作品尺寸",trigger:"blur"}
                ]
              }
        let count = utils.changeNumber(this.workInfo.works.length+1)
        const data = {
          info:{
            name_cn:"",
            name_en:"",
            desc_cn:"",
            desc_en:"",
            imageUrl:{},//最后过滤掉
            count:""//最后过滤掉
          },
          rule,
          count
        }
        this.$store.commit("ADD_FIELD",data)
        if(this.workInfo.works.length>0){
          this.isShow = true
        }
      },
      remove(){
        this.$store.commit("REMOVE_FIELD")
        if(this.workInfo.works.length<=0){
          this.isShow = false
        }
      },
      submit(){
        const proArr =  this.workInfo.works.map((item,index)=>{
          return new Promise((resolve,rejected)=>{
            /**
             * [valid description]
             * @type {[type]}
             * 当 ref 和 v-for 一起使用时，获取到的引用会是一个数组，包含和循环数据源对应的子组件。
             */
            this.$refs["createWork"].$refs[`form${index}`][0].validate(valid=>{
              if(valid){
                  if(this.workInfo.works.every(item=>item.imageUrl!=='')){
                    resolve(true)
                  }else{
                    resolve(false)
                    this.$message({
                      message:"您有作品未上传完成",
                      type:"error"
                    })
                  }
              }else{
                resolve(false)
                this.$message({
                  message:"请填写完所有表单之后再提交",
                  type:"error"
                })
              }
            })
          })
        })
      proArr.push(new Promise((resolve,rejected)=>{
        this.$refs["createWork"].$refs["coverForm"].validate(valid=>{
          if(valid){
            if(this.workInfo.coverUrl.mobilepictures!==""){
              resolve(true)
            }else{
              resolve(false)
              this.$message({
                message:"请上传作品封面",
                type:"error"
              })
            }
          }else{
            resolve(false)
            this.$message({
              message:"请填写完所有表单之后再提交",
              type:"error"
            })
          }
        })
      }))
      Promise.all(proArr)
            .then(arr=>{
                if(arr.every(item=>item===true)){
                  this.disabled = true
                  this.loading = true
                  console.log(this.workInfo)
                  // 在这发请求
                  createWork(this.workInfo).then(({data:{status}})=>{
                    if(status===1){
                      this.$message({
                        message:"提交成功",
                        type:"success",
                        onClose:()=>{
                          this.$store.commit("RESET_ALLFIELDS",{
                            title_cn:"",
                            title_en:"",
                            create_time:"",
                            coverUrl:{},
                            works:[
                              {
                                name_cn:"",
                                name_en:"",
                                desc_cn:"",
                                desc_en:"",
                                imageUrl:{},
                                count:"一"
                              },
                            ]
                          })
                          this.disabled = false;
                          this.loading = false
                          this.$router.push("/admin/works")
                        }
                      })
                    }
                  })
                }
            })
      },
    }
  }
</script>

<style lang="css" scoped>
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
 .avatar-uploader-icon:hover {
   border-color: #20a0ff;
 }
 .avatar-uploader-icon {
   font-width: 28px;
   color: #8c939d;
   width: 178px;
   height: 178px;
   line-height: 178px;
   text-align: center;
   border: 2px dashed #d9d9d9 ;
   border-radius: 6px;
 }
 .avatar {
   width: 178px;
   height: 178px;
   display: block;
   border-radius: 6px;
 }
.btns{
  padding-bottom: 20px;
  padding-top: 20px;
  border-top:2px solid  #d9d9d9 ;
}
h3{
  margin:16px 0;
  font-width: 18px;
}
.text-center{
  text-align: center;
}
</style>
