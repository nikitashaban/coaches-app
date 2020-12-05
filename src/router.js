import {defineAsyncComponent} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import NotFound from './pages/NotFound'
import CoachesList from './pages/coaches/CoachesList'

import store from './store'

const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail'))
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration'))
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach'))
const RequestReceived = defineAsyncComponent(() => import('./pages/requests/RequestReceived'))
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth'))


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    { path: '/coaches/:id', component: CoachDetail, props: true, children: [{ path: 'contact', component: ContactCoach }] },
    { path: '/register', component: CoachRegistration, meta: {requiresAuth: true} },
    { path: '/requests', component: RequestReceived, meta: {requiresAuth: true} },
    { path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

router.beforeEach((to, _, next) => {
  if(to.meta.requiresAuth && !store.getters.token) {
    next('/auth')
  } else if(to.meta.requiresUnauth && store.getters.token) {
    next('/coaches')
  } else {
    next()
  }
})

export default router