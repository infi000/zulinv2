import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取详情
 */
export const getDetail = (id) => request.get(Api.communityDetail+id);

/**
 * 
 * @param data 回帖
 * @returns 
 */
export const reply = (data) => request.post(Api.reply, data)