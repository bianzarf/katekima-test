import Product from '@/views/Product.vue'
import ProductForm from '@/views/ProductForm.vue'
import BerryFullData from '@/views/BerryFullData.vue'
import BerryServerSide from '@/views/BerryServerSide.vue'
import BerryDetail from '@/views/BerryDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/berry',
      children : [
        {
          path: 'full-data',
          name: 'Data Table Berry',
          component: BerryFullData,
        },
        {
          path: 'server-side',
          name: 'Data Table Berry (Server Side)',
          component: BerryServerSide,
        },
        {
          path: 'detail/:id',
          name: 'Detail Berry',
          component: BerryDetail,
        }
      ]
    },
    {
      path: '/product',
      children : [
        {
          path: '',
          name: 'Data Table Product',
          component: Product,
        },
        {
          path: 'add',
          name: 'Add Table Product',
          component: ProductForm,
        },
        {
          path: 'edit:/:id',
          name: 'Edit Table Product',
          component: ProductForm,
        },
      ]
    },
  ],
})

export default router
