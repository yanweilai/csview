import BasicLayout from "@/layouts/basic-layout";
import Setting from "@/setting";
const meta = {
  auth: true,
};

const pre = "devise_";

export default {
  path: `${Setting.roterPre}/setting/pages`,
  name: "devise",
  header: "devise",
  // redirect: {
  //     name: `${pre}devise`
  // },
  component: BasicLayout,
  children: [
    {
      path: `${Setting.roterPre}/setting/pages/devise`,
      name: `${pre}devise`,
      meta: {
        auth: ["admin-setting-pages-devise"],
        title: "店铺装修",
      },
      component: () => import("@/pages/setting/devise/list"),
    },
    {
      path: `${Setting.roterPre}/setting/theme_style`,
      name: `${pre}themeStyle`,
      meta: {
        auth: ["admin-setting-theme_style"],
        title: "主题风格",
      },
      component: () => import("@/pages/setting/themeStyle/index"),
    },
    {
      path: `${Setting.roterPre}/setting/system_visualization_data`,
      name: `${pre}systemGroupData`,
      meta: {
        auth: ["admin-setting-system_visualization_data"],
        title: "数据配置",
      },
      component: () => import("@/pages/system/group/visualization"),
    },
    {
      path: `${Setting.roterPre}/setting/pc_group_data`,
      name: `${pre}systemGroupDataGroup`,
      meta: {
        auth: ["setting-system-pc_data"],
        title: "PC商城",
      },
      component: () => import("@/pages/system/group/pc"),
    },
  ],
};
