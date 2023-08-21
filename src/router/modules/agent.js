import BasicLayout from "@/layouts/basic-layout";
import Setting from "@/setting";

const pre = "agent_";
const meta = {
  auth: true,
};
export default {
  path: `${Setting.roterPre}/agent`,
  name: "agent",
  header: "agent",
  // redirect: {
  //     name: `${pre}agentManage`
  // },
  meta,
  component: BasicLayout,
  children: [
    {
      path: "agent_manage/index",
      name: `${pre}agentManage`,
      meta: {
        auth: ["agent-agent-manage"],
        title: "分销员管理",
      },
      component: () => import("@/pages/agent/agentManage"),
    },
    {
      path: "agreement",
      name: `${pre}agreementt`,
      meta: {
        auth: ["agent-agreement"],
        title: "分销说明",
      },
      component: () => import("@/pages/agent/agreement"),
    },
  ],
};
