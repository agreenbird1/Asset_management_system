import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.less'
import naive from 'naive-ui'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router).use(naive).use(store)
app.mount('#app')
