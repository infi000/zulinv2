import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Checkbox, Block, Image, MovableArea, MovableView, Swiper, SwiperItem } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';

import GoodsBox from './modules/GoodsBox';
import GoodsImg from './modules/GoodsImg';
import './index.scss';
import { isArray } from 'lodash';

const PhotoWall = () => {
    const [current, setCurrent] = useState(0);
    const [currentBg, setCurrentBg] = useState({});
    const [currentGoods, setCurrentGoods] = useState(0);
  const {formatList } = useSelector((state) => state.photoWall);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch({ type: 'photoWall/getInit' });
  }, []);
//   useEffect(() =>{
//     setCurrentBg(formatList[current])
//   },[current])
  return (
    <View className='photo-wrap'>
      <Swiper className='photo-swiper-wrap' indicatorColor='#999' indicatorActiveColor='#333' vertical circular >
        {isArray(formatList) &&
          formatList.length > 0 &&
          formatList.map((item,index) => {
            const { bgPath } = item;
            return (
              <SwiperItem key={index}>
                <View className='image-wrap' style={'background: url(' + bgPath + ');  background-size: auto 100%;background-position: 0 0;background-repeat: no-repeat;'}>
                <GoodsBox info={item} />
                <GoodsImg info={item} /> 
                </View>
              </SwiperItem>
            );
          })}
      </Swiper>
    </View>
  );
};

export default PhotoWall;
       {/* <GoodsBox current={item} />
                    <GoodsImg current={item} /> */}