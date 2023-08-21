import request from "@/plugins/request";

/**
 * @description 套餐 -- 列表
 */
export function lotteryListApi(data) {
  return request({
    url: "lottery/list",
    method: "get",
    params: data,
  });
}

/**
 * @description 套餐 -- 详情
 * @param id 抽奖活动id
 */
export function lotteryDetailApi(id) {
  return request({
    url: `lottery/detail/${id}`,
    method: "get",
  });
}

/**
 * @description 套餐 -- 创建
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
 * @description 套餐 -- 修改/编辑
 */
export function lotteryEditApi(id, data) {
  return request({
    url: `lottery/edit/${id}`,
    method: "put",
    data,
  });
}

/**
 **
 * @description 套餐 -- 删除
 */
export function lotteryDelApi(id) {
  return request({
    url: `lottery/del/${id}`,
    method: "delete",
  });
}

/**
 **
 * @description 套餐 -- 显示状态
 */
export function lotteryStatusApi(data) {
  return request({
    url: `lottery/set_status/${data.id}/${data.status}`,
    method: "post",
  });
}
