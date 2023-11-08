/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-07 00:42:57
 * @FilePath: /zulinv2/src/subPackagesMe/UserInfoManage/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { Addchild, getChildren, getConsignmenCategorys, getSearchGoods } from './services';
const PAGE_LEN = 20; // 每页个数

interface IState {
  goodsData: {
    total: string;
    goods: Array<IGoods>;
    offset: number;
  };

  goodsDataParams: ISearchGoodsParams;
  listScroll: boolean; // 废弃
  categorys: any[];
  modal: IModal;
  children:any[]
}

const defaultState: IState = {
  goodsData: { total: '0', goods: [], offset: 0 },
  goodsDataParams: {},
  listScroll: false,
  categorys: [],
  children: [],
  modal: { type: 'create', show: false, data: {} },

};

export default {
  namespace: 'UserInfoManage',
  state: defaultState,
  reducers: {
    updateGoodsDataList: (state: IState, { payload }) => {
      state.goodsData = payload;
    },
    updateGoodsDataParams: (state: IState, { payload }) => {
      state.goodsDataParams = payload;
    },
    updateListScroll: (state: IState, { payload }) => {
      state.listScroll = payload;
    },
    updateCategorys: (state: IState, { payload }) => {
      state.categorys = payload;
    },
    updateModal: (state, { payload }) => {
      state.modal = payload;
    },
    updateChildren: (state, { payload }) => {
      const { total, childrens  } = payload;
      state.children = childrens;
    },
  },
  effects: {
    *getSearchGoods({}, { call, put, select }) {
      const { goodsDataParams } = yield select((state) => state.goodGoods);
      const res = yield call(getSearchGoods, { ...goodsDataParams, count: PAGE_LEN, offset: 0 });
      if (res.goods && isArray(res.goods) && res.goods.length > 0) {
        const { goods } = res;
        const offset = goods.length;
        yield put({ type: 'updateGoodsDataList', payload: { ...res, offset, goods } });
      }
    },
    *getConsignmenCategorys({}, { call, put, select }) {
      const res = yield call(getConsignmenCategorys);
      if (res.categorys && isArray(res.categorys) && res.categorys.length > 0) {
        const { categorys } = res;
        console.log('getConsignmenCategorys', categorys);
     
        yield put({ type: 'updateCategorys', payload:  [...categorys] });
      }
    },
    *getPageGoods({ payload={} }: { payload: { refresh?: boolean } }, { call, put, select }) {
      const { refresh = false } = payload;
      const { goods, total, offset } = yield select((state) => state.goodGoods.goodsData);
      const { goodsDataParams } = yield select((state) => state.goodGoods);
      if (!refresh && offset > 0 && offset === toNumber(total)) {
        return;
      }
      const res = yield call(getSearchGoods, { ...goodsDataParams, offset: refresh ? 0 : offset, count: PAGE_LEN });
      if (res.goods && isArray(res.goods) && res.goods.length > 0) {
        const _goods = goods.concat(res.goods);
        const _offset = _goods.length;
        yield put({ type: 'updateGoodsDataList', payload: { ...res, goods: _goods, offset: _offset } });
      }
    },
    *getChildren(_, { all, call, put }) {
      const res = yield call(getChildren);
      yield put({ type: 'updateChildren', payload: {childrens: res, total: res.length} });
    },
    *Addchild({params}, { all, call, put }) {
      yield call(Addchild,{...params});
      yield put({type:'updateModal', payload: { type: 'create', show: false, data: {} } });
      yield put({ type: 'getChildren'});
    },
  },
};
