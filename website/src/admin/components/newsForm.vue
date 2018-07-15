<template lang="html">
  <el-col :span="16" :offset="6" class="wrap" >
    <h2>新闻表单编辑</h2>
    <el-form label-width="140px" class="work-form" :model="newsInfo" ref="newForm">
      <div class="edit_container">
        <h4>新闻标题中文</h4>
        <el-input class="news_tittle" placeholder="请填写中文标题" v-model="newsInfo.tittle_cn"></el-input>
        <h4>新闻标题英文</h4>
        <el-input class="news_tittle" placeholder="请填写英文标题" v-model="newsInfo.tittle_en"></el-input>
        <h4 class="title">新闻内容中文</h4>
        <quill-editor
            class="editer"
            v-model="newsInfo.content_cn"
            ref="editor_cn"
            :options="options_cn">
        </quill-editor>
      </div>
      <div class="edit_container">
        <h4 class="title">新闻内容英文</h4>
        <quill-editor
            class="editer"
            v-model="newsInfo.content_en"
            ref="editor_en"
            ></quill-editor>
      </div>
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
        options_cn:{
          placeholder:"请在这里填写中文内容"
        }
      }
  },
  computed:{
      ...mapState(["newsInfo","actionUrl"])
  },
  methods: {
    hadnleCoverSuccess(response,file,fileList){
      this.$store.commit("UPDATE_NEWS_COVER",{
        url:response.data
      })
    }
  }

  }
</script>

<style lang="css" scoped>
.wrap{
  width: 600px;
  border-radius: 6px;
  box-shadow: 1px 1px 10px  #333333;
  margin-bottom: 30px;
  margin-top: 30px;
  padding-top: 4px;
}
.work-form{
  margin-bottom: 30px;
  text-align: left;
  padding: 0;
}
.edit_container{
  margin-bottom: 40px;
  text-align: center;
}
.editer{
  height: 400px;
  margin-bottom: 4px;
}
.title{
  border-top: 1px solid silver;
  padding-top: 30px;
  text-align: center;
}
.news_tittle{
  width: 250px;
}
</style>
