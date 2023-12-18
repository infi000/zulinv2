/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-11-14 23:17:04
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-16 01:03:01
 * @FilePath: /zulinv2/src/pages/CheckedList/modules/ListItem.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

}

const ListItem = (props: IProps) => {
  const { status, orderList } = props;
  const { list } = orderList[status] || {};
  const handlePageToQr = (orderid) => {
    Taro.navigateTo({ url: '/pages/PicketQr/index?orderid=' + orderid });
  };

  console.log('list', list);
  console.log('status', status);

  return (
    <View className='list-group-wrap'>
      {(!list || !list[0]) && <View> 暂无信息</View>}
      <AtList hasBorder={false}>
        {isArray(list) &&
          list.map((item, index) => {
            let title = '';
            let startTime = '';
            let endTime = '';
            if (status === 'card') {
              title = item.cardname || '-';
              startTime = item.checktime || '-';
              endTime = item.cardexpired || '-';
            }
            if (status === 'picket') {
              title = item.title || '-';
              startTime = item.starttime || '-';
              endTime = item.endtime || '-';
            }
            // const { id: ids, total, orderid, status: orderStatus, ischoujiang } = item;
            // const { title, fpath, ispicket = '' } = ids[0];
            return (
              <View className='list-item-wrap' key={index}>
                <View className='list-item-title'> 进场记录：{title}</View>
                {
                  status === 'card' && <Block><View className='list-item-desc'> 验票：{startTime}</View>
                    <View className='list-item-desc'> 过期：{endTime}</View></Block>
                }
                {
                  status === 'picket' && <Block><View className='list-item-desc'> 进场：{startTime}</View>
                    <View className='list-item-desc'> 出场：{endTime}</View>
                    <View className='list-item-desc'> 查看：{endTime}</View>
                    <View className='list-item-btn-con'>
                      <View className='btn-default' style='margin-right:10px' onClick={() => handlePageToQr(item.orderid)}>
                        查看
                      </View>
                    </View>
                  </Block>
                }
              </View>
            );
          })}
      </AtList>
    </View>
  );
};

export default ListItem;
