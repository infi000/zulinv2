import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Checkbox, Block, Image, MovableArea, MovableView, Swiper, SwiperItem } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';

import '../index.scss';
import { isArray } from 'lodash';

const GoodsBox = (props:any) => {
const { info } = props;
  return (
    <View className='goods-boxs'>
        {info.title}
    </View>
  );
};

export default GoodsBox;
