import request from '@/utils/request';
import Api from '@/config/api';


export const picketSearch = (payload) => request.get(Api.picketSearch, payload);


export default {};
