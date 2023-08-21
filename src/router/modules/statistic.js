import BasicLayout from "@/layouts/basic-layout";
import Setting from "@/setting";
const meta = {
  auth: true,
};

const pre = "statistic_";

export default {
  path: `${Setting.roterPre}/statistic`,
  name: "statistic",
  header: "statistic",
  // redirect: {
  //     name: `${pre}product`
  // },
  component: BasicLayout,
  children: [
    {
      path: "product",
      name: `${pre}product`,
      meta: {
        title: "商品统计",
      },
      component: () => import("@/pages/statistic/product/index"),
    },
    {
      path: "user",
      name: `${pre}user`,
      meta: {
        title: "用户统计",
      },
      component: () => import("@/pages/statistic/user/index"),
    },
    {
      path: "transaction",
      name: `${pre}transaction`,
      meta: {
        title: "交易统计",
      },
      component: () => import("@/pages/statistic/transaction/index"),
    },
    {
      path: "capital",
      name: `${pre}capital`,
      meta: {
        auth: ["admin-statistic-capital"],
        title: "资金流水",
      },
      component: () => import("@/pages/statistic/capital/index"),
    },
  ],
};
