import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

const UnPay = () => {
  return (
    <View className='sold-out-wrap'>
      <View className='sold-out-con'>
        <View>
          <View className='line1'>手续费</View>
          <View className='line2'>未支付</View>
        </View>
      </View>
    </View>
  );
};
export default UnPay;
