import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from "@/views/MainPage";
// import HelloWorld from "@/components/HelloWorld";
import cHome from "@/views/home/cHome";
import cAbout from "@/views/about/cAbout";
import cFAQ from "@/views/faqs/cFAQ";
import cData from "@/views/data/cData";
// import cLogin from "@/views/cLogin";
import CGZMain from "@/views/studies/CGZMain";
import CGZSubtype from "@/views/studies/CGZSubtype";
import CGZModels from "@/views/studies/CGZModels";
import CGZTarget from "@/views/studies/CGZTarget";

import mStudyDesign from "@/components/cgz_main/mStudyDesign";
import mCLNResult from "@/components/cgz_main/mCLNResult";
import mMTBResult from "@/components/cgz_main/mMTBResult";
import mPRTResult from "@/components/cgz_main/mPRTResult";
import mMIRResult from "@/components/cgz_main/mMIRResult";
import mOmicsNetwork from "@/components/cgz_main/mOmicsNetwork";

import sCLNResult from "@/components/cgz_subtype/sCLNResult";
import sMTBResult from "@/components/cgz_subtype/sMTBResult";
import sMIRResult from "@/components/cgz_subtype/sMIRResult";
import sPRTResult from "@/components/cgz_subtype/sPRTResult";
import sStudyDesign from "@/components/cgz_subtype/sStudyDesign";

import cStudyDesign from "@/components/cgz_models/cStudyDesign";
import tStudyDesign from "@/components/cgz_target/tSdudyDesign";

import store from '../store'

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
        redirect: '/home',  // 添加重定向规则
        children: [
            { path: 'home', name: 'home', component: cHome },
            { path: 'about', name: 'about', component: cAbout },
            { path: 'faqs', name: 'faqs', component: cFAQ },
            { path: 'data', name: 'dagta', component: cData },
            {
                path: 'project/main', name: 'CGZ-Main', component: CGZMain,
                children: [
                    { path: 'cln', name: 'Main Clinical', component: mCLNResult },
                    { path: 'mtb', name: 'Main Metabolomics', component: mMTBResult },
                    { path: 'mir', name: 'Main Micro RNA', component: mMIRResult },
                    { path: 'prt', name: 'Main Proteomics', component: mPRTResult },
                    { path: 'study', name: 'Main Study Design', component: mStudyDesign },
                    { path: 'network', name: 'Main Omics Network', component: mOmicsNetwork },
                ]
            },
            {
                path: 'project/subtype', name: 'CGZ-Subtype', component: CGZSubtype,
                children: [
                    { path: 'cln', name: 'Subtype Clinical', component: sCLNResult },
                    { path: 'mtb', name: 'Subtype Metabolomics', component: sMTBResult },
                    { path: 'mir', name: 'Subtype Micro RNA', component: sMIRResult },
                    { path: 'prt', name: 'Subtype Proteomics', component: sPRTResult },
                    { path: 'study', name: 'Subtype Study Design', component: sStudyDesign },
                ]
            },
            {
                path: 'project/models', name: 'CGZ-Models', component: CGZModels,
                children: [
                    { path: 'study', name: 'models Study Design', component: cStudyDesign },
                ]
            },
            {
                path: 'project/target', name: 'CGZ-Target', component: CGZTarget,
                children: [
                    { path: 'study', name: 'target Study Design', component: tStudyDesign },
                ]
            },
        ]
    },
    // 通配符路由，捕获所有未定义的路径
    {
        path: '/:catchAll(.*)',
        name: 'not found',
        redirect: '/' } // 添加通配符路由
    // {
    //     path: '/',
    //     name: 'Login',
    //     component: cLogin
    // }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name!='Login') {
        console.log(store.state.globalStore.isAuthenticated)
        if (!store.state.globalStore.isAuthenticated) {
            // next({ name: 'Login' })
            next()
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
