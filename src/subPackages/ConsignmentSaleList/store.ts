import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { getAllCtype, getSearchGoods } from './services';
const PAGE_LEN = 20; // 每页个数

interface IState {
  goodsData: {
    total: string;
    goods: Array<IGoods>;
    offset: number;
  };
  goodsDataParams: ISearchGoodsParams;
  listScroll: boolean; // 废弃
}

const defaultState: IState = {
  goodsData: { total: '0', goods: [], offset: 0 },
  goodsDataParams: {},
  listScroll: false,
};

export default {
  namespace: 'ConsignmentSaleList',
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
  },
};
