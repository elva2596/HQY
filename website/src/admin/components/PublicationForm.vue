<template lang="html">
  <div class="container">
    <h2>编辑出版物</h2>
    <div class="head_tittle">
      <h4>出版物标题中文</h4>
      <el-input class="pub_tittle" placeholder="请填写中文标题" v-model="pubInfo.tittle_cn"></el-input>
      <h4>出版物标题英文</h4>
      <el-input class="pub_tittle" placeholder="请填写英文标题" v-model="pubInfo.tittle_en"></el-input>
    </div>
    <div class="cover">
      <h4>添加出版物封面</h4>
      <el-upload
        :action="actionUrl"
        list-type="picture"
        :show-file-list="false"
        :on-success="hadnleCoverSuccess"
        class="avatar-uploader">
        <img v-if="pubInfo.coverUrl" :src="pubInfo.coverUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div class="edit_container">
      <h4 class="title">出版物信息中文</h4>
      <quill-editor
          class="editer"
          v-model="pubInfo.content_cn"
          ref="editor_cn"
          :options="options_cn">
      </quill-editor>
    </div>
    <div class="edit_container">
      <h4 class="title">出版物信息英文</h4>
      <quill-editor
          class="editer"
          v-model="pubInfo.content_en"
          ref="editor_en"
          :options="options_en"
          ></quill-editor>
    </div>
    <slot name="btns">

    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data(){
    return {
      options_en:{
        //  placeholder:"请在这里填写英文内容"
      },
      options_cn:{
        placeholder:"请在这里填写中文内容"
      },
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
      ...mapState(["pubInfo","actionUrl"])
  },
  methods: {
    hadnleCoverSuccess(response,file,fileList){
      this.$store.commit("UPDATE_PUB_COVER",{
        url:response.data
      })
    }
  }

  }
</script>

<style lang="css" scoped>
.container{
  width: 600px;
  margin:30px auto;
  box-shadow: 1px 1px 10px  #333333;
  border-radius: 6px;
  padding-top: 10px;
  padding-bottom: 2px;
}
.container h2{
  border-bottom: 1px solid silver;
  padding-bottom: 20px;
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
.edit_container{
  /*background: red;*/
  padding: 40px 0;
  margin-bottom: 40px;
}
.editer{
  height: 300px;
  /*background: blue;*/
  margin-bottom: 4px;
}
.title{
  border-top: 1px solid silver;
  padding-top: 30px;
}
.pub_tittle{
  width: 250px;
}
.head_tittle{
  /*background: red;*/
  padding-bottom:30px;
  border-bottom: 1px solid silver;
}
</style>
