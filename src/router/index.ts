import { createRouter, createWebHashHistory } from 'vue-router';
import LayoutView from '@/views/LayoutView.vue';
import MainView from '@/views/MainView.vue';
import ShopView from '@/views/ShopView.vue';
import ProductView from '@/views/ProductView.vue';
import BucketView from '@/views/BucketView.vue';
import UserView from '@/views/UserView.vue';
import FavoriteView from '@/views/FavoriteView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'main',
          component: MainView,
        },
        {
          path: 'shop',
          name: 'shop',
          component: ShopView,
        },
        {
          path: 'product/:id',
          name: 'product',
          component: ProductView,
        },
        {
          path: 'bucket',
          name: 'bucket',
          component: BucketView,
        },
        {
          path: 'user',
          name: 'user',
          component: UserView,
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: FavoriteView,
        },
      ],
    },
  ],
});

export default router;
