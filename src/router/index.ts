import { provide } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouterScrollBehavior } from "vue-router";

// ---------------------------------------
export const routes = [];

const scrollBehavior: RouterScrollBehavior = async (
  to,
  from,
  savedPosition
) => {
  if (savedPosition) {
    // 如果有 savedPosition 可用，則返回 savedPosition 以允許瀏覽器捲動到該位置。
    return savedPosition;
  } else {
    // 捲動到頁面頂部
    return { left: 0, top: 0 };
  }
  // if (savedPosition) return savedPosition;

  // return { x: 0, y: 0 };
};

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || "/"),
  scrollBehavior: scrollBehavior,
  routes: routes,
});

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
  return next();
});

export default router;

provide("router", router);
provide("route", router.currentRoute);
