import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { getExperimentDetailService } from './services';
const PAGE_LEN = 20; // 每页个数

interface IState {
  experimentsDetail: any;

}

const defaultState: IState = {
  experimentsDetail: {},
};

export default {
  namespace: 'lease',
  state: defaultState,
  reducers: {

    updateExperimentsDetail: (state: IState, { payload }) => {
      state.experimentsDetail = payload;
    },
  },
  effects: {
    *getExperimentDetail(_, { all, call, put }) {
      const { payload } = _;
      const res = yield call(getExperimentDetailService, { ...payload});
      console.log("asadasdasdas",res);
      yield put({ type: 'updateExperimentsDetail', payload: res });
    },

  },
};
