import BasicLayout from "@/layouts/basic-layout";
import Setting from "@/setting";
const meta = {
  auth: true,
};

const pre = "work_";

export default {
  path: `${Setting.roterPre}/work`,
  name: "work",
  header: "work",
  // redirect: {
  //     name: `${pre}channel_code`
  // },
  meta,
  component: BasicLayout,
  children: [
    {
      path: `${Setting.roterPre}/work/channel_code`,
      name: `${pre}channel_code`,
      meta: {
        title: "企业渠道码",
        auth: ["work-channel-code"],
      },
      component: () => import("@/pages/work/channelCode/index"),
    },
    {
      path: `${Setting.roterPre}/work/createCode/:id?`,
      name: `${pre}createCode`,
      meta: {
        title: "添加企业渠道码",
        auth: ["work-code-create"],
      },
      component: () => import("@/pages/work/channelCode/createCode"),
    },
    {
      path: `${Setting.roterPre}/work/client/group_chat`,
      name: `${pre}group_chat`,
      meta: {
        title: "客户群列表",
        auth: ["work-customer-base"],
      },
      component: () => import("@/pages/work/customerBase/index"),
    },
    {
      path: `${Setting.roterPre}/work/client/statistical/:id?`,
      name: `${pre}statistical`,
      meta: {
        title: "客户群统计",
        auth: ["work-client-statistical"],
      },
      component: () => import("@/pages/work/customerBase/statistical"),
    },
    {
      path: `${Setting.roterPre}/work/client/list`,
      name: `${pre}client_list`,
      meta: {
        title: "客户列表",
        auth: ["work-client-list"],
      },
      component: () => import("@/pages/work/customerBase/list"),
    },
    {
      path: `${Setting.roterPre}/work/auth_group`,
      name: `${pre}auth_group`,
      meta: {
        title: "自动拉群",
        auth: ["work-auth-group"],
      },
      component: () => import("@/pages/work/authGroup/index"),
    },
    {
      path: `${Setting.roterPre}/work/welcome`,
      name: `${pre}welcome`,
      meta: {
        title: "欢迎语",
        auth: ["work-welcome"],
      },
      component: () => import("@/pages/work/welcome/index"),
    },
    {
      path: `${Setting.roterPre}/work/addWelcome/:id?`,
      name: `${pre}addWelcome`,
      meta: {
        title: "新建好友欢迎语",
        auth: ["work-addWelcome"],
      },
      component: () => import("@/pages/work/welcome/addWelcome"),
    },
    {
      path: `${Setting.roterPre}/work/addAuthGroup/:id?`,
      name: `${pre}addAuthGroup`,
      meta: {
        title: "新建自动拉群",
        auth: ["work-addAuthGroup"],
      },
      component: () => import("@/pages/work/authGroup/addAuthGroup"),
    },
    {
      path: `${Setting.roterPre}/work/staffList`,
      name: `${pre}staffList`,
      meta: {
        title: "员工列表",
        auth: ["work-staffList"],
      },
      component: () => import("@/pages/work/staffList/index"),
    },
    {
      path: `${Setting.roterPre}/work/client/group`,
      name: `${pre}clientGroup`,
      meta: {
        title: "客户群发",
        auth: ["work-client-group"],
      },
      component: () => import("@/pages/work/clientGroup/index"),
    },
    {
      path: `${Setting.roterPre}/work/client/add_group`,
      name: `${pre}addClientGroup`,
      meta: {
        title: "新建客户群发",
        auth: ["work-client-add_group"],
      },
      component: () => import("@/pages/work/clientGroup/addClientGroup"),
    },
    {
      path: `${Setting.roterPre}/work/client/group_info/:id?`,
      name: `${pre}group_info`,
      meta: {
        title: "客户群发详情",
        auth: ["work-client-groupInfo"],
      },
      component: () => import("@/pages/work/clientGroup/clientGroupInfo"),
    },
    {
      path: `${Setting.roterPre}/work/client/moment`,
      name: `${pre}clientMoment`,
      meta: {
        title: "朋友圈列表",
        auth: ["work-client-moment"],
      },
      component: () => import("@/pages/work/clientMoment/index"),
    },
    {
      path: `${Setting.roterPre}/work/client/add_moment`,
      name: `${pre}addClientMoment`,
      meta: {
        title: "朋友圈添加",
        auth: ["work-client-add-moment"],
      },
      component: () => import("@/pages/work/clientMoment/addMoment"),
    },
    {
      path: `${Setting.roterPre}/work/client/moment_info/:id?`,
      name: `${pre}moment_info`,
      meta: {
        title: "朋友圈详情",
        auth: ["work-client-momentInfo"],
      },
      component: () => import("@/pages/work/clientMoment/clientMomentInfo"),
    },
    {
      path: `${Setting.roterPre}/work/group/template`,
      name: `${pre}groupTemplate`,
      meta: {
        title: "客户群群发",
        auth: ["work-group-template"],
      },
      component: () => import("@/pages/work/groupTemplate/index"),
    },
    {
      path: `${Setting.roterPre}/work/group/add_template`,
      name: `${pre}addGroupTemplate`,
      meta: {
        title: "添加客户群群发",
        auth: ["work-group-add_template"],
      },
      component: () => import("@/pages/work/groupTemplate/add_template"),
    },
    {
      path: `${Setting.roterPre}/work/group/template_info/:id?`,
      name: `${pre}template_info`,
      meta: {
        title: "客户群群发详情",
        auth: ["work-group-templateInfo"],
      },
      component: () => import("@/pages/work/groupTemplate/groupTemplateInfo"),
    },
    {
      path: `${Setting.roterPre}/work/config`,
      name: `${pre}config`,
      meta: {
        auth: ["admin-work-config"],
        footer: true,
        title: "企业微信设置",
      },
      props: {
        typeMole: "work",
      },
      component: () => import("@/pages/work/config/index.vue"),
    },
  ],
};
