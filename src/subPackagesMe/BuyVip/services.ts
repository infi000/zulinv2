import request from '@/utils/request';
import Api from '@/config/api';


/**
 * 1.1 寄卖商品列表goods
 */
export const getSearchGoods = (payload: ISearchGoodsParams) => request.post(Api.consignmenMygoods, payload);


/**
 *chargepay
 */
export const postPay = (payload: any) => request.post(Api.buyyear, payload);

/**
 * 1.1 寄卖商品列表goods
 */
export const getConsignmenCategorys = (payload: any) => request.get(Api.consignmenCategorys, payload);

/**
 * 1.1 寄卖商品列表goods
 */
export const createGoods = (payload: any) => request.post(Api.consignmenGoodsadd, payload);

export const getbg = (payload: any) => request.get(Api.getbg, payload);
export default {};
