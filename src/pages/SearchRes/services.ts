import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 	30.	获取分类集合下的商品
 * @param payload 
 * @param payload.cid  id
 * @param payload.offset  
 * @param payload.count  
 */
export const searchGoods = (payload:{key?:StringNumber,offset:StringNumber,count:StringNumber}) => request.get(Api.searchGoods, payload);


/**
 * 	30.	获取分类集合下的商品
 * @param payload 
 * @param payload.cid  id
 * @param payload.offset  
 * @param payload.count  
 */
export const getClassifyGoods = (payload:{title:StringNumber,cid:StringNumber,offset:StringNumber,count:StringNumber}) => request.get(Api.getClassifyGoods, payload);

