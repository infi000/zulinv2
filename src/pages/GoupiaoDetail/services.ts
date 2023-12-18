/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 21:25:07
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-03 17:31:13
 * @FilePath: /zulinv2/src/pages/Goupiao/services copy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';

export const getUserBuycard = (payload: any) => request.get(Api.getUserBuycard, payload);
export const getCardDetail = (payload: any) => request.get(Api.getCardDetail, payload);

export default {};
