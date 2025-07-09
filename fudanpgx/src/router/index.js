import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicationView from "@/views/PublicationView";
import NewsView from "@/views/NewsView";
import MembersView from "@/views/MembersView";
import ProjectView from "@/views/ProjectView";
import CollaborationView from "@/views/CollaborationView";
import MemberPageView from "@/views/subviews/MemberPageView";
import NewsPageView from "@/views/subviews/NewsPageView";

const routes = [
  {
    path: '/',
    name: 'home1',
    component: HomeView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/publication',
    name: 'publication',
    component: PublicationView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/news/detail',
    name: 'newsDetail',
    component: NewsPageView
  },
  {
    path: '/member',
    name: 'member',
    component: MembersView,
    children:[
      {path:'author', name:'author', component:MemberPageView}
    ]
  },
  {
    path: '/project',
    name: 'project',
    component: ProjectView
  },
  {
    path: '/collaboration',
    name: 'collaboration',
    component: CollaborationView
  },
  {
    path: '/author',
    name: 'author',
    component: MemberPageView
  },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
