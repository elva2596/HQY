import {
  USER_LOGIN,
  USER_SINGNOUT,
  THUMB_COLLAPSE,
  ADD_FIELD,
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
  DELETE_TEXT,
  UPDATE_TEXT,
  HIDDEN,
  ISLOCAL
} from "./Mutations-Type"
export default {
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
  [REMOVE_FIELD](state){
    state.workInfo.works.pop()
  },
  [RESET_FIELD](state,works){
    state.workInfo.works = works
  },
  [RESET_ALLFIELDS](state,workInfo){
    state.workInfo = workInfo
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
  [RESET_TEXT](state,data){
    state.textInfo = data
  },
  [GET_TEXT](state,data){
    state.textInfo = data
  },
  [UPDATE_TEXT](state,data){
    state.textInfo = data
  },
  [HIDDEN](state,data){
    state.hidden = data
  },
  [ISLOCAL](state){
    console.log('111')
    state.isEn = !state.isEn
  }
}
