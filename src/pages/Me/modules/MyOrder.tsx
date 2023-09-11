import Taro  from '@tarojs/taro';
import { View } from '@tarojs/components';
import '../index.scss';


const MyOrder = () => {
  const handleToOrder = (status) =>{
    Taro.navigateTo({ url:'/pages/Order/index?status='+status});
  }
  return (
    <View className='me-con'>
      <View className='at-row at-row__justify--between me-con-top'>
        <View className='at-col at-col-6 textL'>我的订单</View>
        <View className='at-col at-col-6 textR' onClick={()=>handleToOrder('全部订单')}>全部订单</View>
      </View>
      <View className='at-row me-con-mid textC'>
        <View className='at-col at-col-3' onClick={()=>handleToOrder('待付款')}>待付款</View>
        <View className='at-col at-col-3' onClick={()=>handleToOrder('待发货')}>待发货</View>
        <View className='at-col at-col-3' onClick={()=>handleToOrder('待收货')}>待收货</View>
        <View className='at-col at-col-3' onClick={()=>handleToOrder('交易完成')}>交易完成</View>
      </View>
    </View>
  );
};

export default MyOrder;
