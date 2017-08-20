<template lang="html">
  <el-col>
    <el-upload
    action="http://127.0.0.1:8089/api/admin/imgs"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" :multiple="true"
    :on-success="hadnleSuccess">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  </el-col>
</template>

<script>
export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      hadnleSuccess(response, file, fileList){
        console.log(response)
      }
    }
  }
</script>

<style lang="css" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    /*border:1px solid silver*/
  }
  .avatar-uploader{
    width: 178px;
    border:1px solid silver
  }
</style>
