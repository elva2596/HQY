<template lang="html">
  <div class="container">
    <h2>编辑文本</h2>
    <div class="head_tittle">
      <h4>文本标题中文</h4>
      <el-input class="pub_tittle" placeholder="请填写中文标题" v-model="textInfo.tittle_cn"></el-input>
      <h4>文本标题英文</h4>
      <el-input class="pub_tittle" placeholder="请填写英文标题" v-model="textInfo.tittle_en"></el-input>
      <h4>作者和时间中文</h4>
      <el-input class="pub_tittle" placeholder="请填写作者和时间中文" v-model="textInfo.authorInfo_cn"></el-input>
      <h4>作者和时间英文</h4>
      <el-input class="pub_tittle" placeholder="请填写作者和时间英文" v-model="textInfo.authorInfo_en"></el-input>
    <!-- <el-upload
      class="bio-upload"
      ref="bioUpload"
      :action="actionUrl"
      :before-upload = "beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="textInfo.fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">请上传您的文本,命名请按照-CN.pdf/-EN.pdf结尾</div>
    </el-upload> -->
    <UploadPdf
      :infoFileLists="textInfo.fileList"
      :actionUrl="actionUrl"
    ></UploadPdf>
    </div>
    <div class="edit_container">
      <h4 class="title">文本内容中文</h4>
      <quill-editor
          class="editer"
          v-model="textInfo.content_cn"
          ref="editor_cn"
          :options="options_cn">
      </quill-editor>
    </div>
    <div class="edit_container">
      <h4 class="title">文本内容英文</h4>
      <quill-editor
          class="editer"
          v-model="textInfo.content_en"
          ref="editor_en"
          ></quill-editor>
    </div>
    <slot name="btns">

    </slot>
  </div>
</template>

<script>
/**
 * [options_cn 把上传组件单独提取出来]
 * @type {Object}
 */
import UploadPdf from "./UploadPdf"
import { mapState } from "vuex"
export default {
  data(){
    return {
      options_cn:{
        placeholder:"请在这里填写中文内容"
      }
    }
  },
  computed:{
      ...mapState(["textInfo","actionUrl"])
  },
  components:{
    UploadPdf
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
/* .bio-upload{
  margin-top: 30px;
} */
</style>
