import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取预约列表信息
 */
export const getListData = (data) => request.get(Api.leaseExperiments, data);

export default {};