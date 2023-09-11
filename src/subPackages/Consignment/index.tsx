import Taro, { scope, Component, useState, useDidShow, useEffect } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { getClassifySearch } from './services';
import { isArray } from 'lodash';

import './index.scss';
import List from './modules/List';
import { AtFab } from 'taro-ui';
import { csend } from '@/static/images';

const Consignment = () => {
  const dispatch = useDispatch();

  const onScrollToLower = (e) => {
    console.log("onScrollToLoweronScrollToLoweronScrollToLower");
    dispatch({ type: 'Consignment/getPageGoods'});
  }
  const pageTo = () => {
    Taro.navigateTo({ url: '/subPackages/ConsignmentCreate/index'})
  }
  useEffect(() => {
    dispatch({ type: 'Consignment/getSearchGoods' });
  },[])
  return (
    <View className='goodgoods-wrap'>
      <ScrollView scrollY scrollWithAnimation style={{ height: '100%' }} onScrollToLower={onScrollToLower}>
          <List />
      </ScrollView>
      <View className='fab-btn'>
        <AtFab onClick={pageTo}>
          {/* <Text className='at-fab__icon at-icon at-icon-add'></Text> */}
          <Image src={csend} style={"width:30px;height:31px"}></Image>
        </AtFab>
      </View>
    </View>
  );
};
export default Consignment;
