import axios from "axios";
const Auth_axios = axios.create();
const NoAuth_axios = axios.create();
const reg = (data)=>{ return NoAuth_axios.post("/api/register",data) }
const userLogin = (data)=>{ return NoAuth_axios.post("/api/login",data) }
const getUser = (data)=>{ return NoAuth_axios.get("/api/getUser",{ params:data }) }
export {
  Auth_axios,
  NoAuth_axios,
  reg,
  userLogin,
  getUser
}
