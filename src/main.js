/*
 * @Author: wupeiwen <javapeiwen2010@gmail.com>
 * @Date: 2021-06-04 17:24:56
 * @LastEditors: wupeiwen <javapeiwen2010@gmail.com>
 * @LastEditTime: 2021-07-30 14:10:38
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import installElementPlus from '@/plugins/element/element.js'
import autoRegisterComponents from '@/plugins/autoRegisterComponents/register.js'

const app = createApp(App)
installElementPlus(app)
autoRegisterComponents(app)
app.use(store).use(router).mount('#app')
