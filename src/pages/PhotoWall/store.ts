import { searchDynamic, getBgs } from './services';
import { isArray } from 'lodash';
const COUNT = 10;
interface IState {
  wallList: any[];
  formatList: any[];
  wallBgList: any[];
  Total: number;
}

export const defaultState: IState = {
  wallList: [],
  wallBgList: [],
  Total: 0,
  formatList:[]
};

export default {
  namespace: 'photoWall',
  state: { ...defaultState },
  reducers: {
    init: (state, { payload }) => {
      state = payload;
    },
    updateWallBgList: (state, { payload }) => {
      state.wallBgList = payload;
    },
    updateWallList: (state, { payload }) => {
      state.wallList = payload.dynamicshows;
      state.wallListBgTotal = payload.total;
    },
    updateFormatList:( state,{payload}) =>{
      state.formatList = payload;
    },
    updateTotal:( state,{payload}) =>{
      state.Total = payload.total;
    }
  },
  effects: {
    *searchDynamic(_, { all, call, put, select }) {
      const res = yield call(searchDynamic);
      yield put({ type: 'updateWallList', payload: res });

    },
    *getBgs(_, { all, call, put, select }) {
      const res = yield call(getBgs);
      yield put({ type: 'updateWallBgList', payload: res });
    },
    *getInit(_, { all, call, put, select }) {
      const res = yield call(searchDynamic);
      const bgList = yield call(getBgs) || [];
      const goodsList = res.dynamicshows || [];
      const total = res.total || 0;
      goodsList.map(()=>{})
      const tem =goodsList.map((item) => {
        const { id, title, goodid, fpath, sort, createtime, bgrela } = item;
        const _bgrela = bgrela||[];
        const formatBgRela = _bgrela.map((opt) => {
          return { ...opt, title, goodid, fpath, sort, createtime, did:id };
        });
        return formatBgRela;
      });
      const _formatGoodsList = tem.reduce((res,item:{}[] ) => {
            if(isArray(item) && item.length>0){
              item.forEach(ele => {
                res.push(ele)
              })
            }
            return res;
      },[])
      const formatGoodsList = _formatGoodsList.map(item => {
        const ele =  bgList.find(opt => opt.id === item.bgid );
        if(ele){
          const bgPath = ele.fpath;
          const bgWidth = ele.width;
          const  bgHeight = ele.height;
          item = {...item,bgPath,bgWidth,bgHeight }
        }
        return item;
      })
      yield put({ type: 'updateFormatList', payload: formatGoodsList });
      yield put({ type: 'updateTotal', payload: total });

    },
  },
};
