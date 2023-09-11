import Taro, { scope, Component, useState, useDidShow, useEffect } from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import SearchBar from './modules/SearchBar';
import Area from './modules/Area3';
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
  const onScroll = (e) => {
    const scrollHight = Math.ceil(areaList.length/2) * 140;
    const baseH = 250
    if (e.target.scrollTop >= scrollHight+baseH) {
      if (!tagBarStyle) {
        setTagBarStyle({
          position: 'fixed',
          top: 0,
          zIndex: 10,
          boxShadow: ' 1rpx 1rpx 10rpx #ccc',
          width: '100%',
          marginBottom: 0,
        });
      }
    } else {
      if (tagBarStyle) {
        setTagBarStyle(null);
      }
    }
  };
  const onScrollToLower = (e) => {
    console.log("onScrollToLoweronScrollToLoweronScrollToLower");
    dispatch({ type: 'goodGoods/getPageGoods'});
  }
  useEffect(() => {
    getClassifySearch({ ctype: 2 }).then((d) => {
      const arr = isArray(d) ? d : [];
      setAreaList(arr);
    });
  }, []);
  console.log('areaList', areaList);
  return (
    <View className='goodgoods-wrap'>
      <ScrollView scrollY={true} scrollWithAnimation style={{ height: '100%' }} onScroll={onScroll} onScrollToLower={onScrollToLower}>
        <SearchBar />
        <Banner />
        <Area areaList={areaList}/>
        <TagBar style={tagBarStyle} />
        <List />
      </ScrollView>
    </View>
  );
};
export default GoodGoods;
