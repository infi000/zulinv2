/* eslint-disable @typescript-eslint/camelcase */
// import Taro from '@tarojs/taro';
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import GoodsList from '@/components/GoodsList';
import { isArray, toNumber, slice, isString } from 'lodash';
import { logIn } from '@/utils/auth';

import '../index.scss';
import SelecotModall from './SelecotModall';
import { AtInput, AtModal, AtModalAction, AtModalContent, AtModalHeader, AtTextarea } from 'taro-ui';
import { getConsignmentBuy, getConsignmentBuypay } from '../services';
import { showErrorToast, showSuccessToast } from '@/utils/util';

const { useState, useEffect, useMemo } = Taro;
const defaultChooseModal = {
  show: false,
  data: {
  },
};
interface IProps { }
/**
 * 商品展示
 */
const GoodsDetail = (props: IProps) => {
  const { detail, relatedGoods, buysRecordList, isfav, gid, orderid, isSelf, ispay } = useSelector((state) => state.ConsignmentShow);
  const { isLogIn } = useSelector((state) => state.main);
  const [chooseModal, setChooseModal] = useState(defaultChooseModal);
  const [buyModal, setBuyModal] = useState({ show: false });

  const [phone, setPhone] = useState<any>('');
  // const { gid } = props;
  const dispatch = useDispatch();
  const buysList = useMemo(() => {
    const { buys = [] } = buysRecordList;
    if (isArray(buys)) {
      return buys.length > 5 ? slice(buys, 0, 5) : buys;
    }
    return [];
  }, [buysRecordList]);

  const handleSaveBuy = () => {
    dispatch({ type: 'ConsignmentShow/createOrder' });
  };

  const handleToChoose = () => {
    const { price, ispicket, dates } = detail || {};
    if (ispicket !== '1') {
      handleSaveBuy();
      return;
    }
    const params = {
      show: true,
      data: {
        price,
        pickets: dates.pickets
      },
    };
    setChooseModal(params);
  };
  const handleSelecotModalSubmit = (params: { price: string; times: string; dates: string; num: number }) => {
    setChooseModal(defaultChooseModal);
    console.log("params", params);
    dispatch({ type: 'ConsignmentShow/createPicketOrder', params });
  }
  // useEffect(() => {
  //   // dispatch({ type: 'ConsignmentShow/updateGid', payload: gid });
  //   dispatch({ type: 'ConsignmentShow/getDetail' });
  //   dispatch({ type: 'ConsignmentShow/getPageBuysRecord', payload: { refresh: true } });
  //   dispatch({ type: 'ConsignmentShow/getRelatedGoods' });
  //   dispatch({ type: 'ConsignmentShow/getIsfav' });
  // }, [gid]);

  const handleBuy = async () => {
    const params = {
      jgid: detail.id, // 寄卖商品id
      uphone: phone, // 联系手机号
      total: detail.price, // 总金额
    }
    try {
      const { oid } = await getConsignmentBuy(params);
      await getConsignmentBuypay({ oid });
      showSuccessToast("购买成功");
      Taro.navigateTo({ url: '/subPackages/Consignment/index' });
    } catch (error) {
      showErrorToast(error)
    }
  }

  const handleConfirm = async () => {
    if (orderid) {
      // 已下订单的直接支付
      try {
        await getConsignmentBuypay({ oid: orderid });
        showSuccessToast("购买成功");
        Taro.navigateTo({ url: '/subPackages/Consignment/index' });
      } catch (error) {
        showErrorToast(error)
      }
      return;
    }
    if (phone) {
      setBuyModal({ show: true });
      return;
    }
    showErrorToast('请填写手机号')
  }
  console.log('isSelf', isSelf);
  return (
    <View className='goodsshow-wrap'>
      {/* 商品图片价格描述 */}
      <Swiper className='swiper-con' indicatorColor='#999' indicatorActiveColor='#ddd' circular indicatorDots autoplay>
        {detail.pics &&
          Array.isArray(detail.pics) &&
          detail.pics.map((item) => {
            const { clothcolor, id, pic } = item;
            return (
              <SwiperItem key={id}>
                <View className='swiper-img-con'>
                  <Image lazyLoad style='height: 100%' src={pic} mode='aspectFit' />
                </View>
              </SwiperItem>
            );
          })}
      </Swiper>
      <View className='goodsshow-con' style={{ paddingTop: 0 }}>
        <View className='price-desc-con'>
          <View className='price-con'>¥{detail.price}</View>
          <View className='desc-con'>{detail.title}</View>
        </View>
      </View>
      {/* 购买须知 */}
      <View className='goodsshow-con goods-warning-con'>
        <View className='at-col at-col-5 goods-warning-title'>商品描述</View>
        {detail.des}
      </View>

      {/* 购买出售 */}
      {(isSelf ||  ispay ==='1') ? null :  <View className='footer-con at-row'>
        <View className='at-col at-col-8 '>
          <AtInput title='手机号' value={phone} onChange={setPhone} name='phone' />
        </View>
        <View className='at-col at-col-4'>
          {isLogIn ? (
            <View className='buy-btn' onClick={handleConfirm}>
              {orderid ? '支付' : '购买'}
            </View>
          ) : (
            <Button
              className='buy-btn'
              disabled
            >
              铊币支付
            </Button>
          )}
        </View>

      </View>
      }
      <AtModal isOpened={buyModal.show}>
        <AtModalHeader>确认购买？</AtModalHeader>
        <AtModalContent>
          <View> 商品名称：{detail.title}</View>
          <View> 商品价格：{detail.price}</View>
          <View> 联系电话：{phone}</View>
        </AtModalContent>
        <AtModalAction> <Button onClick={() => setBuyModal({ show: false })}>取消</Button> <Button onClick={handleBuy}>确定</Button> </AtModalAction>
      </AtModal>
    </View>
  );
};

export default GoodsDetail;
