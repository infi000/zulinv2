import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取预约列表信息
 */
export const prebookhistory = (data) => request.get(Api.leasePrebookhistory, data);