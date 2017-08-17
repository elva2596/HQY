import { userLogin } from "@/api"
export default {
  async login({commit},data){
      // 这里调用API和后台通信
      let { data:res } = await userLogin(data)
      commit("USER_LOGIN",res.token)
      return res
  }
}
