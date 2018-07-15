import axios from "axios";
const Auth_axios = axios.create();
const NoAuth_axios = axios.create();
const url = "http://127.0.0.1:8089"
const reg = (data)=>{ return NoAuth_axios.post("/api/register",data) }
const userLogin = (data)=>{ return NoAuth_axios.post("/api/login",data) }
const getUser = (data)=>{ return NoAuth_axios.get("/api/getUser",{ params:data }) }
const createWork = (data)=>{ return Auth_axios.post("/api/work",data) }
const getWorks = ()=>{ return Auth_axios.get("/api/work") }
const deleteWork = (data)=>{ return Auth_axios.delete("/api/work/",{ params:{id:data} })}
const editWork = (id)=>{ return Auth_axios.get(`/api/work/${id}`)}
const getOneWork = (id)=>{ return Auth_axios.get(`/api/work/${id}`)}
const editExh = (id)=>{ return Auth_axios.get(`/api/exhibition/${id}`)}
const editPub = (id)=>{ return Auth_axios.get(`/api/publication/${id}`)}
const editText = (id)=>{ return Auth_axios.get(`/api/text/${id}`)}
const updateWork = (data)=>{ return Auth_axios.put("/api/work",data) }
const createExh = (data)=>{ return  Auth_axios.post("/api/exhibition",data) }
const getExhibitions = ()=>{ return Auth_axios.get("/api/exhibitions") }
const deleteExh = (data)=>{ return Auth_axios.delete("/api/exhibition",{ params:{id:data}}) }
const updateExh = (data)=>{ return Auth_axios.put("/api/exhibition",data)}
const createNew = (data)=>{ return Auth_axios.post("/api/new",data)}
const getNews = ()=>{ return Auth_axios.get("/api/news")}
const editNew = (id)=>{return Auth_axios.get(`/api/new/${id}`)}
const deleteOneNew = (data)=>{ return Auth_axios.delete("/api/new",{ params:{id:data}}) }
const updateNew = (data)=>{ return Auth_axios.put("/api/new",data) }
const createPub = (data)=>{ return Auth_axios.post("/api/publication",data)}
const getPublications = ()=>{ return Auth_axios.get("/api/publications") }
const deletePub = (data)=>{ return Auth_axios.delete("/api/publication",{ params:{id:data}}) }
const updatePub = (data)=>{ return Auth_axios.put("/api/publication",data) }
const createText = (data)=>{ return Auth_axios.post("/api/text",data) }
const getTexts = ()=>{ return Auth_axios.get("/api/texts") }
const deleteText = (data)=>{ return Auth_axios.delete("/api/text",{ params:{id:data}}) }
const updateText = (data)=>{ return Auth_axios.put("/api/text",data) }
const getText = (id)=>{return NoAuth_axios.get(`/api/text/${id}`) }
const getBio = ()=>{ return Auth_axios.get("/api/biograhpy") }
const createBio = (data)=>{ return Auth_axios.post("/api/biograhpy",data) }
const updateBio = (data)=>{ return Auth_axios.put("/api/biograhpy",data) }
const getContact = ()=>{ return Auth_axios.get("/api/contact") }
const createContact = (data)=>{ return Auth_axios.post("/api/contact",data) }
const updateContact = (data)=>{ return Auth_axios.put("/api/contact",data) }
export {
  Auth_axios,
  NoAuth_axios,
  reg,
  userLogin,
  getUser,
  createWork,
  getWorks,
  deleteWork,
  editWork,
  updateWork,
  createExh,
  getExhibitions,
  deleteExh,
  editExh,
  updateExh,
  createNew,
  getNews,
  editNew,
  deleteOneNew,
  updateNew,
  createPub,
  getPublications,
  deletePub,
  updatePub,
  editPub,
  createText,
  editText,
  getTexts,
  deleteText,
  updateText,
  getBio,
  createBio,
  updateBio,
  getContact,
  createContact,
  updateContact,
  getText,
  getOneWork
}
