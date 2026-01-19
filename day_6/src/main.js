import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/global.css'
import 'startup-ui/dist/index.css'
import './font-awesome.js';
import router from './router/index';

const app = createApp(App);

app.use(router);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount("#app");
