/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-23 23:20:25
 * @FilePath: /zulin/src/subPackagesMe/UserInfoManage/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';


/**
 * 1.1 寄卖商品列表goods
 */
export const getSearchGoods = (payload: ISearchGoodsParams) => request.post(Api.consignmenMygoods, payload);


/**
 *chargepay
 */
export const postPay = (payload: any) => request.post(Api.chargepay, payload);

/**
 * 1.1 寄卖商品列表goods
 */
export const getConsignmenCategorys = (payload: any) => request.get(Api.consignmenCategorys, payload);

/**
1.    我的信息baseinfo
User/baseinfo
必需参数：
openid:用户唯一标识
返回
{
       "res": "succ",
       "data": {
              "id": "6",
              "nickname": "mryang",
              "face": "http://aa.jpg",
              "mobile": "18122121212",
              "birthday": "2011-01-02",
              "sex": "0",
       }
}

 */
export const createUserInfo = (payload: any) => request.post(Api.userInfoModify, payload);
export const userAgreement = (payload: any) => request.post(Api.userAgreement, payload);
export const uploadbase64 = (payload: any) => request.post(Api.uploadbase64, payload);

export const getMeInfo = (payload?: {}) => request.get(Api.baseinfo2, payload);
export const agreementregisterinfo = (payload?: {}) => request.get(Api.agreementregisterinfo, payload);

export default {};
