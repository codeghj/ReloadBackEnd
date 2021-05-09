import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/css/font/iconfont.css'
import '@/assets/css/normalize.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import {Message} from 'element-ui'
import {MessageBox} from 'element-ui'
Vue.component(Message.name,Message)
Vue.component(MessageBox.name,MessageBox)
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
