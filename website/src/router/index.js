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
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', name: 'Hello', component: Hello, hidden:true},
    { path: "/register", name:"Register", component:Register, hidden:true },
    { path: "/login", name:"login", component:Login, hidden:true },
    {
      path: "/admin",
      component: Dashboard,
      children:[
        { path: '', name: "defalut", component: Works, meta: { requiresAuth: true }, hidden:true},
        { path: 'works', name: "作品", component: Works, meta: { requiresAuth: true } },
        { path: 'exhibitions', name: "展览", component: Exhibitions, meta: { requiresAuth: true } },
        { path: 'publications', name: "出版物", component: Publications, meta: { requiresAuth: true } },
        { path: 'news', name: "新闻", component: News, meta: { requiresAuth: true } },
        { path: 'biography', name: "简历", component: Biography, meta: { requiresAuth: true } },
        { path: 'texts', name: "文本", component: Texts, meta: { requiresAuth: true } },
        { path: 'Ccontact', name: "联系", component: Contact, meta: { requiresAuth: true } }
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
