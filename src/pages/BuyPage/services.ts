import request from '@/utils/request';
import Api from '@/config/api';

export const getMyAddress = (payload) => request.get(Api.myAddress, payload);

export const getOderDetail = (payload: { orderid: string }) => request.get(Api.getOderDetail, payload);

export const payex = (payload: { tag: string; orderfrom: 1; addressid: string; paytype: string }) => request.post(Api.payex, payload);

export default {};
