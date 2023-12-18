/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-11-14 23:17:04
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-14 23:41:12
 * @FilePath: /zulinv2/src/pages/CheckedList/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { searchOrder, delOrder,orderComplete, getCardCheckedList, getPicketCheckedList } from './services';
import { ORDER_OTYPE_MAP } from '@/constants/index';
import { showSuccessToast } from '@/utils/util';
const PAGE_LEN = 100; // 每页个数

interface IState {
  orderList: { [key: string | number]: { total: number; list: Array<object> } };
  list: { [key: string | number]: { total: number; list: Array<object> } };
}

const defaultState: IState = {
  orderList: Array.from(ORDER_OTYPE_MAP.values()).reduce((res, status) => {
    res[status] = { total: 0, list: [] };
    return res;
  }, {}),
  list: {
    card: { total: 0, list: [] },
    picket: { total: 0, list: [] }
  }
};

export default {
  namespace: 'CheckedList',
  state: defaultState,
  reducers: {
    init: (state: IState, { payload }) => {
      state = defaultState;
    },
    updateOrderList: (state: IState, { payload }) => {
      state.orderList = { ...state.orderList, ...payload };
    },
    updateList: (state: IState, { payload }) => {
      state.orderList = { ...state.list, ...payload };
    },
  },
  effects: {
    *searchOrder({ params }, { all, call, put }) {
      const res = yield call(searchOrder, params);
      const { total = 0, orders = [] } = res;
      const { otype } = params;
      yield put({ type: 'updateOrderList', payload: { [otype]: { list: orders, total: Number(total) } } });
    },
    *searchCheckedList({ params }, { all, call, put }) {
      const { type } = params;
      let fn = getCardCheckedList;
      let key = 'cardsused';
      if(type === 'card'){
        fn = getCardCheckedList;
        key = 'cardsused';
      }
      if(type === 'picket'){
        fn = getPicketCheckedList;
        key = 'picketused';
      }
      const res = yield call(fn, params);
      const list = res[key];
      const total = res.length || 0;
      yield put({ type: 'updateList', payload: { [type]: { list, total } } });
    },
    *onPage({ params }, { all, call, put, select }) {
      const { type } = params;
      let fn = getCardCheckedList;
      let key = 'cardsused';
      if(type === 'card'){
        fn = getCardCheckedList;
        key = 'cardsused';
      }
      if(type === 'picket'){
        fn = getPicketCheckedList;
        key = 'picketused';
      }
      const checkedList = yield select((state) => state.CheckedList.list);
      const { total, list } = checkedList[type];
      if (total > list.length) {
        // 还未加载完
        const res = yield call(fn, { ...params, offset: list.length + 1, count: PAGE_LEN });
        const checkedList = res[key];
        const resTotal = res.length || 0;
        const resList = list.concat(checkedList);
        yield put({ type: 'updateList', payload: { [type]: { list: resList, total: Number(resTotal) } } });
        return 
      }
    },
    *onPage2({ params }, { all, call, put, select }) {
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
