/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-22 09:49:19
 * @FilePath: /zulin/src/pages/Main/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { getWindowHeight } from '@/utils/app';
import Tabbar from '@/components/Tabbar';
import Me from '@/pages/Me';
import Paidui from '@/pages/Paidui';
import Goupiao from '@/pages/Goupiao';
// import ShequList from '@/pages/Community';
import Reserve from '@/pages/Reserve';
import ShowYe from '@/pages/Index';
import Order from '@/pages/Order';
import { ROUTER_NAME_MAP } from '@/constants/index';
import './index.scss';

const Main = (props) => {
  const { nav, currentNavIndex } = useSelector((state) => state.tabbar);
  useShareAppMessage(res => {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    return {
      title: '小火车',
      path: '/pages/Main/index'
    }
  })
console.log('nav[currentNavIndex].type', nav[currentNavIndex].type);
  return (
    <View className='page-wrap'>
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.me && <Me />}
      {/* {nav[currentNavIndex].type == ROUTER_NAME_MAP.goodGoods && <GoodGoods />} */}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.index && <ShowYe />}
      {/* {nav[currentNavIndex].type == ROUTER_NAME_MAP.community && <ShequList />} */}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.paidui && <Paidui />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.reserve && <Reserve />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.goupiao && <Goupiao />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.order && <Order />}
      <Tabbar />
    </View>
  );
};

export default Main;
