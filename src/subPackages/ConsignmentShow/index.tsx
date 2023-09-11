// import Taro from '@tarojs/taro';
import Taro, { useRouter, useEffect, useTabItemTap, useDidShow, useDidHide, useShareAppMessage } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import GoodsDetail from './modules/GoodsDetail';
import BuysRecord from './modules/BuysRecord';
import './index.scss';
import { isArray } from 'lodash';
import { loglqr } from '@/static/images/index';

/**
 * 商品展示
 */
const ConsignmentShow = () => {
  const { isShowBuysPage,detail } = useSelector((state) => state.ConsignmentShow);
  const dispatch = useDispatch();
  const router = useRouter();
  useDidShow(() => {

    dispatch({ type: 'ConsignmentShow/init' });
    const { params } = router;
    const {gid,title, orderid, isSelf } = params;
    console.log(params);
    dispatch({ type: 'ConsignmentShow/updateGid', payload: gid });
    dispatch({ type: 'ConsignmentShow/updateOrderid', payload: orderid });
    dispatch({ type: 'ConsignmentShow/updateIsSelf', payload: isSelf === '1' ? true : false });
    dispatch({ type: 'ConsignmentShow/getDetail' });
    // dispatch({ type: 'ConsignmentShow/getPageBuysRecord', payload: { refresh: true } });
    // dispatch({ type: 'ConsignmentShow/getRelatedGoods' });
    // dispatch({ type: 'ConsignmentShow/getIsfav' });
    Taro.setNavigationBarTitle({
      title:title||'西塔科学探索俱乐部'
    });
    (Taro as any).showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  });
  useShareAppMessage(res => {
    const { params } = router;
    const {gid,title} = params;
    // let imageUrl = loglqr;
    // if(detail && detail.fpath){
    //   imageUrl = detail.fpath;
    // }
    return {
      showShareItems: ['wechatFriends', 'wechatMoment'],
      title: title || '西塔科学探索俱乐部',
      path: '/subPackages/ConsignmentShow/index?gid=' + gid + '&title=' + title ,
      // imageUrl
    }
  })
  useEffect(() => {
    return () => {
      dispatch({ type: 'ConsignmentShow/init' });

    };
  }, []);
  return <View>{isShowBuysPage ? <BuysRecord /> : <GoodsDetail />}</View>;
};

export default ConsignmentShow;
