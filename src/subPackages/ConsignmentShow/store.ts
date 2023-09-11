import delay from '@/utils/delay';
import { isArray, toNumber, cloneDeep } from 'lodash';
import { getDetail, getRelatedGoods, getBuysRecord, getIsfav, getFav, getUnfav, payQuery, payex,createOrder, getMyAddress } from './services';
import Taro from '@tarojs/taro';
import { showToast, showSuccessToast } from '@/utils/util';

const PAGE_LEN = 100;

interface IState {
  jgid?: string
  orderid?: string
  isSelf?: boolean
  detail: TObj<any>
  buysRecordList: { buys: Array<TObj<any>>; total: string; offset: number }
  relatedGoods: Array<TObj<any>>
  isShowBuysPage: boolean
  isfav: 0 | 1
}

const defaultState: IState = {
  jgid: '',
  orderid: '',
  isSelf: false,
  detail: {},
  buysRecordList: { buys: [], total: '0', offset: 0 },
  relatedGoods: [],
  isShowBuysPage: false,
  isfav: 0,
};

export default {
  namespace: 'ConsignmentShow',
  state: defaultState,
  reducers: {
    // init:(state: IState ) => {
    //   state = defaultState;
    // },
    updateIsShowBuysPaget: (state: IState, { payload }) => {
      state.isShowBuysPage = payload;
    },
    updateGid: (state, { payload }) => {
      state.jgid = payload;
    },
    updateOrderid: (state, { payload }) => {
      state.orderid = payload;
    },
    updateDetail: (state, { payload }) => {
      state.detail = payload;
    },
    updateIsSelf: (state, { payload }) => {
      state.isSelf = payload;
    },
    updateRelatedGoods: (state, { payload }) => {
      state.relatedGoods = payload;
    },
    updateBuysRecordList: (state, { payload }) => {
      state.buysRecordList = payload;
    },
    updateIsfav: (state, { payload }) => {
      state.isfav = payload;
    },
  },
  effects: {
    *init({ }, { all, call, put, select }) {
      yield put({ type: 'updateIsShowBuysPaget', payload: false });
      yield put({ type: 'updateGid', payload: '' });
      yield put({ type: 'updateDetail', payload: {} });
      yield put({ type: 'updateRelatedGoods', payload: [] });
      yield put({ type: 'updateBuysRecordList', payload: { buys: [], total: '0', offset: 0 } });
      yield put({ type: 'updateIsfav', payload: 0 });
    },
    *getDetail({}: { payload: { gid: string } }, { all, call, put, select }) {
      const { jgid } = yield select((state) => state.ConsignmentShow);
      const res = yield call(getDetail, { jgid });
      yield put({ type: 'updateDetail', payload: res });
    },
    *getRelatedGoods({}: { payload: { gid: string } }, { all, call, put, select }) {
      const { gid } = yield select((state) => state.ConsignmentShow);
      const res = yield call(getRelatedGoods, { gid });
      yield put({ type: 'updateRelatedGoods', payload: res });
    },
    *getPageBuysRecord({ payload = {} }: { payload: { refresh?: boolean } }, { all, call, put, select }) {
      const { refresh = false } = payload;
      const { gid, buysRecordList = {} } = yield select((state) => state.ConsignmentShow);
      const { offset, total, buys = [] } = buysRecordList;
      if (!refresh && offset > 0 && offset === toNumber(total)) {
        return;
      }
      const res = yield call(getBuysRecord, { gid, count: PAGE_LEN, offset: refresh ? 0 : offset });
      if (res.buys && isArray(res.buys) && res.buys.length > 0) {
        const _buys = buys.concat(res.buys);
        const _offset = _buys.length;
        yield put({ type: 'updateBuysRecordList', payload: { ...res, buys: _buys, offset: _offset } });
      }
    },
    *getIsfav({}, { all, call, put, select }) {
      const { gid } = yield select((state) => state.ConsignmentShow);
      const res = yield call(getIsfav, { gid });
      yield put({ type: 'updateIsfav', payload: Number(res) });
    },
    *getFav({}, { all, call, put, select }) {
      const { gid } = yield select((state) => state.ConsignmentShow);
      yield call(getFav, { gid });
      yield put({ type: 'getIsfav' });
    },
    *getUnfav({}, { all, call, put, select }) {
      const { gid } = yield select((state) => state.ConsignmentShow);
      yield call(getUnfav, { gids:gid });
      yield put({ type: 'getIsfav' });
    },
    *createOrder({}, { all, call, put, select }) {
      const { gid,detail } = yield select((state) => state.ConsignmentShow);
      const { size, price } =detail;
      // const {addresses} = yield call(getMyAddress);
      const { orderid } = yield call(createOrder, { "id[]":gid,'sort[]':`1`,'sel[]':`1`,'parameters[]':`${size}`,'price[]':price,'num[]':'1' });
      Taro.navigateTo({ url:'/pages/BuyPage/index?orderid=' + orderid });
    },
    *createPicketOrder({params}: {params: {price: string;dates: string;times: string; num: number}}, { all, call, put, select }) {
      const { gid,detail } = yield select((state) => state.ConsignmentShow);
      const { dates, price, times, num } = params;
      const { size } =detail;
      // const {addresses} = yield call(getMyAddress);
      const { orderid } = yield call(createOrder, { "id[]":gid,'sort[]':`1`,'sel[]':`1`,'parameters[]':`${dates}_${times}`,'price[]':price,'num[]':num });
      Taro.navigateTo({ url:'/pages/BuyPage/index?orderid=' + orderid });
    },
    *payex({}, { all, call, put, select }) {
      const { gid } = yield select((state) => state.ConsignmentShow);
      yield call(payex, { gids:gid });
      yield put({ type: 'getIsfav' });
    },
  },
};

// order: "J8126730434670760780"
// paytype: "miniwxpay"
// return: "https://www.tangguostore.com/index.php/MiniApi/Public/miniwxpaynotify/rmethod/return.html"