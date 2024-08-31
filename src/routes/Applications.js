export default [
  {
    name: 'ecommerce',
    path: '',
    component: () => import(/* webpackChunkName: "ecommerce" */ '../view/apps/ecommerce/Index.vue'),
    children: [
      {
        path: '',
        name: 'ecommerce-product',
        component: () => import(/* webpackChunkName: "product" */ '../view/apps/ecommerce/product/Coupons.vue'),
        children: [
          {
            name: 'product',
            path: '',
            component: () => import(/* webpackChunkName: "product" */ '../view/apps/ecommerce/product/Coupons.vue'),
          },
          {
            name: 'pro-grid',
            path: '/Coupons',
            components: {
              default: () => import(/* webpackChunkName: "product" */ '../view/apps/ecommerce/product/Coupons.vue'),
              grid: () => import(/* webpackChunkName: "grid" */ '../view/apps/ecommerce/product/overview/Grid.vue'),
            },
          },
          {
            name: 'pro-list',
            path: 'product/list',
            components: {
              default: () => import(/* webpackChunkName: "product" */ '../view/apps/ecommerce/product/Coupons.vue'),
              grid: () => import(/* webpackChunkName: "grid" */ '../view/apps/ecommerce/product/overview/List.vue'),
            },
          },
        ],
      },
      {
        name: 'detail',
        path: 'ecommerce/productDetails/:id',
        component: () => import(/* webpackChunkName: "detail" */ '../view/apps/ecommerce/product/ProductDetails.vue'),
      },
      {
        name: 'add-product',
        path: 'ecommerce/add-product',
        component: () => import(/* webpackChunkName: "addProduct" */ '../view/apps/ecommerce/product/AddProduct.vue'),
      },
      {
        name: 'edit-product',
        path: 'ecommerce/edit-product',
        component: () => import(/* webpackChunkName: "editProduct" */ '../view/apps/ecommerce/product/EditProduct.vue'),
      },
      {
        name: 'orders',
        path: 'ecommerce/orders',
        component: () => import(/* webpackChunkName: "Orders" */ '../view/apps/ecommerce/Orders.vue'),
      },
      {
        name: 'sellers',
        path: 'ecommerce/sellers',
        component: () => import(/* webpackChunkName: "sellers" */ '../view/apps/ecommerce/Sellers.vue'),
      },
      {
        name: 'invoice',
        path: 'ecommerce/invoice',
        component: () => import(/* webpackChunkName: "invoice" */ '../view/apps/ecommerce/Invoice.vue'),
      },
      {
        name: 'cart',
        path: 'ecommerce/cart',
        component: () => import(/* webpackChunkName: "cart" */ '../view/apps/ecommerce/Cart.vue'),
        children: [
          {
            name: 'exact',
            path: '',
            components: {
              default: () => import(/* webpackChunkName: "cart" */ '../view/apps/ecommerce/Cart.vue'),
              child: () => import(/* webpackChunkName: "cartTable" */ '../view/apps/ecommerce/overview/CartTable.vue'),
            },
          },
          {
            name: 'checkout',
            path: 'checkout',
            components: {
              default: () => import(/* webpackChunkName: "cart" */ '../view/apps/ecommerce/Cart.vue'),
              child: () => import(/* webpackChunkName: "checkout" */ '../view/apps/ecommerce/overview/CheckOut.vue'),
            },
          },
        ],
      },
    ],
  },
  {
    name: 'to-do',
    path: '/app/to-do',
    component: () => import(/* webpackChunkName: "to-do" */ '../view/apps/todo/Todo.vue'),
  }
];
