import Taro, { useDidShow } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { ORDER_STATUS_MAP, ORDER_OTYPE_MAP } from '@/constants/index';
import { useInitialValue } from '@/utils/hooks';
import Divider from '@/components/Divider';
import ScrollCon from '@/components/ScrollCon';
import ListItem from './modules/ListItem';
import './index.scss';

const { useState, useEffect, useMemo, useRouter } = Taro;

const Order = () => {
  const { orderList } = useSelector((state) => state.order);
  const router = useRouter();
  const [current, setCurrent] = useState(() => {
    const { params = {} } = router;
    const { status = '全部订单' } = params;
    return [...ORDER_OTYPE_MAP.keys()].indexOf(status);
  });
  const dispatch = useDispatch();
  const tabList = useMemo(() => {
    const arr = [...ORDER_OTYPE_MAP.keys()];
    return arr.map((name) => {
      const res = { title: name };
      return res;
    });
  }, []);
  const handleScrollBottom = (status) => {
    dispatch({ type: 'order/onPage', params: { otype: status } });
  };
  const handleDelOrder = (id, otype) => {
    dispatch({ type: 'order/delOrder', params: { id, otype } });
  };
  const handleCompletelOrder = (id, otype) => {
    dispatch({ type: 'order/orderComplete', params: { id, otype } });
  };
  useInitialValue('order', dispatch);
  useDidShow(() => {
    // 切换tab 请求接口
    const status = [...ORDER_OTYPE_MAP.values()][current];
    dispatch({ type: 'order/searchOrder', params: { otype: status } });
  });
  useEffect(() => {
    // 切换tab 请求接口
    const status = [...ORDER_OTYPE_MAP.values()][current];
    dispatch({ type: 'order/searchOrder', params: { otype: status } });
  }, [current]);
  return (
    <View className='order-wrap'>
      <AtTabs current={current} tabList={tabList} scroll onClick={setCurrent}>
        {[...ORDER_OTYPE_MAP.values()].map((status, index) => {
          return (
            <AtTabsPane current={current} index={index} key={status}>
              <ScrollCon onScrollBottom={() => handleScrollBottom(status)}>
                <View>
                  {orderList[status] && orderList[status].list && orderList[status].list.length > 0 && (
                    <ListItem status={status} orderList={orderList} list={orderList[status].list} handleDelOrder={handleDelOrder} handleCompletelOrder={handleCompletelOrder} />
                  )}
                  <View style='padding:20px'>
                    <Divider />
                  </View>
                </View>
              </ScrollCon>
            </AtTabsPane>
          );
        })}
      </AtTabs>
    </View>
  );
};

export default Order;
