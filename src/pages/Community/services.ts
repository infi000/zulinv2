import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取频道数据
 */
export const getChannel = () => request.get(Api.channel);

/**
 * 获取列表信息
 */
export const getList = (params) => request.get(Api.communityList, params);

/**
 * 获取详情
 */
export const getDetail = (id) => request.get(Api.communityList+id);

