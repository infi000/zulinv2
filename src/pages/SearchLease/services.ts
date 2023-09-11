import request from '@/utils/request';
import Api from '@/config/api';
/**
 * 获取详情
 */
export const getexperiments = (data) => request.get(Api.classifyGetexperiments, data);