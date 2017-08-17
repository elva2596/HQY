import {USER_LOGIN} from "./Mutations-Type"
export default {
  [USER_LOGIN](state,token){
    localStorage.setItem("jwt",token)
    state.token = token
  }
}
