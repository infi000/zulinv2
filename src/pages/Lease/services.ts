import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 	2.  实验项目详细信息experimentdetail
Lease/experimentdetail
必需参数：
eid:实验项目id

 */
export const getExperimentDetailService = (payload: { eid: string }) => request.get(Api.experimentDetail, payload);

/**
 * 
 * @param payload 获取房间
 * @returns 
 */
export const getEquipmentsService = (data) => request.get(Api.leaseEquipments, data);

/**
 * 
 * @param payload 获取工具箱
 * @returns 
 */
export const getToolsService = (data) => request.get(Api.leaseToolboxs, data);

/**
 * 
 * @param payload 获取工具箱
 * @returns 
 */
export const getToolService = (data) => request.get(Api.leaseToolbox, data);

/**
 * 
 * @param payload 获取房间已预约时间段
 * @returns 
 */
export const getEquipmentBookTimes = (data) => request.get(Api.leaseEquipmentbooktimes, data);

/**
 * 
 * @param payload 创建订单
 * @returns 
 */
export const orderadd = (data) => request.post(Api.leaseOrderadd, data);


export default {};
