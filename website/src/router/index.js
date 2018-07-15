/**
 * 把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
 */
import Vue from 'vue'
import Router from 'vue-router'
const Register = () => import("@/admin/views/Register")
const Login = () => import("@/admin/views/Login")
// import Login from "@/admin/views/Login"
const Home = () => import("@/admin/views/Home")
// import Home from "@/admin/views/Home"

import store from '@/stores'
const Works = () => import("@/admin/views/Works")
// import Works from "@/admin/views/Works"
const Biography = () => import("@/admin/components/Biography")
// import Biography from "@/admin/components/Biography"
const News = () => import("@/admin/views/News")
// import News from "@/admin/views/News"
const Publications = () => import("@/admin/views/Publications")
// import Publications from "@/admin/views/Publications"
const Texts = () => import("@/admin/views/Texts")
// import Texts from "@/admin/views/Texts"
const Exhibitions = () => import("@/admin/views/Exhibitions")
// import Exhibitions from "@/admin/views/Exhibitions"
const CreateExhibition = () => import("@/admin/views/CreateExhibition")
// import CreateExhibition from "@/admin/views/CreateExhibition"
const CreateNew = () => import("@/admin/views/CreateNew")
// import CreateNew from "@/admin/views/CreateNew"
const createPublication = () => import("@/admin/views/CreatePub")
// import createPublication from "@/admin/views/CreatePub"
const CreateText = () => import("@/admin/views/CreateText")
// import CreateText from "@/admin/views/CreateText"
const CreateWork = () => import("@/admin/views/CreateWork")
// import CreateWork from "@/admin/views/CreateWork"
const Explain = () => import("@/admin/components/Explain")
// import Explain from "@/admin/components/Explain"
const Set = () => import("@/admin/components/Set")
// import Set from "@/admin/components/Set"
const Contact = () => import("@/admin/views/Contact")
// import Contact from "@/admin/views/Contact"
const f_Contact = () => import("@/front/views/Contact")
// import f_Contact from "@/front/views/Contact"
const About  = () => import ("@/front/views/About")
const Publication = () => import ("@/front/views/Publication")
const f_Home = () => import ("@/front/views/Home")
const f_Texts = () => import ("@/front/views/Texts")
const f_Text = () => import("@/front/views/Text")
const Front = () => import ("@/front/views/index.vue")
const f_Works = () => import("@/front/views/Works")
const f_News = () => import("@/front/views/news")
const f_Exhs = () => import("@/front/views/Exhibition")
Vue.use(Router)
const router = new Router({
 mode: 'history',
  routes: [
    {
      path: '/',
      component: Front,
      hidden:true,
      children:[
        {path:'',component:f_Home,hidden:true},
        {path:"contact",component:f_Contact,hidden:true},
        {path:"about",component:About,hidden:true},
        {path:"publication",component:Publication,hidden:true},
        {path:"works",component:f_Works,hidden:true},
        { path: "text",name:"text",component:f_Texts,hidden:true },
        { path: "text/:id",name:"page",component:f_Text,hidden:true },
        { path:"news",name:"news",component:f_News,hidden:true },
        { path:"exhibition",name:"exhibitions",component:f_Exhs,hidden:true }
      ]
    },
    { path: "/register", name:"Register", component:Register, hidden:true },
    { path: "/login", name:"login", component:Login, hidden:true },
    {
      path: "/admin",
      component: Home,
      name:"数据管理",
      icon:"folder",
      children:[
        { path: '', name: "后台首页", component: Works, icon:'file-image-o', meta: { requiresAuth: true } },
        { path: 'works', name: "作品列表", component: Works, icon:'file-image-o', meta: { requiresAuth: true } },
        { path: 'exhibitions', name: "展览列表", component: Exhibitions, icon:'list', meta: { requiresAuth: true } },
        { path: 'publications', name: "出版物列表", component: Publications, icon:'book', meta: { requiresAuth: true } },
        { path: 'news', name: "新闻列表", component: News, icon:'newspaper-o', meta: { requiresAuth: true } },
        { path: 'texts', name: "文本列表", component: Texts, icon:'file-text-o', meta: { requiresAuth: true } }
      ]
    },
    {
      path:"/admin",
      component:Home,
      name:"添加数据",
      icon:'plus-square-o',
      children:[
        { path:"work", name:"添加作品", component:CreateWork, icon:'file-image-o', meta: { requiresAuth: true } },
        { path:"exhibition", name:"添加展览", component:CreateExhibition, icon:'list', meta: { requiresAuth: true } },
        { path:"publiation", name:"添加出版物", component:createPublication, icon:'book', meta: { requiresAuth: true } },
        { path:"new", name:"添加新闻", component:CreateNew, icon:'newspaper-o', meta: { requiresAuth: true } },
        { path:"text", name:"添加文本", component:CreateText, icon:'file-text-o', meta: { requiresAuth: true } }
      ]
    },
    {
      path:"/admin",
      component:Home,
      name:"编辑",
      icon:'edit',
      children:[
        { path:"biography", name:"简历", component:Biography, icon:'id-card', meta: { requiresAuth: true } },
        { path:"contact", name:"联系", component:Contact,  icon:'address-card', meta: { requiresAuth: true } }
      ]
    },
    {
      path:"/admin",
      component:Home,
      leaf:true,//只有一个子节点
      icon:'cog',
      children:[
        { path:"set", name:"设置", component:Set,  meta: { requiresAuth: true } }
      ]
    },
    {
      path:"/admin",
      component:Home,
      icon:'info-circle',
      leaf:true,//只有一个子节点
      children:[
        { path:"explain", name:"说明", component:Explain,   meta: { requiresAuth: true } }
      ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
  let isLoggin = Boolean(store.state.token)
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(!isLoggin){
      next({
        path:"/login",
        query:{redirect:to.fullPath}
      })
    }else{
      next()
    }
  }else{
    if(isLoggin&&(to.path==="/login"||to.path==="/register")){
      next({
        path:"/admin"
      })
    }else{
      next()
    }
  }
})
/*
  登录权限控制说明：
    * requiredAuth
        true : 判断是否登录，如果没有登录则next({path:"/login"}),否则next()
        false : 判断是否登录， 如果已经登录，则访问/login or /register的时候 next(false) 终端导航，停留在当前页面
                              否则next()
 */
export default router
