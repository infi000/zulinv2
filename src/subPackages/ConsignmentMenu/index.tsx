import Taro, { scope, Component, useState, useDidShow, useEffect } from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { getClassifySearch } from './services';
import { isArray } from 'lodash';

import './index.scss';
import List from './modules/List';
import { AtList, AtListItem } from 'taro-ui';

const LIST_URL_MAP = [
  { name: '寄卖列表', url: '/subPackages/Consignment/index' },
  { name: '寄卖售出列表', url: '/subPackages/ConsignmentSaleList/index' },
  { name: '寄卖购买列表', url: '/subPackages/ConsignmentBuyList/index' },
  { name: '发布寄卖', url: '/subPackages/ConsignmentCreate/index' },
]
const ConsignmentMenu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [])
  const handleClickItem = (url) => {
    Taro.navigateTo({ url });
  };
  return (
    <View className='goodgoods-wrap'>
      <AtList>
          {
            LIST_URL_MAP.map((item) => {
              return <AtListItem key={item.name} title={item.name} onClick={() => handleClickItem(item.url)} arrow='right' />
            })
          }

      </AtList>
    </View>
  );
};
export default ConsignmentMenu;
