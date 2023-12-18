import request from '@/utils/request';
import Api from '@/config/api';

export const searchOrder = (payload) => request.get(Api.searchOrder, payload);
export const getCardCheckedList = (payload) => request.get(Api.getCardCheckedList, payload);
export const getPicketCheckedList = (payload) => request.get(Api.getPicketCheckedList, payload);

// 16.	删除订单
/**
 * id:订单的orderid
 */
export const delOrder = (payload) => request.get(Api.delOrder, payload);
export const orderComplete = (payload) => request.get(Api.orderComplete, payload);

export default {};
