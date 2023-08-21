import request from "@/plugins/request";

/**
 * @description 获取消息管理列表数据
 * @param {Object} param params {Object} 传值参数
 */
export function getNotificationList(type) {
  return request({
    url: `setting/notification/index?type=${type}`,
    method: "get",
  });
}
/**
 * @description 获取消息管理设置数据获取
 * @param {Object} param params {Object} 传值参数
 */
export function getNotificationInfo(id, type) {
  return request({
    url: `setting/notification/info?id=${id}&type=${type}`,
    method: "get",
  });
}

/**
 * @description 获取消息管理设置数据获取
 * @param {Object} param params {Object} 传值参数
 */
export function getNotificationSave(data) {
  return request({
    url: `setting/notification/save`,
    method: "post",
    data,
  });
}

/**
 * @description 设置站内消息
 * @param {Number} param id {Number}
 */
export function noticeStatus(type, status, id) {
  return request({
    url: `setting/notification/set_status/${type}/${status}/${id}`,
    method: "put",
  });
}
