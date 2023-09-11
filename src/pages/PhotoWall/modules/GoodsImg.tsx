import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Checkbox, Block, Image, MovableArea, MovableView, Swiper, SwiperItem } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { getWindowHeight } from '@/utils/app';
import '../index.scss';
import { isArray } from 'lodash';
// const query = Taro.createSelectorQuery()

const GoodsImg = (props: any) => {
  const { info } = props;
  const { bgHeight, bgWidth, sheight, swidth, goodid, stop, sleft } = info || {};
  // const [wrapH,setWrapH] = useState(0);
  const [positionInfo, setPositionInfo] = useState({ imgHeight: 0, imgWidth: 0, top: 0, left: 0 });
  // const { windowWidth,pixelRatio } = Taro.getSystemInfoSync();
  // const wHight = getWindowHeight();

  // const xs = bgHeight / bgWidth;
  // const imgHeight = xs * sheight;
  // const imgWidth = xs * swidth;
  // const top = xs * stop;
  // const left = xs * sleft;
  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/GoodsShow/index?gid=' + goodid });
  };
  useEffect(() => {
    Taro.createSelectorQuery()
      .select('.image-wrap')
      .boundingClientRect((rec) => {
        const { height } = rec;
        const xs = height/  bgHeight;
        const imgHeight = xs * sheight;
        const imgWidth = xs * swidth;
       const top = xs * stop;
        const left = xs * sleft;
        setPositionInfo({
          imgHeight,
          imgWidth,
          top,
          left,
        });
      })
      .exec();
  }, []);

  return (
    <View className='goods-img' style={`top:${positionInfo.top}px;left:${positionInfo.left}px`}>
      <Image src={info.fpath} id='tes' style={`height:${positionInfo.imgHeight}px;width:${positionInfo.imgWidth}px`} onClick={handleClick} />
    </View>
  );
};

export default GoodsImg;
