import request from '@/utils/request';
import Api from '@/config/api';


export const getMyowns = (payload) => request.get(Api.getMyowns, payload);

export const postChangecc = (payload) => request.get(Api.postChangecc, payload);
export const postAddmsg = (payload) => request.get(Api.postAddmsg, payload);
export const postAddbuymsg = (payload) => request.get(Api.postAddbuymsg, payload);
export const postAdddetail = (payload) => request.get(Api.postAdddetail, payload);
export const goodsDetail = (payload) => request.get(Api.goodsDetail, payload);
export const ccDetail = (payload) => request.get(Api.getCCdetial, payload);


export const getPricehistory = (payload) => request.get(Api.getPricehistory, payload);
export const getBuyhistory = (payload) => request.get(Api.getBuyhistory, payload);
export const getSearchmsg = (payload) => request.get(Api.getSearchmsg, payload);
export const getSearchbuymsg = (payload) => request.get(Api.getSearchbuymsg, payload);
export const getSearchcc = (payload) => request.get(Api.getSearchcc, payload);


export default {};
