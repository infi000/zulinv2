import Taro, { useEffect } from '@tarojs/taro';
import { AtButton, AtCard, AtTabs, AtTabsPane } from 'taro-ui';
import { View, Block, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import Comment from '@/components/Comment';
import Divider from '@/components/Divider';
import InputPage from '@/components/Input';
import InputBuy from '../components/InputBuy';
import PriceRecord from '../components/PriceRecord';
import '../index.scss';
import { isArray, slice } from 'lodash';

const { useState } = Taro;
// const tabList = [{ title: '留言信息' }, { title: '求购信息' }];
const tabList = [{ title: '求购信息' }];

const Price = () => {
  const { pageInfo, commentInfo, BuyInfo, pricehistory, buyhistory } = useSelector((state) => state.myvip);
  const dispatch = useDispatch();
  const [tabCurrent, setTabCurrent] = useState(1);
  const [inputModal, setInputModal] = useState(false);
  const [inputBuyModal, setInputBuyModal] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [buysModal, setBuysModal] = useState(false);

  const onScroll = () => {};
  const handleCreateTalk = () => {
    setInputModal(true);
  };
  const handleBack = () => {
    dispatch({ type: 'myvip/updatePageInfo', payload: { type: 'goods', data: pageInfo.data } });
  };
  const handleBuy = () => {
    setInputBuyModal(true);
  };
  const formatBuysList = (price) => {
    const { list = [] } = price;
    if (isArray(list)) {
      return list.length > 5 ? slice(list, 0, 5) : list;
    }
    return [];
  };
  useEffect(() => {
    if (tabCurrent === 0) {
      dispatch({ type: 'myvip/getSearchmsg' });
    }
    if (tabCurrent === 1) {
      dispatch({ type: 'myvip/getSearchbuymsg' });
    }
  }, [tabCurrent]);
  useEffect(() => {
    dispatch({ type: 'myvip/getPricehistory' });
    dispatch({ type: 'myvip/getBuyhistory' });
  }, []);
  return (
    <Block>
      <View>
        <View className='goodsshow-con goods-sale-con'>
          <View className='at-row at-row__justify--between goods-sale-top'>
            <View className='at-col at-col-5 goods-sale-count'>历史价格({pricehistory.total})</View>
            <View className='at-col at-col-5 goods-sale-all-btn' onClick={()=>{setPriceModal(true)}}>全部</View>
          </View>
          <View className='goods-sale-min goods-sale-mid'>
            {pricehistory.total > 0 ? (
             formatBuysList(pricehistory.list).map((item, index) => {
                const { create, id, price, title } = item;
                return (
                  <View key={id} className='at-row at-row__justify--between goods-sale-record-con'>
                    <View className='at-col at-col-4 goods-sale-record-l'>¥{price}</View>
                    <View className='at-col at-col-4 goods-sale-record-m '></View>
                    <View className='at-col at-col-4 goods-sale-record-r'>{create}</View>
                  </View>
                );
              })
            ) : (
              <Divider />
            )}
          </View>
        </View>
        <View className='goodsshow-con goods-sale-con'>
          <View className='at-row at-row__justify--between goods-sale-top'>
            <View className='at-col at-col-5 goods-sale-count'>成交价格({buyhistory.total})</View>
            <View className='at-col at-col-5 goods-sale-all-btn' onClick={()=>setBuysModal(true)}>全部</View>
          </View>
          <View className='goods-sale-min goods-sale-mid'>
            {buyhistory.total > 0 ? (
              formatBuysList(buyhistory.list).map((item, index) => {
                const { create, id, price, title } = item;
                return (
                  <View key={id} className='at-row at-row__justify--between goods-sale-record-con'>
                    <View className='at-col at-col-4 goods-sale-record-l'>¥{price}</View>
                    <View className='at-col at-col-4 goods-sale-record-m '></View>
                    <View className='at-col at-col-4 goods-sale-record-r'>{create}</View>
                  </View>
                );
              })
            ) : (
              <Divider />
            )}
          </View>
        </View>
      </View>
      <View style='height:500px'>
        <AtTabs current={tabCurrent} tabList={tabList} onClick={setTabCurrent}>
          <AtTabsPane current={tabCurrent} index={0}>
            <View className='common-wrap' style='background:#fff'>
              {commentInfo.total > 0 ? (
                <ScrollView scrollY={true} scrollWithAnimation style={{ height: '100%' }} onScroll={onScroll}>
                  {commentInfo.list.map((item) => {
                    const head = item.face;
                    const time = item.ctime;
                    const msg = item.msg;
                    const nickName = item.nickname;
                    return <Comment head={head} msg={msg} nickName={nickName} time={time} key={item.id} />;
                  })}
                </ScrollView>
              ) : (
                <Divider />
              )}
            </View>
          </AtTabsPane>
          <AtTabsPane current={tabCurrent} index={1}>
            <View className='common-wrap' style='background:#fff'>
              <ScrollView scrollY={true} scrollWithAnimation style={{ height: '100%' }} onScroll={onScroll}>
                {BuyInfo.total > 0 ? (
                  BuyInfo.list.map((item) => {
                    const head = item.face;
                    const time = item.ctime;
                    const msg = ` 金额：${item.price}; 留言：${item.msg}; 电话：${item.phone};`;
                    const nickName = item.nickname;
                    return <Comment head={head} msg={msg} nickName={nickName} time={time} key={item.id} />;
                  })
                ) : (
                  <Divider />
                )}
              </ScrollView>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
      <View className='talk-wrap'>
        {tabCurrent === 0 && (
          <AtButton type='primary' size='small' onClick={handleCreateTalk}>
            留言
          </AtButton>
        )}
        {tabCurrent === 1 && (
          <AtButton type='primary' size='small' onClick={handleBuy}>
            求购
          </AtButton>
        )}
        <View style='margin-top:10px'>
          <AtButton size='small' onClick={handleBack}>
            返回
          </AtButton>
        </View>
      </View>
      {inputModal && (
        <InputPage
          onOk={(params) => {
            dispatch({ type: 'myvip/postAddmsg', params });
          }}
          onCancel={() => setInputModal(false)}
        />
      )}
      {inputBuyModal && (
        <InputBuy
          onOk={(params) => {
            dispatch({ type: 'myvip/postAddbuymsg', params });
          }}
          onCancel={() => setInputBuyModal(false)}
        />
      )}
      {priceModal && <PriceRecord title='历史价格' list={pricehistory.list} onBack={()=>{setPriceModal(false)}} />}
      {buysModal && <PriceRecord  title='成交价格' list={buyhistory.list} onBack={()=>{setBuysModal(false)}} />}
    </Block>
  );
};

export default Price;
