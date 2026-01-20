import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/global.css'
import 'startup-ui/dist/index.css'
import './font-awesome.js';

const app = createApp(App);

app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount("#app");

