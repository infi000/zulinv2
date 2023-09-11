import Taro, { scope, Component, useState, useDidShow, useEffect } from '@tarojs/taro';
import { View, Block, ScrollView, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import SearchBar from './modules/SearchBar';
import Area from './modules/Area2';
import Banner from './modules/Banner';
import List from './modules/List';
import TagBar from './modules/TagBar';
import { getClassifySearch } from './services';
import { isArray } from 'lodash';

import './index.scss';

const GoodGoods = () => {
  const [tagBarStyle, setTagBarStyle]: [null | object, Function] = useState(null);
  const dispatch = useDispatch();
  const [areaList, setAreaList]: [any[], any] = useState([]);
  const { experimentsData } = useSelector((state) => state.reserve);
  const onScroll = (e) => {
    // const scrollHight = Math.ceil(areaList.length/2) * 140;
    // const baseH = 250
    // if (e.target.scrollTop >= scrollHight+baseH) {
    //   if (!tagBarStyle) {
    //     setTagBarStyle({
    //       position: 'fixed',
    //       top: 0,
    //       zIndex: 10,
    //       boxShadow: ' 1rpx 1rpx 10rpx #ccc',
    //       width: '100%',
    //       marginBottom: 0,
    //     });
    //   }
    // } else {
    //   if (tagBarStyle) {
    //     setTagBarStyle(null);
    //   }
    // }
  };

  const handleGoto = (item) => {
    Taro.navigateTo({ url: '/pages/LeaseDetail/index?eid='+ item.id });
  }
  const onScrollToLower = (e) => {
    console.log("onScrollToLoweronScrollToLoweronScrollToLower");
    dispatch({ type: 'reserve/getPageExperiments'});
  }
  useEffect(() => {
    dispatch({ type: 'reserve/getSearchExperiments' });
  }, [dispatch]);
  console.log('experimentsData' , experimentsData.experiments);
  return (
    <View className='reserve-wrap'>
      <ScrollView scrollY scrollWithAnimation style={{ height: '100%', marginBottom: '500px' }} onScroll={onScroll} onScrollToLower={onScrollToLower}>
       {
         experimentsData.experiments.map(item => <View onClick={() => handleGoto(item)}>
           {/* <View className='reserve-img-con'> */}
           <Image
             style='width: 100%;background: #fff;'
             src={item.thumbinal}
             mode='widthFix'
           />
           {/* </View> */}
         
           <View className='reserve-list-title'>实验项目名称:{ item.title}  </View>
           </View>
           )
       }
      </ScrollView>
    </View>
  );
};
export default GoodGoods;
