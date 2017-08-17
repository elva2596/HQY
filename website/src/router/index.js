import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from "@/admin/views/Register"
import Login from "@/admin/views/Login"
import Dashboard from "@/admin/views/Dashboard"
import Article from '@/admin/views/Article'
import store from '@/stores'
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', name: 'Hello', component: Hello },
    { path: "/register", name:"Register", component:Register },
    { path: "/login", name:"login", component:Login },
    {
      path: "/admin",
      component: Dashboard,
      children:[
        { path: '', name: "article", component: Article, meta: { requiresAuth: true } }
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
      next(false)
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
