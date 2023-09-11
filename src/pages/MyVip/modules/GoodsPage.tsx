import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import { View, Block, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';

const { useState } = Taro;

const GoodsPage = () => {
  const { pageInfo } = useSelector((state) => state.myvip);
  const { data } = pageInfo || {};
  const dispatch = useDispatch();
  const handleClick = (type) => {
    dispatch({ type: 'myvip/updatePageInfo', payload: { type, data} });
  }
  return (
    <Block>
      <View className='goodspage-img-wrap'>
        <Image mode='aspectFit' style='width: 100%;height: 100%;' src={data.gpath} />
      </View>
      <View className='goodspage-btn-wrap'>
        <AtButton type='primary' size='small' className='goodspage-btn' onClick={() => handleClick('detail')}>
          详情
        </AtButton>
        <AtButton type='primary' size='small' className='goodspage-btn' onClick={() => handleClick('add')}>
          添加信息
        </AtButton>
        <AtButton type='primary' size='small' className='goodspage-btn' onClick={() => handleClick('change')}>
          变更归属
        </AtButton>
      </View>
    </Block>
  );
};

export default GoodsPage;
