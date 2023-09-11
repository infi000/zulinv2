import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import MyAvatar from './modules/MyAvatar';
import MyOrder from './modules/MyOrder';
import MySales from './modules/MySales';
import Others from './modules/Others';
import './index.scss';

const Me = () => {
  return (
    <View className='me-wrap'>
      <MyAvatar />
      <View className='order-sales-con'>
        <MyOrder />
        {/* <MySales /> */}
      </View>
      <Others />
    </View>
  );
};

export default Me;
