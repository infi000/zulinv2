import request from '@/utils/request';
import Api from '@/config/api';

// 11.	我的订单（全部、待付款、待发货、待收货、交易完成）
export const searchOrder = (payload) => request.get(Api.searchOrder, payload);

// 16.	删除订单
/**
 * id:订单的orderid
 */
export const delOrder = (payload) => request.get(Api.delOrder, payload);
export const orderComplete = (payload) => request.get(Api.orderComplete, payload);

export default {};
