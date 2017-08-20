import Vue from "vue";
import Vuex from "vuex"
import mutations from "./Mutation"
import actions from "./Action"
Vue.use(Vuex)
function isLogin(){
  let token = window.localStorage.getItem("jwt");
  if(token){
    const payload =JSON.parse(window.atob(token.split('.')[1]));
    if(payload.exp>Math.floor(Date.now()/1000)){
      return token
    }else{
      return false
    }
  }else{
    return false
  }
}
const store = new Vuex.Store({
  state:{
    token:isLogin(),
    isCollapse:false
  },
  mutations,
  actions
})
export default store
