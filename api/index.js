import request from "@/api/request.js";

/**
 * 获取用户信息
 *
 */
export function getUserInfo(data) {
  return request.get("index/getUserInfo",data);
}

/**
 * 获取订单配置
 *
 */
export function getOrderConfig(data) {
  return request.get("hoin_pay/order_config",data,true);
}

export function login(data) {
  return request.post("index/login",data,true);
}

export function register(data) {
  return request.post("index/register",data,true);
}

export function hoinPay(data) {
  return request.get("hoin_pay/order_create",data,true);
}


export function hoinPayInfo(data) {
  return request.get("hoin_pay/get_order",data,true);
}

export function lineLogin(data) {
    return request.get("sns/login?quickType=line",data,true);
}

export function memberOrder(data) {
  return request.get("member/get_order",data);
}

export function quickLogin(data) {
  return request.post("index/quickLogin",data);
}