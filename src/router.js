import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    { path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [{
        path: '/',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/mine',
        name: 'mine',
        // 路由的 ->组件的懒加载
        component: () =>
            import('@/views/mine')
      }]
    },
    { name: 'search',
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      path: '/search-result',
      name: 'search-result',
      // 路由的 ->组件的懒加载
      component: () =>
          import('@/views/search/search-result.vue')
    },
    { name: 'article',
      path: '/article:articleId',
      component: () => import('@/views/article')
    },
    {
      name: 'user-profile',
      path: '/user-profile',
      // 路由的 ->组件的懒加载
      component: () =>
          import('@/views/user-profile')
    }
  ]
})
