import request from '@/utils/request';
import Api from '@/config/api';
import * as mock from './mock';

// ==================== 真实接口函数 ====================

/**
 * 用户卡查询（真实接口）
 * @param phone 手机号
 */
const _getUserCards = (data: { phone: string }) => request.get(Api.adminUserCards, data);

/**
 * 用户卡核销（真实接口）
 * @param uid 用户id
 * @param cid 卡id
 * @param checknum 核销次数，可不填默认1
 */
const _checkUserCard = (data: { uid: string; cid: string; checknum?: number }) => request.post(Api.adminCheckCard, data);

/**
 * 当日充卡记录查询（真实接口）
 */
const _getBuySearch = () => request.get(Api.adminBuySearch, {});

/**
 * 设置充卡备注（真实接口）
 * @param cid 卡id
 * @param remark 备注信息
 */
const _setCardRemark = (data: { cid: string; remark: string }) => request.post(Api.adminSetCardRemark, data);

/**
 * 用户购卡订单查询（真实接口）
 * @param odate 日期，yyyy-mm-dd格式
 */
const _getUserCardOrders = (data: { odate: string }) => request.get(Api.adminUserCardOrders, data);

/**
 * 用户卡订单退款（真实接口）
 * @param oid 订单id
 * @param money 退款金额，单位元
 * @param usercardleft 设置的次数json数据，非必需
 */
const _userCardOrderRefund = (data: { oid: string; money: string; usercardleft?: string }) => request.post(Api.adminUserCardOrderRefund, data);

// ==================== 导出函数（根据 MOCK 开关选择使用真实接口或 Mock） ====================

/**
 * 用户卡查询
 * @param phone 手机号
 */
export const getUserCards = mock.MOCK_ENABLED ? mock.mockGetUserCards : _getUserCards;

/**
 * 用户卡核销
 * @param uid 用户id
 * @param cid 卡id
 * @param checknum 核销次数，可不填默认1
 */
export const checkUserCard = mock.MOCK_ENABLED ? mock.mockCheckUserCard : _checkUserCard;

/**
 * 当日充卡记录查询
 */
export const getBuySearch = mock.MOCK_ENABLED ? mock.mockGetBuySearch : _getBuySearch;

/**
 * 设置充卡备注
 * @param cid 卡id
 * @param remark 备注信息
 */
export const setCardRemark = mock.MOCK_ENABLED ? mock.mockSetCardRemark : _setCardRemark;

/**
 * 用户购卡订单查询
 * @param odate 日期，yyyy-mm-dd格式
 */
export const getUserCardOrders = mock.MOCK_ENABLED ? mock.mockGetUserCardOrders : _getUserCardOrders;

/**
 * 用户卡订单退款
 * @param oid 订单id
 * @param money 退款金额，单位元
 * @param usercardleft 设置的次数json数据，非必需
 */
export const userCardOrderRefund = mock.MOCK_ENABLED ? mock.mockUserCardOrderRefund : _userCardOrderRefund;

export default {
  getUserCards,
  checkUserCard,
  getBuySearch,
  setCardRemark,
  getUserCardOrders,
  userCardOrderRefund,
};
