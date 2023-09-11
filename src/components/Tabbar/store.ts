import delay from '@/utils/delay';
// import { liwu, liwu_s, wode, wode_s } from '@/static/images';
import {shop,shop_s, community,community_s, yue, yue_s, me, me_s } from '@/static/images';
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
        selectedImage: shop_s,
      },
      {
        title: '社区',
        type: ROUTER_NAME_MAP.community,
        image: community,
        selectedImage: community_s,
      },
      {
        title: '预约',
        type: ROUTER_NAME_MAP.reserve,
        image: yue,
        selectedImage: yue_s,
      },
      {
        title: '我的',
        type: ROUTER_NAME_MAP.me,
        image: me,
        selectedImage: me_s,
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
