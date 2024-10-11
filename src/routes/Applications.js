export default [
  {
    name: 'ecommerce',
    path: '',
    component: () => import(/* webpackChunkName: "ecommerce" */ '../view/userView/pages/ecommerce/Index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'ecommerce-product',
        component: () =>
          import(/* webpackChunkName: "product" */ '../view/userView/pages/ecommerce/product/Coupons.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            name: 'product',
            path: '',
            meta: { requiresAuth: true },
            component: () =>
              import(/* webpackChunkName: "product" */ '../view/userView/pages/ecommerce/product/Coupons.vue'),
          },
          {
            name: 'pro-grid',
            path: '/user/Coupons',
            meta: { requiresAuth: true },
            components: {
              default: () =>
                import(/* webpackChunkName: "product" */ '../view/userView/pages/ecommerce/product/Coupons.vue'),
              grid: () =>
                import(/* webpackChunkName: "grid" */ '../view/userView/pages/ecommerce/product/overview/Grid.vue'),
            },
          },
          {
            name: 'pro-list',
            path: '/user/couponList',
            meta: { requiresAuth: true },
            components: {
              default: () =>
                import(/* webpackChunkName: "product" */ '../view/userView/pages/ecommerce/product/Coupons.vue'),
              grid: () =>
                import(/* webpackChunkName: "grid" */ '../view/userView/pages/ecommerce/product/overview/List.vue'),
            },
          },
        ],
      },
      {
        name: 'detail',
        path: 'ecommerce/productDetails/:id',
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "detail" */ '../view/userView/pages/ecommerce/product/ProductDetails.vue'),
      },
      {
        name: 'add-product',
        path: 'ecommerce/add-product',
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "addProduct" */ '../view/userView/pages/ecommerce/product/AddProduct.vue'),
      },
      {
        name: 'edit-product',
        path: 'ecommerce/edit-product',
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "editProduct" */ '../view/userView/pages/ecommerce/product/EditProduct.vue'),
      },
      {
        name: 'orders',
        path: 'ecommerce/orders',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "Orders" */ '../view/userView/pages/ecommerce/Orders.vue'),
      },
      {
        name: 'sellers',
        path: 'ecommerce/sellers',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "sellers" */ '../view/userView/pages/ecommerce/Sellers.vue'),
      },
      {
        name: 'invoice',
        path: 'ecommerce/invoice',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "invoice" */ '../view/userView/pages/ecommerce/Invoice.vue'),
      },
      {
        name: 'cart',
        path: 'ecommerce/cart',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "cart" */ '../view/userView/pages/ecommerce/Cart.vue'),
        children: [
          {
            name: 'exact',
            path: '',
            meta: { requiresAuth: true },
            components: {
              default: () => import(/* webpackChunkName: "cart" */ '../view/userView/pages/ecommerce/Cart.vue'),
              child: () =>
                import(/* webpackChunkName: "cartTable" */ '../view/userView/pages/ecommerce/overview/CartTable.vue'),
            },
          },
          {
            name: 'checkout',
            path: 'checkout',
            meta: { requiresAuth: true },
            components: {
              default: () => import(/* webpackChunkName: "cart" */ '../view/userView/pages/ecommerce/Cart.vue'),
              child: () =>
                import(/* webpackChunkName: "checkout" */ '../view/userView/pages/ecommerce/overview/CheckOut.vue'),
            },
          },
        ],
      },
    ],
  },
  {
    name: 'to-do',
    path: '/user/to-do',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "to-do" */ '../view/userView/pages/todo/Todo.vue'),
  },
];
