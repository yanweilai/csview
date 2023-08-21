import request from "@/plugins/request";

/**
 * 客服详细信息
 * @constructor
 */
export function serviceInfo() {
  return request({
    url: "service/info",
    method: "get",
    kefu: true,
  });
}
