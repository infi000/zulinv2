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
const GoodsShow = () => {
  const { isShowBuysPage,detail } = useSelector((state) => state.goodsShow);
  const dispatch = useDispatch();
  const router = useRouter();
  useDidShow(() => {
    dispatch({ type: 'goodsShow/init' });
    const { params } = router;
    const {gid,title} = params;
    dispatch({ type: 'goodsShow/updateGid', payload: gid });
    dispatch({ type: 'goodsShow/getDetail' });
    dispatch({ type: 'goodsShow/getPageBuysRecord', payload: { refresh: true } });
    dispatch({ type: 'goodsShow/getRelatedGoods' });
    dispatch({ type: 'goodsShow/getIsfav' });
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
      path: '/pages/GoodsShow/index?gid=' + gid + '&title=' + title ,
      // imageUrl
    }
  })
  useEffect(() => {
    return () => {
      dispatch({ type: 'goodsShow/init' });

    };
  }, []);
  return <View>{isShowBuysPage ? <BuysRecord /> : <GoodsDetail />}</View>;
};

export default GoodsShow;
