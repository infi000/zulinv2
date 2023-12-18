/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-11-14 23:17:04
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-05 00:18:10
 * @FilePath: /zulinv2/src/pages/CheckedList/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { ORDER_STATUS_MAP } from '@/constants/index';
import { useInitialValue } from '@/utils/hooks';
import Divider from '@/components/Divider';
import ScrollCon from '@/components/ScrollCon';
import ListItem from './modules/ListItem';
import './index.scss';

const { useState, useEffect, useMemo, useRouter } = Taro;

const CHECKED_OTYPE_MAP = new Map([
  ['卡','card'],
  // ['门票','picket'],
])

const Order = () => {
  const { orderList } = useSelector((state) => state.CheckedList);
  const router = useRouter();
  const [current, setCurrent] = useState(() => {
    const { params = {} } = router;
    const { status = '卡' } = params;
    return [...CHECKED_OTYPE_MAP.keys()].indexOf(status);
  });
  const dispatch = useDispatch();
  const tabList = useMemo(() => {
    const arr = [...CHECKED_OTYPE_MAP.keys()];
    return arr.map((name) => {
      const res = { title: name };
      return res;
    });
  }, []);
  const handleScrollBottom = (status) => {
    dispatch({ type: 'CheckedList/onPage', params: { otype: status } });
  };

  useInitialValue('CheckedList', dispatch);
  useDidShow(() => {
    // 切换tab 请求接口
    const status = [...CHECKED_OTYPE_MAP.values()][current];
    dispatch({ type: 'CheckedList/searchCheckedList', params: { type: status } });
  });
  useEffect(() => {
    // 切换tab 请求接口
    const status = [...CHECKED_OTYPE_MAP.values()][current];
    dispatch({ type: 'CheckedList/searchCheckedList', params: { type: status } });
  }, [current]);
  console.log('current', current);
  return (
    <View className='order-wrap'>
      <AtTabs current={current} tabList={tabList} scroll onClick={setCurrent}>
        {[...CHECKED_OTYPE_MAP.values()].map((status, index) => {
          return (
            <AtTabsPane current={current} index={index} key={status}>
              <ScrollCon onScrollBottom={() => handleScrollBottom(status)}>
                <View>
                  {orderList[status] && orderList[status].list && orderList[status].list.length > 0 && (
                    <ListItem status={status} orderList={orderList} list={orderList[status].list}/>
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
