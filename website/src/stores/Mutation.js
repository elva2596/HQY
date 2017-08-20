import {USER_LOGIN,USER_SINGNOUT,THUMB_COLLAPSE} from "./Mutations-Type"
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
  }
}
