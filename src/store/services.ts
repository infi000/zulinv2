import request from '@/utils/request';
import Api from '@/config/api';


/**
/**
 * 1.1 寄卖商品列表goods
 */
export const getUserInfo = (payload?: {}) => request.get(Api.userInfo, payload);
export const getMeInfo = (payload?: {}) => request.get(Api.meInfo, payload);


export default {};
