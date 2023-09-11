import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import Addr from './modules/Addr';
import { AtListItem } from 'taro-ui';
import { ImgError } from '../../static/images/index';
import { getMyAddress, getOderDetail, postSetAddress } from './services';
import { showToast, showSuccessToast } from '@/utils/util';
import './index.scss';
import { get } from 'lodash';

const SetAddrId = () => {
  const [addrList, setAddrList] = useState([]);
  const { openid } = useSelector((state) => state.main);

  const [orderData, setOrderData] = useState({});
  const [defaultAddr, setDefaultAddt]: [false | any, Function] = useState(false);

  const router = useRouter();
  useDidShow(() => {
    const { params } = router;
    const { orderid } = params;
    getMyAddress({}).then(d => {
      const { addresses } = d;
      if (!addresses) {
        showToast("没有设置收货地址");
        // 1. 设置地址信息
        setDefaultAddt(false);
        return
      }
      const defalutAddress = addresses.find(item => item.status == 1);
      if (!defalutAddress) {
        showToast("没有默认收货地址");
        // 1. 去地址信息中配置
        setDefaultAddt(false);
        return
      }
      setDefaultAddt(defalutAddress);
    });
    getOderDetail({ orderid }).then(d => {
      d && setOrderData(d);
    })
  });
  const handleSetAddrId = () => {
    if (!defaultAddr) {
      showToast("没有设置收货地址");
      return;
    }
    const { params } = router;
    const { orderid } = params;
    if (!orderid) {
      showToast("没有订单号");
      return;
    }
    const addressid = defaultAddr.id;
    postSetAddress({ addressid, orderid, openId: openid }).then(d => {

      Taro.navigateBack({
        delta: 1 , success: function (res) {
          showToast("设置成功");
        }
      });
    })
  }
  return (
    <View className='SetAddrId-wrap'>
      <Addr defaultAddr={defaultAddr} />
      <AtListItem title={get(orderData, ['gdata', 0, 'title'], '未知')} note={`¥${get(orderData, ['total'], '-')}`} thumb={get(orderData, ['gdata', 0, 'fpath'], ImgError)}></AtListItem>
      <View className='SetAddrId-btn-wrap'>
        <View className='SetAddrId-info'></View>

        <View className='SetAddrId-btn-pay' onClick={handleSetAddrId}>立即修改</View>
      </View>
    </View>
  );
};

export default SetAddrId;
