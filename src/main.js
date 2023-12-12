import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Toast, { POSITION } from "vue-toastification";
import VuePaginate from 'vue-paginate';
import "vue-toastification/dist/index.css";
import timeago from 'vue-timeago3'
import { router } from "./routes/index";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import VueCookies from 'vue-cookies'
library.add(fas)

const pinia = createPinia()

const toastOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 3000
}

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(VuePaginate).use(timeago).use(VueCookies, { expires: '7d' }).use(pinia).use(router).use(Toast, toastOptions).mount('#app')
