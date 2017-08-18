// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
import {Auth_axios,NoAuth_axios} from "axios"
import store from './stores'
import {
 Form,
 FormItem,
 Input,
 Button,
 Message,
 Menu,
 Submenu,
 MenuItem,
 Row,
 Col,
 Dropdown,
DropdownMenu,
DropdownItem,
MessageBox,
} from 'element-ui'//element-ui按需引入
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$http = Auth_axios
Vue.prototype.$ajax = NoAuth_axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
