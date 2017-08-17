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
export default router
