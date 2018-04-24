import {
  userLogin,
  getWorks,
  deleteWork,
  editWork,
  updateWork,
  createExh,
  getExhibitions,
  deleteExh,
  editExh,
  updateExh,
  getNews,
  editNew,
  deleteOneNew,
  updateNew,
  getPublications,
  deletePub,
  editPub,
  updatePub,
  editText,
  updateText
 } from "@/api"
export default {
  async login({commit},data){
      // 这里调用API和后台通信
      let { data:res } = await userLogin(data)
      commit("USER_LOGIN",res.token)
      return res
  },
  signOut({commit}){
    commit("USER_SINGNOUT")
    return true
  },
  async getWorks({commit}){
    let {data} = await getWorks()
    let filterworks = data.data.map(item=>{
       item.imgObj = {
        src:item.coverUrl,
        error: "http://abc.dailu.site/15e0e346278.jpg",
        loading: "http://abc.dailu.site/15e105b23e5.jpg"
      }
      item.visible = false
      return item
    })
    commit("GET_WORKS",filterworks)
  },
  async deleteWork({commit},data){
    await deleteWork(data.id)
    commit("DELETE_WORK",data.index)
  },
  async deleteExh({commit},data){
    await deleteExh(data.id)
    commit("DELETE_EXH",data.index)
  },
  async deleteNew({commit},data){
    await deleteOneNew(data.id)
    commit("DELETE_NEW",data.index)
  },
  async editWork({commit},data){
    let work=  await editWork(data)
    commit("UPDATE_FIELD",work.data.data)
  },
  async editExh({commit},data){
    let exh = await editExh(data)
    commit("GET_EXH",exh.data.data)
  },
  async editNew({commit},data){
    let oneNew = await editNew(data)
    commit("GET_NEW",oneNew.data.data)
  },
  async editPublication({commit},data){
    let oneNew = await editPub(data)
    commit("GET_PUB",oneNew.data.data)
  },
  async editOneText({commit},data){
    let oneNew = await editText(data)
    commit("GET_TEXT",oneNew.data.data)
  },
  async updateWork({commit},data){
    await updateWork(data)
  },
  async updateExhibition({commit},data){
    await updateExh(data)
  },
  async updateOneNew({commit},data){
    await updateNew(data)
  },
  async updateOneText({commit},data){
    await updateText(data)
  },
  async getExhs({commit}){
    let {data} = await getExhibitions()
    let filterexhs = data.data.map(item=>{
       item.imgObj = {
        src:item.coverUrl,
        error: "http://abc.dailu.site/15e0e346278.jpg",
        loading: "http://abc.dailu.site/15e105b23e5.jpg"
      }
      item.visible = false
      return item
    })
    commit("GET_EXHS",filterexhs)
  },
  async getAllNews({commit}){
    let {data} = await getNews()
    let filternews = data.data.map(item=>{
       item.imgObj = {
        src:item.coverUrl,
        error: "http://abc.dailu.site/15e0e346278.jpg",
        loading: "http://abc.dailu.site/15e105b23e5.jpg"
      }
      item.visible = false
      return item
    })
    commit("GET_NEWS",filternews)
  },
  async getAllPubs({commit}){
    let {data} = await getPublications()
    let filternews = data.data.map(item=>{
       item.imgObj = {
        src:item.coverUrl,
        error: "http://abc.dailu.site/15e0e346278.jpg",
        loading: "http://abc.dailu.site/15e105b23e5.jpg"
      }
      item.visible = false
      return item
    })
    commit("GET_PUBS",filternews)
  },
  async deleteOnePub({commit},data){
    await deletePub(data.id)
    commit("DELETE_PUB",data.index)
  },
  async updatePublication({commit},data){
    await updatePub(data)
  }
}
