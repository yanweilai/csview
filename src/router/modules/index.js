import BasicLayout from "@/layouts/basic-layout";
import Setting from "@/setting";

const meta = {
  auth: true,
};

const pre = "home_";

export default {
  path: `${Setting.roterPre}/home/`,
  name: "home",
  header: "home",
  redirect: {
    name: `${pre}index`,
  },
  meta,
  component: BasicLayout,
  children: [
    {
      path: "/",
      name: `${pre}index`,
      meta: {
        auth: ["admin-index-index"],
        title: "主页",
      },
      component: () => import("@/pages/index/index"),
    },
  ],
};
