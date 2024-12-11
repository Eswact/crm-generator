import { createRouter, createWebHistory } from 'vue-router';
import pagesData from '../../siteData.json';
import commonFunctions from '../scripts/common';

const routes = pagesData.pages.map((page) => {
  return {
    path: page.path,
    name: page.name,
    component: () => import(/* @vite-ignore */ `../views/${page.file}`),
    meta: {
      title: page.seo.title || pagesData.title || pagesData.siteName,
      description: page.seo.description || '',
      keywords: page.seo.keywords || [],
    }
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { return savedPosition; } 
    else {  return { top: 0 }; }
  },
});

router.afterEach((to) => {
  const seo = to.meta;
  if (seo) {
    commonFunctions.updateSEO({
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    });
  }
});

export default router;