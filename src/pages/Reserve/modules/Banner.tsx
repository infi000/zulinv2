import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import { jyps, sdfh, shwy, zpbz } from '@/static/images/index';
import {getClassifySearch} from '../services';
import { isArray } from 'lodash';
import '../index.scss';


const Banner = () => {
  const handlePageTo = ({id,title}) => {
    Taro.navigateTo({ url: '/pages/SortPage/index?cid=' + id +'&title=' + title});
  };
  const [bannerList,setBannerList]:[any[],any] = useState([]);
  useEffect(()=>{
    getClassifySearch({ctype:1}).then(d=>{
      const arr = isArray(d)?d:[];
      setBannerList(arr);
    })
  },[]);
  return (
    <View className='banner-wrap'>
      <View className='banner-con'>
        <Swiper className='swiper-con' indicatorColor='#999' indicatorActiveColor='#333' circular indicatorDots autoplay>
          {bannerList &&
            bannerList.map((item,index) => {
              const { fpath,id } = item;
              return (
                <SwiperItem key={fpath}>
                  <Image mode='aspectFill' style='width: 100%;height: 100%;border-radius:14px' src={fpath} onClick={()=>{ index!==0 && handlePageTo(item)}} />
                </SwiperItem>
              );
            })}
        </Swiper>
      </View>
      <View className='at-row at-row__justify--between banner-grid' style='margin-top:20px'>
        <View className='at-col at-col-3'>
          <View className='icon-box'>
            <Image style='width:100%;height:100%;' src={zpbz} />
          </View>
          正品保证
        </View>
        <View className='at-col at-col-3'>     <View className='icon-box'>
            <Image style='width:100%;height:100%;' src={jyps} />
          </View>假一赔三</View>
        <View className='at-col at-col-3'>     <View className='icon-box'>
            <Image style='width:100%;height:100%;' src={sdfh} />
          </View>闪电发货</View>
        <View className='at-col at-col-3'>     <View className='icon-box'>
            <Image style='width:100%;height:100%;' src={shwy} />
          </View>售后无忧</View>
      </View>
    </View>
  );
};

export default Banner;
