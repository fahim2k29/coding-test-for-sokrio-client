// Import Vue and other dependencies
// @ts-ignore
import { createApp } from 'vue';
import './style.css';
// @ts-ignore
import App from './App.vue';
// @ts-ignore
import router from './router';
import axios from 'axios';
import Notifications from '@kyvg/vue3-notification';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

// Configure Vue plugins
const app = createApp(App)
    .use(router)
    .use(Notifications)


// Mount the app
app.mount('#app');
