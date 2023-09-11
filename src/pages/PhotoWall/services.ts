import request from '@/utils/request';
import Api from '@/config/api';


export const searchDynamic = (payload) => request.get(Api.searchDynamic, payload);
export const getBgs = (payload) => request.get(Api.getBgs, payload);


export default {};
