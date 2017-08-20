import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from "@/admin/views/Register"
import Login from "@/admin/views/Login"
import Dashboard from "@/admin/views/Dashboard"
import Article from '@/admin/views/Article'
import store from '@/stores'
import Works from "@/admin/components/Works"
import Biography from "@/admin/components/Biography"
import Contact from "@/admin/components/Contact"
import News from "@/admin/components/News"
import Publications from "@/admin/components/Publications"
import Texts from "@/admin/components/Texts"
import Exhibitions from "@/admin/components/Exhibitions"
import CreateExhibition from "@/admin/components/CreateExhibition"
import CreateNew from "@/admin/components/CreateNew"
import createPublication from "@/admin/components/createPublication"
import CreateText from "@/admin/components/CreateText"
import CreateWork from "@/admin/components/CreateWork"
import Explain from "@/admin/components/Explain"
import Set from "@/admin/components/Set"
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', name: 'Hello', component: Hello, hidden:true},
    { path: "/register", name:"Register", component:Register, hidden:true },
    { path: "/login", name:"login", component:Login, hidden:true },
    {
      path: "/admin",
      component: Dashboard,
      name:"数据管理",
      icon:"folder",
      children:[
        { path: 'works', name: "作品列表", component: Works, icon:'file-image-o', meta: { requiresAuth: true } },
        { path: 'exhibitions', name: "展览列表", component: Exhibitions, icon:'list', meta: { requiresAuth: true } },
        { path: 'publications', name: "出版物列表", component: Publications, icon:'book', meta: { requiresAuth: true } },
        { path: 'news', name: "新闻列表", component: News, icon:'newspaper-o', meta: { requiresAuth: true } },
        { path: 'texts', name: "文本列表", component: Texts, icon:'file-text-o', meta: { requiresAuth: true } }
      ]
    },
    {
      path:"/admin",
      component:Dashboard,
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
      component:Dashboard,
      name:"编辑",
      icon:'edit',
      children:[
        { path:"biography", name:"简历", component:Biography, icon:'id-card', meta: { requiresAuth: true } },
        { path:"contact", name:"联系", component:Contact,  icon:'address-card', meta: { requiresAuth: true } }
      ]
    },
    {
      path:"/admin",
      component:Dashboard,
      leaf:true,//只有一个子节点
      icon:'cog',
      children:[
        { path:"set", name:"设置", component:Set,  meta: { requiresAuth: true } }
      ]
    },
    {
      path:"/admin",
      component:Dashboard,
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
