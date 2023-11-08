/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-25 13:18:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-09 00:02:43
 * @FilePath: /zulinv2/src/pages/BuyPage/modules/Addr.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import '../index.scss';

interface IProp {
  defaultAddr: false | any;
}
const Addr = (props: IProp) => {
  const { defaultAddr } = props;
  const handleGoTo = () => {
    Taro.navigateTo({ url: '/pages/Address/index?from=buyPage' });
  };
  return (
    <View>
      {defaultAddr ? (
        <View className='address-wrap'>
          <View className='address-con'>
            <View className='at-row address-con-top'>
              <View className='at-col at-col-1 at-col--auto'>{defaultAddr.realname}</View>
              <View className='at-col'>{defaultAddr.cellphone}</View>
            </View>
            <View className='at-row  address-con-mid'>
              <View className='at-col-12'>
                <Text className='addr-text'> {defaultAddr.province}</Text>
                <Text className='addr-text'> {defaultAddr.city}</Text>
                <Text className='addr-text'> {defaultAddr.area}</Text>
                <Text className='addr-text'> {defaultAddr.address}</Text>
              </View>
            </View>
          </View>
          <View className='address-btn-con'>
            <View className='address-edit-btn' onClick={handleGoTo}>
              编辑
            </View>
          </View>
        </View>
      ) : (
        <View className='no-address-con'>
          <View className='no-address-text'>
            默认到店自取或
            <Text className='no-address-edit' onClick={handleGoTo}>
              点击编辑收货地址
            </Text>
          </View>
         
        </View>
      )}
    </View>
  );
};

export default Addr;
