import commonConfig from './commonConfig';
import { defineConfig } from 'umi';

const menuRouters = [
  { path: '/app/', redirect: '/app/tasks' },
  {
    path: '/app/tasks',
    name: 'tasks',
    icon: 'info-circle',
    component: '@/pages/Tasks',
  },
  {
    path: '/app/retailers',
    name: 'retailers',
    icon: 'cloud-server',
    component: '@/pages/Retailers',
  },
  {
    path: '/app/producers',
    name: 'producers',
    icon: 'cluster',
    component: '@/pages/Producers',
  },
  {
    path: '/app/headless',
    name: 'defaultHeadless',
    icon: 'global',
    component: '@/pages/HeadlessProducer',
    electron: true,
  },
  {
    path: '/app/http',
    name: 'defaultHTTP',
    icon: 'thunderbolt',
    component: '@/pages/HTTPProducer',
    electron: true,
  },
  {
    path: '#defaultretailer',
    name: 'defaultRetailer',
    icon: 'cloud-server',
    electron: true,
  },
  {
    path: '/app/taskshistory',
    name: 'taskshistory',
    icon: 'history',
    component: '@/pages/TasksHistory',
  },
  {
    path: '#settings',
    name: 'settings',
    icon: 'setting',
    electron: true,
  },
];

export default defineConfig({...commonConfig, ...{
  analytics:{
    ga: "G-GGBDZ1FHXN"
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      routes: [
        { path: '/', redirect: '/app/tasks' },
        { path: '/home', redirect: '/app/tasks' },
        {
          path: '/app',
          component: '@/layouts/BasicLayout',
          routes: menuRouters,
        },
      ],
    },
    {
      component: '@/pages/404',
    },
  ],
  proxy: {
    '/apis/': {
      target: 'http://localhost:9099',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
  },
}});

// export default {
//   // umi routes: https://umijs.org/docs/routing
//   // 1. relative path is relative to `src/pages`
//   routes: [
//     {
//       path: '/',
//       component: '../layouts/BlankLayout',
//       routes: [
//         { path: '/', redirect: '/app/tasks' },
//         { path: '/home', redirect: '/app/tasks' },
//         {
//           path: '/app',
//           component: '../layouts/BasicLayout',
//           routes: menuRouters,
//         },
//       ],
//     },
//     {
//       component: './404',
//     },
//   ],
//   proxy: {
//     '/apis/': {
//       target: 'http://localhost:9099',
//       changeOrigin: true,
//       // pathRewrite: { '^/server': '' },
//     },
//   },
// };
