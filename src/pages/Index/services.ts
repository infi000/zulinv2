/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-03 22:24:20
 * @FilePath: /zulinv2/src/pages/Index/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import request from '@/utils/request';
import Api from '@/config/api';
import { useSelector, useDispatch } from '@tarojs/redux';
const dispatch = useDispatch();
/**
 * 获取详情
 */
export const getClassifySearchByType = (data) => request.get(Api.classifySearch, data);

// gotype,跳转类型；0不跳转，1商品详情，2租赁实验项目详情，3商品集合列表页，4租赁实验项目集合列表页，5所有商品页面，6所有租赁实验项目页， 8年卡会员购买，9会员卡详情, 10预约列表
export const dumpByType = (gotype, data) => {
    console.log("跳转类型：",gotype, data);
    switch(parseInt(gotype)){
        case 1:
            if(!data.gid){
                break;
            }
            if(!data.title){
                break;
            }
            Taro.navigateTo({
                url: '/pages/GoodsShow/index?gid='+data.gid+'&title='+data.title
            })
            break;
        case 2:  
            if(!data.eid){
                break;
            }
            Taro.navigateTo({
                url: '/pages/LeaseDetail/index?eid='+data.eid
            })
            break;
        case 3:  
            if(!data.cid){
                break;
            }
            if(!data.title){
                break;
            }
            Taro.navigateTo({ 
                url: '/pages/SearchRes/index?from=sortpage&cid=' + data.cid + '&key=' + data.title + '&title=' + data.title 
            });
            break;
        case 4: 
            if(!data.eid){
                break;
            }
            if(!data.title){
                break;
            } 
            Taro.navigateTo({ 
                url: '/pages/SearchLease/index?eid=' + data.eid + '&key=' + data.title + '&title=' + data.title 
            });
            break;
        case 5:  
            Taro.navigateTo({
                url: '/pages/GoodGoods/index'
            })
            break;
        case 6:  
            dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 2})
            break;                  
        case 8:  
             Taro.navigateTo({
                url: '/subPackagesMe/BuyVip/index'
            })
            break;             
        case 9:  
            if(!data.cardid){
                break;
            }
             Taro.navigateTo({
                url: '/pages/GoupiaoDetail/index?cid=' + data.cardid
            })
            break;                  
        case 10:  
            dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 1})
            break;                  
    }
}