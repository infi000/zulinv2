import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 商品详情
 * @param payload
 * @param payload.gid string 商品id
 */
export const getDetail = (payload: { gid: string }) => request.get(Api.goodsDetail, payload);
/**
 * 商品关联热门推荐
 * @param payload
 * @param payload.gid string 商品id
 */
export const getRelatedGoods = (payload: { gid: string }) => request.get(Api.relatedGoods, payload);
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
