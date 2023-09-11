import Taro, { scope, Component, useState, useDidShow, useEffect } from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { getClassifySearch } from './services';
import { isArray } from 'lodash';

import './index.scss';
import List from './modules/List';

const ConsignmentBuyList = () => {
  const dispatch = useDispatch();

  const onScrollToLower = (e) => {
    console.log("onScrollToLoweronScrollToLoweronScrollToLower");
    dispatch({ type: 'ConsignmentBuyList/getPageGoods'});
  }
  useEffect(() => {
    dispatch({ type: 'ConsignmentBuyList/getSearchGoods' });
  },[])
  return (
    <View className='goodgoods-wrap'>
      <ScrollView scrollY scrollWithAnimation style={{ height: '100%' }} onScrollToLower={onScrollToLower}>
          <List />
      </ScrollView>
    </View>
  );
};
export default ConsignmentBuyList;
