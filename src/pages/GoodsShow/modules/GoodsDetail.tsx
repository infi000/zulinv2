/* eslint-disable @typescript-eslint/camelcase */
// import Taro from '@tarojs/taro';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import GoodsList from '@/components/GoodsList';
import { isArray, toNumber, slice, isString } from 'lodash';
import { logIn } from '@/utils/auth';

import '../index.scss';
import SelecotModall from './SelecotModall';

const { useState, useEffect, useMemo } = Taro;
const defaultChooseModal = {
  show: false,
  data: {
    color: [],
    groupprice: [],
    size: [],
  },
};
interface IProps {}
/**
 * 商品展示
 */
const GoodsDetail = (props: IProps) => {
  const { detail, relatedGoods, buysRecordList, isfav, gid } = useSelector((state) => state.goodsShow);
  const { isLogIn } = useSelector((state) => state.main);
  const [chooseModal, setChooseModal] = useState(defaultChooseModal);

  // const { gid } = props;
  const dispatch = useDispatch();
  const buysList = useMemo(() => {
    const { buys = [] } = buysRecordList;
    if (isArray(buys)) {
      return buys.length > 5 ? slice(buys, 0, 5) : buys;
    }
    return [];
  }, [buysRecordList]);
  const handleShowBuysPage = () => {
    dispatch({ type: 'goodsShow/updateIsShowBuysPaget', payload: true });
  };
  const handleGetUnfav = () => {
    dispatch({ type: 'goodsShow/getUnfav' });
  };
  const handleGetFav = () => {
    dispatch({ type: 'goodsShow/getFav' });
  };
  const handleSaveBuy = () => {
    dispatch({ type: 'goodsShow/createOrder' });
  };
  const handleLogIn = () => {
    // eslint-disable-next-line no-undef
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        logIn({dispatch,userInfo: res.userInfo});
      }
    })
  };
  const handleToChoose = () => {
    const { ispicket } = detail || {};
    // 先吧ispicket当成商品
    // if(ispicket === '1'){
    //   handleSaveBuy();
    //   return;
    // }
    // const params = {
    //   show: true,
    //   data: {
    //     price,
    //     pickets:dates && dates.pickets ?dates.pickets : []
    //   },
    // };
    // setChooseModal(params);
    let { color, groupprice, size } = detail || {};
    color = isString(color) ? color.split('、') : [];
    groupprice = isString(groupprice) ? groupprice.split('、') : [];
    size = isString(size) ? size.split('、') : [];
    const params = {
      show: true,
      data: {
        color,
        groupprice,
        size,
      },
    };
    setChooseModal(params);
  };

  const handleSelecotModalSubmit = (params:{price:string;num:number}) =>{
    setChooseModal(defaultChooseModal);
    dispatch({ type: 'goodsShow/createOrder',params });
  }
  // useEffect(() => {
  //   // dispatch({ type: 'goodsShow/updateGid', payload: gid });
  //   dispatch({ type: 'goodsShow/getDetail' });
  //   dispatch({ type: 'goodsShow/getPageBuysRecord', payload: { refresh: true } });
  //   dispatch({ type: 'goodsShow/getRelatedGoods' });
  //   dispatch({ type: 'goodsShow/getIsfav' });
  // }, [gid]);
  return (
    <View className='goodsshow-wrap'>
      {/* 商品图片价格描述 */}
      <Swiper className='swiper-con' indicatorColor='#999' indicatorActiveColor='#ddd' circular indicatorDots>
        {detail.colorimgs &&
          detail.colorimgs[0] &&
          detail.colorimgs[0].map((item) => {
            const { clothcolor, id, fpath } = item;
            return (
              <SwiperItem key={id}>
                <View className='swiper-img-con'>
                  <Image lazyLoad style='height: 100%' src={fpath}  mode='aspectFit' />
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

      {/* 商品属性 */}
      <View className='goodsshow-con' style={{ paddingBottom: 0, overflowX: 'scroll' }}>
        <View className='at-row at-row__justify--between goods-attr-con'>
          <View className='at-col at-col-2 goods-attr'>品牌</View>
          <View className='at-col at-col-10  goods-attr-desc'>{detail.brand}</View>
        </View>
        <View className='at-row at-row__justify--between goods-attr-con'>
          <View className='at-col at-col-2 goods-attr'>尺寸</View>
          <View className='at-col at-col-10  goods-attr-desc'>{detail.size}</View>
        </View>
        <View className='at-row at-row__justify--between goods-attr-con'>
          <View className='at-col at-col-2 goods-attr'>物品押金</View>
          <View className='at-col at-col-10  goods-attr-desc'>{detail.deposit || '-'}</View>
        </View>
      </View>

      {/* 购买记录 */}
      <View className='goodsshow-con goods-sale-con'>
        <View className='at-row at-row__justify--between goods-sale-top'>
          <View className='at-col at-col-5 goods-sale-count'>购买记录({buysRecordList.total})</View>
          <View className='at-col at-col-5 goods-sale-all-btn' onClick={handleShowBuysPage}>
            全部
          </View>
        </View>
        <View className='goods-sale-min goods-sale-mid'>
          {buysList.length > 0 &&
            buysList.map((item, index) => {
              const { create_time, id, price, title } = item;
              return (
                <View key={id} className='at-row at-row__justify--between goods-sale-record-con'>
                  <View className='at-col at-col-4 goods-sale-record-l'>{title}</View>
                  <View className='at-col at-col-4 goods-sale-record-m '>¥{price}</View>
                  <View className='at-col at-col-4 goods-sale-record-r'>{create_time}</View>
                </View>
              );
            })}
        </View>
      </View>
      {/* 购买须知 */}
      <View className='goodsshow-con goods-warning-con'>
        <View className='at-col at-col-5 goods-warning-title'>购买须知</View>
        {detail.detailimgs &&
          detail.detailimgs.map((item) => {
            const { clothcolor, id, fpath } = item;
            return <Image key={id} mode='widthFix' lazyLoad style='width: 100%;height: 100%;float:left' src={fpath} />;
          })}
      </View>
      {/* 热门推荐 */}
      <View className='goodsshow-con goods-hot-con'>
        <View className='at-col at-col-5 goods-hot-title'>热门推荐</View>
        <GoodsList list={relatedGoods} />
      </View>
      {/* 购买出售 */}
      <View className='footer-con at-row'>
        {/* {isfav == 1 ? <View className='at-col at-col-3 love-btn' onClick={handleGetUnfav}>已收藏</View> : <View className='at-col at-col-3 love-btn' onClick={handleGetFav}>收藏</View>}

        <View className='at-col at-col-4 at-col__offset-1'>
          <View className='sale-btn'>出售</View>
        </View> */}
        {/* {isfav == 1 ? <View className='at-col at-col-3 love-btn' onClick={handleGetUnfav}>已收藏</View> : <View className='at-col at-col-3 love-btn' onClick={handleGetFav}>收藏</View>} */}

        <View className='at-col at-col-4 '>
          {isfav == 1 ? (
            <View className='sale-btn' onClick={handleGetUnfav}>
              已收藏
            </View>
          ) : (
            <View className='sale-btn' onClick={handleGetFav}>
              收藏
            </View>
          )}
        </View>
        <View className='at-col at-col-4 '>{/* <View className='sale-btn' >出售</View> */}</View>
        <View className='at-col at-col-4'>
          {detail.issale == '-1' ? (
            <View className='buy-btn-issaled' >
              购买
            </View>
          ) : isLogIn ? (
            <View className='buy-btn' onClick={handleToChoose}>
              购买
            </View>
          ) : (
            <Button
              className='buy-btn'
              // open-type='getUserInfo'
              // onGetUserInfo={(e) => {
              //   logIn(dispatch, handleToChoose);
              // }}
              onClick={handleLogIn}
            >
              购买
            </Button>
          )}
        </View>
      </View>
      {chooseModal.show && (
         <SelecotModall
           color={chooseModal.data.color}
           groupprice={chooseModal.data.groupprice}
           size={chooseModal.data.size}
           handleAdd={handleSelecotModalSubmit}
           handleCancel={() => {
            setChooseModal(defaultChooseModal);
         }}
       />
      )}
    </View>
  );
};

export default GoodsDetail;
