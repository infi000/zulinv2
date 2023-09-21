import request from '@/utils/request';
import Api from '@/config/api';


/**
 * 1.1 寄卖商品列表goods
 */
export const getSearchGoods = (payload: ISearchGoodsParams) => request.post(Api.consignmenMygoods, payload);


/**
 *chargepay
 */
export const postPay = (payload: any) => request.post(Api.buyta, payload);

/**
6.    获取设置getbg
User/getbg
必需参数：
sname:支持yearbg和tabg；yearbg:年会员背景；tabg:铊币背景

 */
export const getbg = (payload: any) => request.get(Api.getbg, payload);
export const getccCard = (payload: any) => request.get(Api.getccCard, payload);
export const getConsignmenCategorys = (payload: any) => request.get(Api.getbg, payload);

/**
 * 1.1 寄卖商品列表goods
 */
export const createGoods = (payload: any) => request.post(Api.consignmenGoodsadd, payload);
export const getUserBuycard = (payload: any) => request.get(Api.getUserBuycard, payload);


export default {};
