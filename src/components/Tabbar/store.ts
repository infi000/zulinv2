/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-03 23:50:25
 * @FilePath: /zulinv2/src/components/Tabbar/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import delay from '@/utils/delay';
// import { liwu, liwu_s, wode, wode_s } from '@/static/images';
import {shop,yue, me } from '@/static/images';
import { ROUTER_NAME_MAP } from '@/constants/index';

export default {
  namespace: 'tabbar',
  state: {
    nav: [
      {
        title: '首页',
        // type: ROUTER_NAME_MAP.goodGoods,
        type: ROUTER_NAME_MAP.index,
        image: shop,
        selectedImage: shop,
      },
      // {
      //   title: '社区',
      //   type: ROUTER_NAME_MAP.community,
      //   image: community,
      //   selectedImage: community_s,
      // },
      {
        title: '预约',
        type: ROUTER_NAME_MAP.reserve,
        image: yue,
        selectedImage: yue,
      },
      {
        title: '我的',
        type: ROUTER_NAME_MAP.me,
        image: me,
        selectedImage: me,
      },
    ],
    currentNavIndex: 0,
  },
  reducers: {
    updateNav: (state, { payload }) => {
      state.nav = payload;
    },
    updateCurrentNavIndex: (state, { payload }) => {
      state.currentNavIndex = payload;
    },
  },
  effects: {
    *asyncAdd(_, { all, call, put }) {
      yield call(delay, 2000); //增加延迟测试效果

      yield put({ type: 'add' });
    },
  },
};
