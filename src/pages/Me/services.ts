import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 28.	订阅消息
 * @param payload
 * @param payload.templateids 多个以英文“,”隔开
 */
export const subMsg = (payload: { templateids: string }) => request.get(Api.subMsg, payload);

/**
 * 28.	订阅消息
 * @param payload
 */
export const getAllTemplate = () => request.get(Api.getAllTemplate);

export const setwxuserphone = (data) => request.get(Api.setwxuserphone, data);


export default {};
