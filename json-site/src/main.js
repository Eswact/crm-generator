import { createApp } from 'vue';
import './styles/base.css';
import './styles/index.css';
import './styles/fonts.css';
import "vue3-toastify/dist/index.css";

import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'

import Vue3Toastify, { toast } from "vue3-toastify";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: "bottom-right",
    theme: localStorage.theme,
});
app.mount('#app');