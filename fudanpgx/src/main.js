import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import './assets/global.css';
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'



initAMapApiLoader({
    key: '274ac556f44514b539226e30cca05733',
    securityJsCode: '38d05e2b6206566cbcb282d128ed45aa', // 新版key需要配合安全密钥使用
    //Loca:{
    //  version: '2.0.0'
    //} // 如果需要使用loca组件库，需要加载Loca
})

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueAMap)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');
