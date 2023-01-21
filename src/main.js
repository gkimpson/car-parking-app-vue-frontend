import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import setAuthHeader from './utils/setAuthHeader'

if (localStorage.access_token) {
    setAuthHeader(localStorage.access_token);
} else {
    setAuthHeader(false);
}

createApp(App).use(router).mount('#app')
