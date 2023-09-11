import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取预约列表信息
 */
export const orderDetail = (data) => request.get(Api.leaseOrderDetail, data);

/**
 * 
 * @param data 申请预约
 * @returns 
 */
export const applyJoin = (data) => request.post(Api.leasePrebookjoin, data);

/**
 * 
 * @param data 预约申请列表
 * @returns 
 */
export const applyJoinList = (data) => request.get(Api.leasePrebookusers, data);
/**
 * 
 * @param data 审核通过
 * @returns 
 */
export const applyCheckPass = (data) => request.post(Api.leasePrebookpass, data);
/**
 * 审核未通过
 * @param data 
 * @returns 
 */
export const applyCheckUnPass = (data) => request.post(Api.leasePrebookunpass, data);

/**
 * 
 * @param data 获取支付信息
 * @returns 
 */
export const leasePayInfo = (data) => request.get(Api.leasePayInfo, data);

/**
 * 
 * @param data 获取订单收款二维码
 * @returns 
 */
export const leaseOrderWxcode = (data) => request.get(Api.leaseOrderWxcode, data);

/**
 * 添加工具
 * @param data 
 * @returns 
 */
export const leasePrebookToolAdd = (data) => request.post(Api.leasePrebookToolAdd, data);

export const leasePrebookjoininfo = (data) => request.get(Api.leasePrebookjoininfo, data);