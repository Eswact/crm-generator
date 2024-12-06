import { createRouter, createWebHistory } from 'vue-router';
import pagesData from '../../siteData.json';

const routes = pagesData.pages.map((page) => {
  return {
    path: page.path,
    name: page.name,
    component: () => import(/* @vite-ignore */ `../views/${page.file}`),
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;