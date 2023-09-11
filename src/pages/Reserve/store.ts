import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { getAllCtype, getSearchExperiments } from './services';
const PAGE_LEN = 20; // 每页个数

interface IState {
  allCtypeList: Array<{ ctype: string }>;
  experimentsData: {
    total: string;
    experiments: Array<IGoods>;
    offset: number;
  };
  experimentsDataParams: ISearchGoodsParams;
  listScroll: boolean; // 废弃
}

const defaultState: IState = {
  allCtypeList: [],
  experimentsData: { total: '0', experiments: [], offset: 0 },
  experimentsDataParams: {},
  listScroll: false,
};

export default {
  namespace: 'reserve',
  state: defaultState,
  reducers: {
    updateAllCtypeList: (state: IState, { payload }) => {
      state.allCtypeList = payload;
    },
    updateExperimentsDataList: (state: IState, { payload }) => {
      state.experimentsData = payload;
    },
    updateExperimentsDataParams: (state: IState, { payload }) => {
      state.experimentsDataParams = payload;
    },
    updateListScroll: (state: IState, { payload }) => {
      state.listScroll = payload;
    },
  },
  effects: {
    *getAllCtype(_, { all, call, put }) {
      const res = yield call(getAllCtype);
      yield put({ type: 'updateAllCtypeList', payload: res });
    },
    *getSearchExperiments({}, { call, put, select }) {
      const { experimentsDataParams } = yield select((state) => state.reserve);
      const res = yield call(getSearchExperiments, { ...experimentsDataParams, count: PAGE_LEN, offset: 0 });
      if (res.experiments && isArray(res.experiments) && res.experiments.length > 0) {
        const { experiments } = res;
        const offset = experiments.length;
        yield put({ type: 'updateExperimentsDataList', payload: { ...res, offset, experiments } });
      }
    },
    *getPageExperiments({ payload={} }: { payload: { refresh?: boolean } }, { call, put, select }) {
      const { refresh = false } = payload;
      const { experiments, total, offset } = yield select((state) => state.reserve.experimentsData);
      const { experimentsDataParams } = yield select((state) => state.reserve);
      if (!refresh && offset > 0 && offset === toNumber(total)) {
        return;
      }
      const res = yield call(getSearchExperiments, { ...experimentsDataParams, offset: refresh ? 0 : offset, count: PAGE_LEN });
      if (res.experiments && isArray(res.experiments) && res.experiments.length > 0) {
        const _experiments = experiments.concat(res.experiments);
        const _offset = _experiments.length;
        yield put({ type: 'updateExperimentsDataList', payload: { ...res, experiments: _experiments, offset: _offset } });
      }
    },
  },
};
