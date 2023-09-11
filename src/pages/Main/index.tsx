/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-09-04 23:44:20
 * @FilePath: /zulin/src/pages/Main/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { getWindowHeight } from '@/utils/app';
import Tabbar from '@/components/Tabbar';
import Me from '@/pages/Me';
import GoodGoods from '@/pages/GoodGoods';
import ShequList from '@/pages/Community';
import Reserve from '@/pages/Reserve';
import ShowYe from '@/pages/Index';
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
      title: '西塔科学探索俱乐部',
      path: '/pages/Main/index'
    }
  })

  return (
    <View className='page-wrap'>
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.me && <Me />}
      {/* {nav[currentNavIndex].type == ROUTER_NAME_MAP.goodGoods && <GoodGoods />} */}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.index && <ShowYe />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.community && <ShequList />}
      {nav[currentNavIndex].type == ROUTER_NAME_MAP.reserve && <Reserve />}
      <Tabbar />
    </View>
  );
};

export default Main;
