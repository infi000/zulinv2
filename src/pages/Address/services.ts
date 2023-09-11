import request from '@/utils/request';
import Api from '@/config/api';


export const getMyAddress = (payload) => request.get(Api.myAddress, payload);

export const setDefaultMyAddress = (payload) => request.get(Api.setDefaultAddress, payload);

export const delMyAddress = (payload) => request.get(Api.delAddress, payload);
export const saveAddress = (payload) => request.get(Api.saveAddress, payload);

export default {};
