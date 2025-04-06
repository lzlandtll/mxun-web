// 导入路由创建的相关方法
import {createRouter, createWebHistory} from 'vue-router'
import { WRITE_PATH } from '@/constants'

// 导入vue组件

// 创建路由对象,声明路由规则
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/home/Home.vue'),
            name: 'home',
            redirect: '/search',
            children: [
                {
                    path: "/articleDetail", // 子路由路径是相对于父路由的
                    component: () => import('@/views/Write/ArticleDetail.vue')
                },
                {
                    path: "/search", // 子路由路径是相对于父路由的
                    component: () => import('@/views/Search/Search.vue')
                },
                {
                    path: "/user", // 子路由路径是相对于父路由的
                    component: () => import('@/views/User/User.vue')
                }
            ]
        },
        {
            path: WRITE_PATH,
            component: () => import('@/views/Write/Write.vue'),
            name: 'write'
        },
        {
            path: '/test',
            component: () => import('@/views/Write/Test.vue'),
            name: 'test'
        }
    ]
})
// 对外暴露路由对象
export default router;
