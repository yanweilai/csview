import request from "@/plugins/request";
/*
 * 登录
 * */
export function AccountLogin(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

/*
 * 是否有滑块
 * */
export function isCaptcha(data) {
  return request({
    url: "/is_captcha",
    method: "post",
    data,
  });
}

/*
 * 短信登录
 * */
export function mobilLogin(data) {
  return request({
    url: "/mobile_login",
    method: "post",
    data,
  });
}

/*
 * 忘记密码
 * */
export function resetPassword(data) {
  return request({
    url: "/reset_pwd",
    method: "post",
    data,
  });
}

/**
 * 退出登陆
 * @constructor
 */
export function AccountLogout() {
  return request({
    url: "/setting/admin/logout",
    method: "get",
  });
}

/**
 * 获取轮播图和logo
 */
export function loginInfoApi() {
  return request({
    url: "/login/info",
    method: "get",
  });
}

/**
 * 获取版权信息
 */
export function copyrightInfoApi() {
  return request({
    url: "/copyright",
    method: "get",
  });
}

/**
 * 获取菜单数据
 */
export function menusApi() {
  return request({
    url: "/menus",
    method: "get",
  });
}

/**
 * 搜索菜单数据
 */
export function menusListApi() {
  return request({
    url: "/menusList",
    method: "get",
  });
}

export function getSysInfo() {
  return request({
    url: "/logo",
    method: "get",
  });
}

export function AccountRegister() {}
