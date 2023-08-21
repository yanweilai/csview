const pre = "kefu_";
import Setting from "@/setting";

export default [
  // 登录
  {
    path: `${Setting.roterPre}/login`,
    name: "login",
    meta: {
      title: "$t:page.login.title",
    },
    component: () => import("@/pages/account/login"),
  },
  // 客服
  {
    // path: `/kefu`,
    path: Setting.routePreKF,
    name: `${pre}index`,
    meta: {
      auth: true,
      title: "客服管理",
      kefu: true,
    },
    component: () => import("@/pages/kefu/index"),
  },
  {
    path: `${Setting.routePreKF}/mobile_list`,
    name: `${pre}mobile_list`,
    meta: {
      auth: true,
      title: "消息列表",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/chat_list"),
  },
  {
    path: `${Setting.routePreKF}/mobile_chat`,
    name: `${pre}mobile_chat`,
    meta: {
      auth: true,
      title: "对话详情",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/index"),
  },
  {
    path: `${Setting.routePreKF}/pc_list`,
    name: `${pre}pc_list`,
    meta: {
      auth: true,
      title: "客服",
      kefu: true,
    },
    component: () => import("@/pages/kefu/pc/index"),
  },
  {
    path: `${Setting.routePreKF}/orderList/:type?/:toUid?`,
    name: `${pre}order-list`,
    meta: {
      auth: true,
      title: "订单列表",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/orderList/index"),
  },
  {
    path: `${Setting.routePreKF}/orderDetail/:id?/:goname?`,
    name: `${pre}order-detail`,
    meta: {
      auth: true,
      title: "订单详情",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/orderList/orderDetail.vue"),
  },
  {
    path: `${Setting.routePreKF}/orderDelivery/:id?/:orderId?`,
    name: `${pre}order-delivery`,
    meta: {
      auth: true,
      title: "发货",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/orderList/orderDelivery.vue"),
  },
  {
    path: `${Setting.routePreKF}/user/index/:uid?/:type?`,
    name: `${pre}user-index`,
    meta: {
      auth: true,
      title: "客户信息",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/user/index"),
  },
  {
    path: `${Setting.routePreKF}/goods/list`,
    name: `${pre}goods-list`,
    meta: {
      auth: true,
      title: "商品列表",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/goods/list.vue"),
  },
  {
    path: `${Setting.routePreKF}/goods/detail`,
    name: `${pre}goods-detail`,
    meta: {
      auth: true,
      title: "商品列表",
      kefu: true,
    },
    component: () => import("@/pages/kefu/mobile/goods/detail.vue"),
  },
  {
    path: `${Setting.routePreKF}/appChat`,
    name: `${pre}app-chat`,
    meta: {
      auth: true,
      title: "客服",
      kefu: true,
    },
    component: () => import("@/pages/kefu/appChat/index"),
  },
  {
    path: `${Setting.routePreKF}/mobile_user_chat`,
    name: `${pre}app-mobile_user_chat`,
    meta: {
      auth: true,
      title: "用户客服",
      kefu: true,
    },
    component: () => import("@/pages/kefu/appChat/mobile/index"),
  },
  {
    path: `${Setting.routePreKF}/mobile_feedback`,
    name: `${pre}app-mobile_feedback`,
    meta: {
      auth: true,
      title: "用户反馈",
      kefu: true,
    },
    component: () => import("@/pages/kefu/appChat/mobile/feedback"),
  },
];
