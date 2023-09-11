import request from '@/utils/request';
import Api from '@/config/api';

export const getMyAddress = (payload) => request.get(Api.myAddress, payload);

export const getOderDetail = (payload: { orderid: string }) => request.get(Api.getOderDetail, payload);

export const postSetAddress = (payload: { openId: string ; addressid: string; orderid: string }) => request.post(Api.modifyAddress, payload);

export default {};
