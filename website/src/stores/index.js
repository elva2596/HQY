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
    hidden:true,
    isEn:false,
    contactContent:"",
    token:isLogin(),
    picLists:[],
    exhLists:[],
    newsLists:[],
    pubLisits:[],
    isCollapse:false,
    actionUrl:"http://127.0.0.1:8089/api/admin/imgs",
    workInfo:{
      title_cn:"",
      title_en:"",
      create_time:"",
      coverUrl:"",
      works:[
        {
          name_cn:"",
          name_en:"",
          desc_cn:"",
          desc_en:"",
          width:"",
          length:"",
          height:"",
          imageUrl:'',
          count:"一"
        },
      ]
    },
    exhInfo:{
      title_cn:"",
      title_en:"",
      place_cn:"",
      place_en:"",
      create_time:"",
      coverUrl:"",
      desc_cn:"",
      desc_en:"",
    },
    newsInfo:{
      title_cn:"",
      title_en:"",
      place_cn:"",
      place_en:"",
      coverUrl:"",
      content_cn:"",
      content_en:""
    },
    pubInfo:{
      content_cn:"",
      content_en:"",
      coverUrl:"",
      tittle_en:"",
      tittle_cn:""
    },
    textInfo:{
      content_cn:"",
      content_en:"",
      tittle_cn:"",
      tittle_en:"",
      time_cn:"",
      // time_en:""
    },
    contactInfo:{
      content_cn:"",
      content_en:"",
    },
    rules:[
      {
        name_cn:[
          {required:true,message:"请填写中文作品名称",trigger:"blur"}
        ],
        name_en:[
          {required:true,message:"请填写英文作品名称",trigger:"blur"}
        ],
        create_time:[
          {type: 'date', required: true, message: '请选择日期', trigger: 'blur'}
        ]
      }
    ],
    headRule:{
      title_cn:[
        {required:true,message:"请填写中文标题",trigger:"blur"}
      ],
      title_en:[
        {required:true,message:"请填写英文标题",trigger:"blur"}
      ],
      create_time:[
        {type: 'date', required: true, message: '请选择创作日期', trigger: 'blur'}
      ]
    }
  },
  mutations,
  actions
})
export default store
