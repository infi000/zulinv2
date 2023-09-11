import delay from '@/utils/delay';
import { cloneDeep } from 'lodash';
import { getMyAddress, setDefaultMyAddress,delMyAddress, saveAddress } from './services';
interface IState {
  searchCondition: TObj<any>;
  modal: IModal;
  address: {
    total: number;
    list: Array<{
      id: string;
      cellphone: string;
      province: string;
      city: string;
      area: string;
      address: string;
      realname: string;
      status: string;
    }>;
  };
}

const defaultState: IState = {
  address: {
    list: [],
    total: 0,
  },
  searchCondition: { name: '', phone: '' },
  modal: { type: 'create', show: false, data: {} },
};

export default {
  namespace: 'address',
  state: defaultState,
  reducers: {
    updateModal: (state, { payload }) => {
      state.modal = payload;
    },
    updateSearchCondition: (state, { payload }) => {
      const searchCondition = cloneDeep(state.searchCondition);
      state.searchCondition = { ...searchCondition, ...payload };
    },
    updateAddress: (state, { payload }) => {
      const { total, addresses  } = payload;
      state.address = { list: addresses || [], total: Number(total) };
    },
  },
  effects: {
    *getAddress(_, { all, call, put }) {
      const res = yield call(getMyAddress);
      yield put({ type: 'updateAddress', payload: res });
    },
    *setDefaultMyAddress({params}, { all, call, put }) {
      const { id } = params;
      try {
        yield call(setDefaultMyAddress,{id,status:1});
        yield put({ type: 'getAddress'});
      } catch (error) {
        console.log(error);
      }
    
    },
    *delMyAddress({params}, { all, call, put }) {
      const { id } = params;
      yield call(delMyAddress,{id});
      yield put({ type: 'getAddress'});
    },
    *saveAddress({params}, { all, call, put }) {
      yield call(saveAddress,{...params});
      yield put({type:'updateModal', payload: { type: 'create', show: false, data: {} } });
      yield put({ type: 'getAddress'});
    },
  },
};
