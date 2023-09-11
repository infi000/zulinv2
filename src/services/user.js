import request from '../utils/request';
import Api from '../config/api';

/**
 *  小程序登录更新session
 */

export const getJscode2session = async (payload) => request.get(Api.getJscode2session, payload);
/**
 * 更新小程序用户信息
 */

export const saveUserData = async (payload) => request.get(Api.saveUserData, payload);

export const setwxuserphone = (data) => request.post(Api.setwxuserphone, data);
