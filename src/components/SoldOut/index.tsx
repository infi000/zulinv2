import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

const SoldOut = () => {
  return (
    <View className='sold-out-wrap'>
      <View className='sold-out-con'>
        <View>
          <View className='line1'>已售完</View>
          <View className='line2'>SOLD OUT</View>
        </View>
      </View>
    </View>
  );
};
export default SoldOut;
