import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 商品详情
 * @param payload
 * @param payload.gid string 商品id
 */
export const getDetail = (payload: { jgid: string }) => request.get(Api.consignmentGoodsdetail, payload);
/**
 * 商品关联热门推荐
 * @param payload
 * @param payload.gid string 商品id
 */
export const getRelatedGoods = (payload: { gid: string }) => request.get(Api.relatedGoods, payload);
/**
 * 购买寄卖商品buy
必需参数：
jgid:寄卖商品id
uphone:联系手机号
total:总金额
非必需参数：
remark:备注信息 

 */
 export const getConsignmentBuy = (payload: any) => request.get(Api.consignmentBuy, payload);
/**
 * 购买寄卖商品支付信息buypay
必需参数：
oid:订单id

 */
 export const getConsignmentBuypay = (payload: any) => request.get(Api.consignmenBuypay, payload);





/**
 * 检测是否已收藏商品
 * @param payload
 * @param payload.gid string 商品id
 */
 export const getBuysRecord = (payload: { gid: string; offset: number; count: number }) => request.get(Api.buysRecord, payload);


export const getIsfav = (payload: { gid: string }) => request.get(Api.isfav, payload);
export const getFav = (payload: { gid: string }) => request.get(Api.fav, payload);
export const getUnfav = (payload: { gids: string }) => request.get(Api.unfav, payload);
export const createOrder = (payload: { gids: string }) => request.post(Api.createOrder, payload);


// export const payQuery = (payload: { gids: string }) => request.get(Api.payQuery, payload);
export const payex = (payload: { gids: string }) => request.post(Api.payex, payload);

export const getMyAddress = (payload) => request.get(Api.myAddress, payload);



export default {};
