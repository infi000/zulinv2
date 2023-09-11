import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import '../index.scss';

const MySales = () => {
  return (
    <View className='me-con'>
      <View className='at-row at-row__justify--between me-con-top'>
        <View className='at-col at-col-6 textL'>我的出售</View>
        <View className='at-col at-col-6 textR'>全部订单</View>
      </View>
      <View className='at-row me-con-mid textC'>
        <View className='at-col at-col-3'>出售中</View>
        <View className='at-col at-col-3'>待寄出</View>
        <View className='at-col at-col-3'>已寄出</View>
        <View className='at-col at-col-3'>已退回</View>
      </View>
    </View>
  );
};

export default MySales;
