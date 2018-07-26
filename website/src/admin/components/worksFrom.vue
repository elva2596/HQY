<template lang="html">
  <el-col :span="16" :offset="4" class="wrap">
    <h2>添加作品详情</h2>
    <el-row  class="form-wrap">
      <h3>首页封面信息</h3>
      <el-form label-width="140px" class="work-form" :model="workInfo" :rules="headRule" ref="coverForm">
        <el-form-item label="中文标题" prop="title_cn">
          <el-input v-model="workInfo.title_cn"></el-input>
        </el-form-item>
        <el-form-item label="英文标题" prop="title_en">
          <el-input v-model="workInfo.title_en"></el-input>
        </el-form-item>
        <el-form-item label="上传封面" required>
          <el-upload
            :action="uploadUrl"
            list-type="picture"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            class="avatar-uploader">
            <img v-if="workInfo.coverUrl.pcpictures"
                  :src="workInfo.coverUrl.mobilepictures.url"
                  class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-row>
    <template v-for="(item,index) in workInfo.works">
      <el-row class="form-wrap">
        <h3>添加作品详情{{item.count}}</h3>
        <el-form :ref="'form'+index" label-width="140px" class="work-form" :model="item" :rules="rules[index]">
          <el-form-item label="上传详情作品" required>
            <el-upload
              :action="uploadUrl"
              list-type="picture"
              :show-file-list="false"
              :on-success="handleSuccess"
              class="avatar-uploader"
              :objectBind="index">
              <img v-if="item.imageUrl.mobilepictures"
                    :src="item.imageUrl.mobilepictures.url"
                    class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
            <div class="edit_container">
              <h4 class="title">作品详情描述中文</h4>
              <quill-editor
                  class="editer"
                  v-model="item.desc_cn"
                  ref="editor_cn"
                  >
              </quill-editor>
            </div>
            <div class="edit_container">
              <h4 class="title">作品详情描述英文</h4>
              <quill-editor
                  class="editer"
                  v-model="item.desc_en"
                  ref="editor_cn"
                  >
              </quill-editor>
            </div>
        </el-form>
      </el-row>
    </template>
    <slot name="btns"></slot>
    <slot></slot>
  </el-col>
</template>

<script>
import {mapState} from 'vuex'
import {createWork} from "@/api"
export default {
    data() {
      return {
        isShow:true,
        imageUrl:"",
        loading:false,
        disabled:false,
      };
    },
    computed:{
      ...mapState(["actionUrl","workInfo","rules","headRule"]),
      uploadUrl(){
        return `${this.actionUrl}?type=0`
      }
    },
    methods: {
      handleSuccess(response, file, fileList,objectBind){
        /**
         * [修改store中的的wordkInfo.works数组中的对象的imageUrl属性]
         * @type {[type]}
         * TODO:
         *  使用mutation更改store中的状态
         */
        this.$store.commit(
          "UPDATE_DETAIL_IMG",
          {
            index:objectBind,
            url: response.data
          })
      },
      handleCoverSuccess(response,file,fileList){
        this.$store.commit(
          "UPDATE_DETAILR_COVER",
          {url: response.data}
        )
      }
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
   /* width: 178px;
   height: 178px; */
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
.edit_container{
  padding: 40px 0;
  margin-bottom: 40px;
  border:1px solid silver !important;
  border-radius: 5px;
}
.editer{
  min-height: 300px;
  margin-bottom: 4px;
}
h4{
  text-align: center;
}
</style>
