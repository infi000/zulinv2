import Taro, { useEffect } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { isArray } from 'lodash';
import { ImgError } from '../../../static/images/index';

import '../index.scss';

interface IProps {
  list: [
    {
      id: Array<TObj<any>>;
      [key: string]: any;
    }
  ];
  orderList?: any;
  status: string | number;
  handleDelOrder: (id: StringNumber, status: StringNumber) => any;
  handleCompletelOrder: (id: StringNumber, status: StringNumber) => any;
}

const ListItem = (props: IProps) => {
  const { status, orderList, handleDelOrder, handleCompletelOrder } = props;
  const { list } = orderList[status] || {};
  const handlePageToPay = (orderid) => {
    Taro.navigateTo({ url: '/pages/BuyPage/index?orderid=' + orderid });
  };
  const handlePageToQr = (orderid) => {
    Taro.navigateTo({ url: '/pages/PicketQr/index?orderid=' + orderid });
  };
  const handlePageToChangeAddrId = (orderid) => {
    Taro.navigateTo({ url: '/pages/SetAddrId/index?orderid=' + orderid });
  };
  return (
    <View className='list-group-wrap'>
      {(!list || !list[0]) && <View> 暂无信息</View>}
      <AtList hasBorder={false}>
        {isArray(list) &&
          list.map((item, index) => {
            const { id: ids, total, orderid, status: orderStatus,ischoujiang } = item;
            const { title, fpath, ispicket = ''  } = ids[0];
            return (
              <View className='list-item-wrap' key={index}>
                <AtListItem title={title || '-'} note={`¥${total}`} thumb={fpath || ImgError}></AtListItem>
                {orderStatus == '0' && (
                  <View className='list-item-btn-con'>
                    <View className='btn-default' style='margin-right:10px' onClick={() => handlePageToPay(orderid)}>
                      支付
                    </View>
                    <View className='btn-default' onClick={() => handleDelOrder(orderid, status)}>
                      删除订单
                    </View>
                  </View>
                )}
                {orderStatus == '1' && ischoujiang == '1' && (
                  <View className='list-item-btn-con'>
                    <View className='btn-default' style='margin-right:10px' onClick={() => handlePageToChangeAddrId(orderid)}>
                      修改地址
                    </View>
                  </View>
                )}
                {orderStatus == '2' && (
                  <View className='list-item-btn-con'>
                    <View className='btn-default' style='margin-right:10px' onClick={() => handleCompletelOrder(orderid, status)}>
                      确认收货
                    </View>
                  </View>
                )}
                {ispicket == '1' && (
                  <View className='list-item-btn-con'>
                    <View className='btn-default' style='margin-right:10px' onClick={() => handlePageToQr(orderid)}>
                      查看
                    </View>
                  </View>
                )}
              </View>
            );
          })}
      </AtList>
    </View>
  );
};

export default ListItem;
