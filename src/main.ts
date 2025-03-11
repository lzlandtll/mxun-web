import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let app= createApp(App)


import router  from './router/router'
app.use(router)


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
app.use(ElementPlus)


import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
// 使用持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)


app.mount('#app')
