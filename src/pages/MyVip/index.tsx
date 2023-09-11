import Taro, { useEffect, useMemo } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import GoodsList from './modules/List';
import GoodsPage from './modules/GoodsPage';
import GoodsDetail from './modules/GoodsDetail';
import GoodsChange from './modules/GoodsChange';
import GoodsAdd from './modules/GoodsAdd';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';

const MyVip = () => {
  const { pageInfo } = useSelector((state) => state.myvip);
  const { type } = pageInfo || {};
  const dispatch = useDispatch();
  // useInitialValue('myvip', dispatch);
  useEffect(() => {
    return () => {
      dispatch({ type: 'myvip/updatePageInfo', payload: {
        type: 'list',
        data: {},
      } });
    };
  }, []);
  return (
    <View className='vip-page'>
      {type === 'list' && <GoodsList />}
      {type === 'goods' && <GoodsPage />}
      {type === 'detail' && <GoodsDetail />}
      {type === 'change' && <GoodsChange />}
      {type === 'add' && <GoodsAdd />}
    </View>
  );
};

export default MyVip;
