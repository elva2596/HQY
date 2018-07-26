import {
  USER_LOGIN,
  USER_SINGNOUT,
  THUMB_COLLAPSE,
  ADD_FIELD,
  ADD_EXH_FIELD,
  REMOVE_FIELD,
  RESET_FIELD,
  UPDATE_FIELD,
  RESET_ALLFIELDS,
  GET_WORKS,
  DELETE_WORK,
  RESET_EXH,
  GET_EXHS,
  DELETE_EXH,
  GET_EXH,
  UPDATE_EXH,
  RESET_NEWFORM,
  GET_NEWS,
  GET_NEW,
  DELETE_NEW,
  UPDATE_NEW,
  RESET_PUB,
  GET_PUBS,
  DELETE_PUB,
  GET_PUB,
  RESET_TEXT,
  GET_TEXT,
  GET_TEXTS,
  DELETE_TEXT,
  UPDATE_TEXT,
  UPDATE_TEXTS,
  HIDDEN,
  ISLOCAL,
  UPDATE_DETAIL_IMG,
  UPDATE_EXH_DETAIL_IMG,
  UPDATE_DETAILR_COVER,
  UPDATE_EXH_DETAILR_COVER,
  UPDATE_EXH_COVER,
  UPDATE_PUB_COVER,
  UPDATE_NEWS_COVER,
  UPDATE_NEWS,
  CHANGE_LOOP,
  REMOVE_EXH_FIELD,
  RESET_EXH_ALLFIELDS
} from "./Mutations-Type"
export default {
  [CHANGE_LOOP](state,payload){
    state.isloop = !state.isloop
  },
  [USER_LOGIN](state,token){
    localStorage.setItem("jwt",token)
    state.token = token
  },
  [USER_SINGNOUT](state){
    localStorage.removeItem('jwt')
    state.token = null
  },
  [THUMB_COLLAPSE](state){
    state.isCollapse = !state.isCollapse
  },
  [ADD_FIELD](state,{info,rule,count}){
    state.workInfo.works.push(info)
    state.rules.push(rule)
    state.workInfo.works[state.workInfo.works.length-1].count = count
  },
  [ADD_EXH_FIELD](state,{info,count}){
    state.exhInfo.exhs.push(info)
    state.exhInfo.exhs[state.exhInfo.exhs.length-1].count = count
  },
  [REMOVE_FIELD](state){
    state.workInfo.works.pop()
  },
  [REMOVE_EXH_FIELD](state){
    state.exhInfo.exhs.pop()
  },
  [RESET_FIELD](state,works){
    state.workInfo.works = works
  },
  [RESET_ALLFIELDS](state,workInfo){
    state.workInfo = workInfo
  },
  [RESET_EXH_ALLFIELDS](state,exhInfo){
    state.exhInfo = exhInfo
  },
  [UPDATE_FIELD](state,data){
    state.workInfo = data
  },
  [UPDATE_EXH](state,data){
    state.exhInfo = data
  },
  [GET_WORKS](state,data){
    state.picLists = data
  },
  [GET_NEWS](state,data){
    state.newsLists = data
  },
  [UPDATE_NEWS](state,data){
    const {newsInfo,index} = data
    /**
     * [vue中不能通过数组下标方式改变响应式数据]
     * @type {[type]}
     */
    state.newsLists.splice(index,1,newsInfo)
  },
  [GET_NEW](state,data){
    state.newsInfo = data
  },
  [DELETE_WORK](state,data){
    state.picLists.splice(data,1)
  },
  [DELETE_NEW](state,data){
    state.newsLists.splice(data,1)
  },
  [RESET_EXH](state,data){
    state.exhInfo = data
  },
  [GET_EXHS](state,data){
    console.log(data)
    state.exhLists = data
  },
  [DELETE_EXH](state,index){
    state.exhLists.splice(index,1)
  },
  [GET_EXH](state,data){
    console.log(data)
    state.exhInfo = data
  },
  [RESET_NEWFORM](state,data){
    state.newsInfo = data
  },
  [UPDATE_NEW](state,data){
    state.newsInfo = data
  },
  [RESET_PUB](state,data){
    state.pubInfo = data
  },
  [GET_PUBS](state,data){
    state.pubLisits = data
  },
  [DELETE_PUB](state,index){
    state.pubLisits.splice(index,1)
  },
  [GET_PUB](state,data){
    state.pubInfo = data
  },
  [GET_TEXTS](state,data){
    state.textsLists = data
  },
  [RESET_TEXT](state,data){
    state.textInfo = data
  },
  [GET_TEXT](state,data){
    state.textInfo = data
  },
  [DELETE_TEXT](state,payload){
    state.textsLists.splice(payload,1)
  },
  [UPDATE_TEXT](state,data){
    state.textInfo = data
  },
  [UPDATE_TEXTS](state,data){
    const {textInfo,index} = data
    /**
     * [vue中不能通过数组下标方式改变响应式数据]
     * @type {[type]}
     */
    state.textsLists.splice(index,1,textInfo)
  },
  [HIDDEN](state,data){
    state.hidden = data
  },
  [ISLOCAL](state,payload){
    state.isEn = payload
  },
  [UPDATE_DETAIL_IMG](state,payload){
    const {index,url} = payload
    // console.log(payload)
    state.workInfo.works[index].imageUrl = url
  },
  [UPDATE_EXH_DETAIL_IMG](state,payload){
    const {index,url} = payload
    state.exhInfo.exhs[index].imageUrl = url
  },
  [UPDATE_DETAILR_COVER](state,payload){
    const {workInfo} = state
    const {url} = payload
    // console.log(url)
    state.workInfo.coverUrl = url
  },
  [UPDATE_EXH_DETAILR_COVER](state,payload){
    const {exhInfo} = state
    const {url} = payload
    state.exhInfo.coverUrl = url
  },
  [UPDATE_EXH_COVER](state,payload){
    const {url} = payload
    const {exhInfo} = state
    exhInfo.coverUrl = url
  },
  [UPDATE_PUB_COVER](state,payload){
    const {url} = payload
    const {pubInfo} = state
    pubInfo.coverUrl = url
  },
  [UPDATE_NEWS_COVER](state,payload){
    const {url} = payload
    const {newsInfo} = state
    newsInfo.coverUrl =url
  }
}
