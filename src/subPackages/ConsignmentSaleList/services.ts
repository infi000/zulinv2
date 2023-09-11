import request from '@/utils/request';
import Api from '@/config/api';


/**
 * 1.1 寄卖商品列表goods
 */
export const getSearchGoods = (payload: ISearchGoodsParams) => request.get(Api.consignmenMygoods, payload);


export default {};
