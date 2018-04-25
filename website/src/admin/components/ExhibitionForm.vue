<template lang="html">
  <el-col :span="16" :offset="4" class="wrap" >
    <h2>添加展览</h2>
    <el-form label-width="140px" class="work-form" :model="exhInfo" :rules="rules" ref="exhForm">
      <el-form-item label="中文标题" prop="title_cn">
        <el-input v-model="exhInfo.title_cn"></el-input>
      </el-form-item>
      <el-form-item label="英文标题" prop="title_en">
        <el-input v-model="exhInfo.title_en"></el-input>
      </el-form-item>
      <el-form-item label="创作时间" prop="create_time">
        <el-date-picker
          type="date"
          placeholder="创作时间"
          :editable="false"
          v-model="exhInfo.create_time">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上传封面" required>
        <el-upload
          :action="actionUrl"
          list-type="picture"
          :show-file-list="false"
          :on-success="hadnleCoverSuccess"
          class="avatar-uploader">
          <img v-if="exhInfo.coverUrl" :src="exhInfo.coverUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="中文描述" prop="desc_cn">
        <el-input type="textarea" v-model="exhInfo.desc_cn" ></el-input>
      </el-form-item>
      <el-form-item label="英文描述" prop="desc_en">
        <el-input type="textarea" v-model="exhInfo.desc_en" ></el-input>
      </el-form-item>
    </el-form>
    <slot name="btns">
    </slot>
  </el-col>
</template>

<script>
import { mapState } from "vuex"
export default {
  data(){
    return {
      rules:{
        title_cn:[
          {required:true,message:"请填写中文展览名称",trigger:"blur"}
        ],
        title_en:[
          {required:true,message:"请填写英文展览名称",trigger:"blur"}
        ],
        create_time:[
          {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
        ],
        desc_cn:[
          { required:true,message:"请填写中文展览描述",trigger:"blur"}
        ],
        desc_en:[
          { required:true,message:"请填写英文展览描述",trigger:"blur"}
        ]
      }
    }
  },
  computed:{
      ...mapState(["exhInfo","actionUrl"])
  },
  methods: {
    hadnleCoverSuccess(response,file,fileList){
      this.$store.commit("UPDATE_EXH_COVER",{
        url:response.data
      })
      // this.exhInfo.coverUrl = response.data
    }
  },
  created(){

  }

  }
</script>

<style lang="css" scoped>
.wrap{
  border-radius: 6px;
  box-shadow: 1px 1px 10px  #333333;
  margin-bottom: 30px;
  margin-top: 30px;
  padding-top: 4px;
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
</style>
