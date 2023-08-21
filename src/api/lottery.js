import request from "@/plugins/request";

/**
 * @description 九宫格抽奖 -- 列表
 */
export function lotteryListApi(data) {
  return request({
    url: "lottery/list",
    method: "get",
    params: data,
  });
}

/**
 * @description 九宫格抽奖 -- 详情
 * @param id 抽奖活动id
 */
export function lotteryDetailApi(id) {
  return request({
    url: `lottery/detail/${id}`,
    method: "get",
  });
}

/**
 * @description 九宫格抽奖 -- 创建
 */
export function lotteryCreateApi(data) {
  return request({
    url: `lottery/add`,
    method: "post",
    data,
  });
}
/**
 **
 * @description 九宫格抽奖 -- 修改/编辑
 */
export function lotteryEditApi(id, data) {
  return request({
    url: `lottery/edit/${id}`,
    method: "put",
    data,
  });
}

/**
 * @description 九宫格抽奖 -- 最新版详情
 * @param
 */
export function lotteryFactorInfo(type) {
  return request({
    url: `lottery/factor_info/${type}`,
    method: "get",
  });
}

/**
 **
 * @description 九宫格抽奖 -- 删除
 */
export function lotteryDelApi(id) {
  return request({
    url: `lottery/del/${id}`,
    method: "delete",
  });
}

/**
 **
 * @description 九宫格抽奖 -- 显示状态
 */
export function lotteryStatusApi(data) {
  return request({
    url: `lottery/set_status/${data.id}/${data.status}`,
    method: "post",
  });
}

/**
 **
 * @description 九宫格抽奖 -- 中奖记录
 */
export function lotteryRecordList(data, id) {
  return request({
    url: `lottery/record/list/${id}`,
    method: "get",
    params: data,
  });
}

/**
 **
 * @description 九宫格抽奖 -- 全部中奖记录
 */
export function recordList(data) {
  return request({
    url: `lottery/record/list`,
    method: "get",
    params: data,
  });
}

/**
 **
 * @description 九宫格抽奖 -- 中奖发货/备注处理
 */
export function lotteryRecordDeliver(data) {
  return request({
    url: `lottery/record/deliver`,
    method: "post",
    data,
  });
}
