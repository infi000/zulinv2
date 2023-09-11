/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-06 01:19:47
 * @FilePath: /zulin/src/pages/PicketResult/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
import Api from '@/config/api';


export const picketCheck = (payload) => request.get(Api.picketCheck, payload);
export const setpicketduration = (payload) => request.get(Api.setpicketduration, payload);


export default {};
