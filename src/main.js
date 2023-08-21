// Vue
import "@babel/polyfill";
import Vue from "vue";
import App from "./App";
import Auth from "@/libs/wechat";

// 配置
import Setting from "./setting";

// 混合
import mixinApp from "@/mixins/app";

// 插件
import plugins from "@/plugins";

// store
import store from "@/store/index";

// 懒加载
import VueLazyload from "vue-lazyload";

// iView 和 iView Pro
import ViewUI from "view-design";
import iViewPro from "@/libs/iview-pro/iview-pro.min.js";

import {
  Tag,
  Tooltip,
  Popover,
  Input,
  Cascader,
  CascaderPanel,
  Tree,
} from "element-ui";
Vue.use(Cascader);
Vue.use(Tag);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Input);
Vue.use(CascaderPanel);
Vue.use(Tree);
// 菜单和路由
import router from "./router";
// import menuHeader from '@/menu/header';
// import menuSider from '@/menu/sider';

import { frameInRoutes } from "@/router/routes";

// 全局过滤
import * as filters from "./filters"; // global filters modalTemplates

// 多语言
import i18n from "@/i18n";

// 方法
import {
  getHeaderName,
  getHeaderSider,
  getMenuSider,
  getSiderSubmenu,
} from "@/libs/system";

//缓存方法
import cache from "@/plugins/cache/index";

// swiper
import VueAwesomeSwiper from "vue-awesome-swiper";

// 内置组件
import iLink from "@/components/link";
import dialog from "@/libs/dialog";
import scroll from "@/libs/loading";
import schema from "async-validator";
import VueCodeMirror from "vue-codemirror";

// 复制到粘贴板插件
import VueClipboard from "vue-clipboard2";
// 使用样式，修改主题可以在 styles 目录下创建新的主题包并修改 iView 默认的 less 变量
// 参考 https://www.iviewui.com/docs/guide/theme
import "./styles/index.less";
import "./libs/iview-pro/iview-pro.css";
import "swiper/dist/css/swiper.css";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfontYI/iconfontYI.css";
import "vue-happy-scroll/docs/happy-scroll.css";
import "./plugins/emoji-awesome/css/google.min.css";

// 引入外部表格；
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/index.css";

import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import "codemirror/lib/codemirror.css";

import formCreate from "@form-create/iview"; //表单生成器
import modalForm from "@/utils/modalForm"; //公共方法
import videoCloud from "@/utils/videoCloud"; //云点播
import { modalSure, getFileType } from "@/utils/public"; //公共方法
import { authLapse } from "@/utils/authLapse"; //登录过期
import VueDND from "awe-dnd"; //拖拽
import preventReClick from "./utils/plugins.js"; //防止重复点击

import * as tools from "@/libs/tools";
Vue.prototype.$tools = tools;

// 移动端滚动插件
import vuescroll from "vuescroll";
Vue.prototype.bus = new Vue();

Vue.use(vuescroll);

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
window.Promise = Promise;
Vue.prototype.$modalForm = modalForm;
Vue.prototype.$modalSure = modalSure;
Vue.prototype.$getFileType = getFileType;
Vue.prototype.$videoCloud = videoCloud;
Vue.prototype.$authLapse = authLapse;
Vue.prototype.$dialog = dialog;
Vue.prototype.$scroll = scroll;
Vue.prototype.$wechat = Auth;
Vue.prototype.$validator = function(rule) {
  return new schema(rule);
};
Vue.prototype.$cache = cache;
//日期
import moment from "moment";
Vue.prototype.$moment = moment;
moment.locale("zh-cn");
Vue.use(formCreate);
Vue.use(VueCodeMirror);
Vue.use(VueDND);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("./assets/images/no.png"),
  loading: require("./assets/images/moren.jpg"),
  attempt: 1,
  listenEvents: [
    "scroll",
    "wheel",
    "mousewheel",
    "resize",
    "animationend",
    "transitionend",
    "touchmove",
  ],
});

Vue.use(VXETable);
window.router = router;

if (window) window.$t = (key, value) => i18n.t(key, value);
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
});
Vue.use(VueAwesomeSwiper);
Vue.use(plugins);

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value),
});

Vue.use(iViewPro);
Vue.component("i-link", iLink);

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "https://cdn.oss.9gt.net/js/es.js?version=prov2.2";
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(hm, s);
// })();

// router.beforeEach((to, from, next) => {
//   if (_hmt) {
//     if (to.path) {
//       _hmt.push(["_trackPageview", "/#" + to.fullPath]);
//     }
//   }
//   next();
// });

// 添加crmeb chat 统计
// var __s = document.createElement("script");
// __s.src = `${Setting.apiBaseURL.replace(/adminapi/, "")}/api/get_script`;
// document.head.appendChild(__s);

new Vue({
  mixins: [mixinApp],
  router,
  store,
  i18n,
  render: (h) => h(App),
  async created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit("admin/page/init", frameInRoutes);
    // 加载用户登录的数据
    this.$store.dispatch("admin/account/load");
    // 初始化全屏监听
    this.$store.dispatch("admin/layout/listenFullscreen");
  },
  watch: {
    // 监听路由 控制侧边栏显示 标记当前顶栏菜单（如需要）
    $route(to, from) {
      if (to.meta.kefu) {
        document.body.classList.add("kf_mobile");
      } else {
        document.body.classList.remove("kf_mobile");
      }
      if (to.name == "setting_diy" || to.name == "setting_special_diy") {
        document.body.classList.add("diy-body");
      } else {
        document.body.classList.remove("diy-body");
      }
      let fullPath = to.fullPath.split("/").filter((k) => k !== "");
      if (fullPath.length && fullPath[0] === "kefu") return;
      const path = to.path;
      // 是否使用动态侧边菜单
      if (Setting.dynamicSiderMenu) {
        let menus = this.$store.state.admin.menus.menusName;
        // var storage = window.localStorage;
        // let menus = JSON.parse(storage.getItem('menuList'));
        // this.getMenus().then(menus => {
        // 处理手动清除db 跳转403问题
        if (!menus.length) {
          if (path != `${Setting.roterPre}/login`) {
            this.$router.replace(`${Setting.roterPre}/login`);
          }
          return;
        }
        const menuSider = menus;
        const headerName = getHeaderName(to, menuSider);
        // 在 404 时，是没有 headerName 的
        if (headerName !== null) {
          // 是否开启顶部菜单
          if (Setting.layout.headerMenu) {
            // 设置顶栏菜单 后台添加一个接口，设置顶部菜单
            const headerSider = getHeaderSider(menuSider);
            this.$store.commit("admin/menu/setHeader", headerSider);
            // 指定当前侧边栏隶属顶部菜单名称。如果你没有使用顶部菜单，则设置为默认的（一般为 home）名称即可
            this.$store.commit("admin/menu/setHeaderName", headerName);
            // 获取侧边栏菜单
            const filterMenuSider = getMenuSider(menuSider, headerName);
            // 指定当前显示的侧边菜单
            this.$store.commit(
              "admin/menu/setSider",
              filterMenuSider[0].children
            );
          } else {
            // 指定当前侧边栏隶属顶部菜单名称。如果你没有使用顶部菜单，则设置为默认的（一般为 home）名称即可
            this.$store.commit("admin/menu/setHeaderName", "home");
            // 指定当前显示的侧边菜单
            this.$store.commit("admin/menu/setSider", menuSider);
          }
          // 指定当前菜单，即高亮项
          this.$store.commit("admin/menu/setActivePath", path);
          // 找到其所有父菜单 path 进行展开
          // const openNames = getSiderSubmenu(path, menuSider);
          const openNames = getSiderSubmenu(to, menuSider);
          this.$store.commit("admin/menu/setOpenNames", openNames);
        } else {
          //子路由给默认 如果你没有使用顶部菜单，则设置为默认的（一般为 home）名称即可
          this.$store.commit("admin/menu/setHeaderName", "home");
          // 指定当前显示的侧边菜单
          this.$store.commit("admin/menu/setSider", menuSider);
        }
        // });
      }
      this.appRouteChange(to, from);
    },
  },
}).$mount("#app");
