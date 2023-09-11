import Taro, { useEffect } from '@tarojs/taro';
import { AtButton, AtCard, AtTabs, AtTabsPane } from 'taro-ui';
import { View, Block, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';

const { useState } = Taro;

const Chuan = () => {
  const { CCInfo } = useSelector((state) => state.myvip);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'myvip/getSearchcc' });
  }, []);
  return (
    <Block>
      {CCInfo.total > 0 &&
        CCInfo.list.map((item) => {
          return (
            <View className='cc-box' key={item.id}>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>时间</View>
                <View className='at-col at-col-1 at-col--auto cc-desc'>{item.ctime || '未知'}</View>
              </View>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>地点</View>
                <View className='at-col at-col-1 at-col--auto cc-desc'>{item.buyaddress || '未知'}</View>
              </View>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>收藏人</View>
                <View className='at-col at-col-1 at-col--auto cc-desc'>{item.nickname || '未知'}</View>
              </View>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>购买者</View>
                <View className='at-col at-col-1 at-col--auto cc-desc'>{item.buynickname || '未知'}</View>
              </View>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>购买者电话</View>
                <View className='at-col at-col-1 at-col--auto cc-desc'>{item.buyphone || '未知'}</View>
              </View>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>购买价格</View>
                <View className='at-col at-col-1 at-col--auto cc-desc'>{item.price || '未知'}</View>
              </View>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>转账图片 </View>
                <Image  mode='widthFix' lazyLoad style='width: 100%;height: 100%;float:left' src={item.paypic} />
              </View>
              <View className='at-row cc-line'>
                <View className='at-col cc-tag'>发票图片 </View>
                <Image  mode='widthFix' lazyLoad style='width: 100%;height: 100%;float:left' src={item.billpic} />
              </View>
              {/* <View className='at-row cc-line'>
                <View className='at-col cc-tag'>其它 </View>
                <Image  mode='widthFix' lazyLoad style='width: 100%;height: 100%;float:left' src={item.billpic} />
              </View> */}
            </View>
          );
        })}
    </Block>
  );
};

export default Chuan;
