import request from '@/plugins/request';

/**
 * @description 卡劵列表 
 */
export function couponModelList(data) {
  return request({
    url: 'crab/coupon/model/list',
    method: 'get',
    data
  });
}
/**
 * @description 订单管理--列表
 * @param {Object} param data {Object} 传值参数
 */
export function orderList(data) {
  return request({
    url: '/order/list',
    method: 'get',
    params: data
  });
}
