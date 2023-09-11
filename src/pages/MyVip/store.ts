import { getMyowns, goodsDetail, getPricehistory, getBuyhistory,getSearchmsg, getSearchbuymsg,postAddmsg , postAddbuymsg,getSearchcc, ccDetail} from './services';
const PAGE_LEN = 50;
interface IState {
  //   modal: IModal;
  ccowns: {
    total: number;
    list: Array<{ [key: string]: any }>;
  };
  pageInfo: {
    type: 'list' | 'goods' | 'detail' | 'change' | 'add';
    data: { [key: string]: any };
  };
  goodsDetail: { [key: string]: any };
  pricehistory: {total:number;list:Array<{ [key: string]: any }>};
  buyhistory: {total:number;list:Array<{ [key: string]: any }>};
  commentInfo: {total:number;list:Array<{ [key: string]: any }>};
  BuyInfo: {total:number;list:Array<{ [key: string]: any }>};
  CCInfo: {total:number;list:Array<{ [key: string]: any }>};
}

export const defaultState: IState = {
  ccowns: {
    list: [],
    total: 0,
  },
  pageInfo: {
    type: 'list',
    data: {},
  },
  goodsDetail: {},
  pricehistory:{list:[],total:0},
  buyhistory:{list:[],total:0},
  commentInfo:{list:[],total:0},
  BuyInfo:{list:[],total:0},
  CCInfo:{list:[],total:0}
};

export default {
  namespace: 'myvip',
  state: {...defaultState},
  reducers: {
    init: (state,{payload}) => {
      state =payload
    },
    updatePageInfo: (state, { payload }) => {
      state.pageInfo = payload;
    },
    updateMyowns: (state, { payload }) => {
      const { total, ccowns } = payload;
      state.ccowns = { list: ccowns || [], total: Number(total) };
    },
    updateGoodsDetail: (state, { payload }) => {
      state.goodsDetail = payload;
    },
    updatePricehistory: (state, { payload }) => {
      const { pricedata, total } = payload;
      state.pricehistory = {list:pricedata, total:Number(total)};
    },
    updateBuyhistory: (state, { payload }) => {
      const { pricedata, total } = payload;
      state.buyhistory ={list:pricedata, total:Number(total)};
    },
    updateCommentInfo: (state, { payload }) => {
      const { msgs =[], total } = payload;
      state.commentInfo = {list:msgs, total:Number(total)};
    },
    updateBuyInfo: (state, { payload }) => {
      const { buymsgs = [], total } = payload;
      state.BuyInfo = {list:buymsgs, total:Number(total)};
    },
    updateCCInfo: (state, { payload }) => {
      const { cc = [], total } = payload;
      state.CCInfo = {list:cc, total:Number(total)};
    },
  },
  effects: {
    *getMyowns(_, { all, call, put }) {
      const res = yield call(getMyowns);
      yield put({ type: 'updateMyowns', payload: res });
    },
    *getGoodsDetail(_, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      const res = yield call(goodsDetail, { gid: pageInfo.data.gid });
      // const res = yield call(ccDetail, { ccid: pageInfo.data.id });
      yield put({ type: 'updateGoodsDetail', payload: res });
    },
    *getCCdetial(_, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      const res = yield call(ccDetail, { ccid: pageInfo.data.id });
      yield put({ type: 'updateGoodsDetail', payload: res });
    },
    *getPricehistory(_, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      const res = yield call(getPricehistory, { gid: pageInfo.data.gid, offset: 0, count: PAGE_LEN });
      yield put({ type: 'updatePricehistory', payload: res });
    },
    *getBuyhistory(_, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      const res = yield call(getBuyhistory, { cid: pageInfo.data.cid, offset: 0, count: PAGE_LEN });
      yield put({ type: 'updateBuyhistory', payload: res });
    },
    *getSearchmsg(_, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      const res = yield call(getSearchmsg, { cid: pageInfo.data.cid, offset: 0, count: PAGE_LEN });
      yield put({ type: 'updateCommentInfo', payload: res });
    },
    *getSearchbuymsg(_, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      const res = yield call(getSearchbuymsg, { cid: pageInfo.data.cid, offset: 0, count: PAGE_LEN });
      yield put({ type: 'updateBuyInfo', payload: res });
    },
    *getSearchcc(_, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      const res = yield call(getSearchcc, { cid: pageInfo.data.cid, offset: 0, count: PAGE_LEN });
      yield put({ type: 'updateCCInfo', payload: res });
    },
    *postAddmsg({params}, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      yield call(postAddmsg, { ...params, cid: pageInfo.data.cid });
      yield put({ type: 'getSearchmsg'});
    },
    *postAddbuymsg({params}, { all, call, put, select }) {
      const { pageInfo } = yield select((state) => state.myvip);
      yield call(postAddbuymsg, { ...params, cid: pageInfo.data.cid });
      yield put({ type: 'getSearchbuymsg'});
    },
  },
};
