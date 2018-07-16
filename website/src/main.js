// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
import {Auth_axios,NoAuth_axios} from "axios"
import store from './stores'
import "vue-awesome/icons/fa"
import "vue-awesome/icons/align-center"
import "vue-awesome/icons/align-justify"
import "vue-awesome/icons/align-left"
import "vue-awesome/icons/align-right"
import "vue-awesome/icons/reorder"
import "vue-awesome/icons/archive"
import "vue-awesome/icons/folder"
import "vue-awesome/icons/file-image-o"
import "vue-awesome/icons/list"
import "vue-awesome/icons/book"
import "vue-awesome/icons/newspaper-o"
import "vue-awesome/icons/plus-square-o"
import "vue-awesome/icons/edit"
import "vue-awesome/icons/id-card"
import "vue-awesome/icons/address-card"
import "vue-awesome/icons/info-circle"
import "vue-awesome/icons/cog"
import "vue-awesome/icons/file-text-o"
import VueQuillEditor from "vue-quill-editor"
import Vuebar from 'vuebar';

import {
 Form,
 FormItem,
 Input,
 Button,
 Message,
 Menu,
 Submenu,
 MenuItem,
 MenuItemGroup,
 Row,
 Col,
 Dropdown,
 DropdownMenu,
 DropdownItem,
 MessageBox,
 RadioButton,
 Tooltip,
 Breadcrumb,
 BreadcrumbItem,
 DatePicker,
 Radio,
 RadioGroup,
 Upload,
 Dialog,
 InputNumber,
 Table,
 TableColumn,
} from 'element-ui'//element-ui按需引入
import VueLazyload from "vue-lazyload"
Vue.use(VueLazyload)
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
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(MenuItemGroup)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(InputNumber)
Vue.use(VueQuillEditor)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Vuebar);
// Vue.use(VuePreview)
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)
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
