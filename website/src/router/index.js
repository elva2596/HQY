import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from "@/admin/views/Register"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:"/admin/register",
      component:Register
    }
  ]
})
