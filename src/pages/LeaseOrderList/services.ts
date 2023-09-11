import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取订单列表信息
 */
export const getOrderList = (data) => request.get(Api.leaseOrderList, data);