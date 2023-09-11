import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { searchOrder, delOrder,orderComplete } from './services';
import { ORDER_OTYPE_MAP } from '@/constants/index';
import { showSuccessToast } from '@/utils/util';
const PAGE_LEN = 100; // 每页个数

interface IState {
  orderList: { [key: string | number]: { total: number; list: Array<object> } };
}

const defaultState: IState = {
  orderList: Array.from(ORDER_OTYPE_MAP.values()).reduce((res, status) => {
    res[status] = { total: 0, list: [] };
    return res;
  }, {}),
};

export default {
  namespace: 'order',
  state: defaultState,
  reducers: {
    init: (state: IState, { payload }) => {
      state = defaultState;
    },
    updateOrderList: (state: IState, { payload }) => {
      state.orderList = { ...state.orderList, ...payload };
    },
  },
  effects: {
    *searchOrder({ params }, { all, call, put }) {
      const res = yield call(searchOrder, params);
      const { total = 0, orders = [] } = res;
      const { otype } = params;
      yield put({ type: 'updateOrderList', payload: { [otype]: { list: orders, total: Number(total) } } });
    },
    *onPage({ params }, { all, call, put, select }) {
      const { otype } = params;
      const orderList = yield select((state) => state.order.orderList);
      const { total, list } = orderList[otype];
      if (total > list.length) {
        // 还未加载完
        const res = yield call(searchOrder, { ...params, offset: list.length + 1, count: PAGE_LEN });
        const { total: resTotal = 0, orders = [] } = res;
        const resList = list.concat(orders);
        yield put({ type: 'updateOrderList', payload: { [otype]: { list: resList, total: Number(resTotal) } } });
        return 
      }
    },
    *delOrder({ params }, { all, call, put }) {
      const { id, otype } = params;
      yield call(delOrder, {id});
      showSuccessToast('删除成功');
      yield put({ type: 'searchOrder', params: {otype} });
    },
    *orderComplete({ params }, { all, call, put }) {
      const { id, otype } = params;
      yield call(orderComplete, {id});
      showSuccessToast('确认成功');
      yield put({ type: 'searchOrder', params: {otype} });
    },
  },
};
