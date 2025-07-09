import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@mdi/font/css/materialdesignicons.css'; // Ensure MDI CSS is imported

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import VNetworkGraph from "v-network-graph";
import "v-network-graph/lib/style.css";

import VueLazyload from 'vue-lazyload';

import '@vueup/vue-quill/dist/vue-quill.snow.css';



const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);


app.use(router);
app.use(VNetworkGraph);
app.use(VueLazyload);
app.use(vuetify);
app.use(ElementPlus); // Use Element Plus
app.use(store);



app.mount('#app');
