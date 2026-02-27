/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-04-28 15:48:07
 * @FilePath: /zulinv2/src/subPackages/Paidui/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtButton, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';
import { getUserBuycard, getCardDetail, getDiscountcardList } from './services';
import { showErrorToast } from '@/utils/util';
import { useDispatch, useSelector } from '@tarojs/redux';

const GoupiaoDetail = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { params } = router;
  const { cid } = params;
  const [cardInfo, setCardInfo] = useState<any>({})
  const [discountcard, setDiscountcard] = useState<any>([])
  const [releasalecards, setReleasalecards] = useState<any>([])
  const { userInfo } = useSelector((state) => state.main);
  const [openModal, setOpenModal] = useState(false)
  const [selectedRelIds, setSelectedRelIds] = useState<string[]>([])

  const handleOpen = () => {
    setOpenModal(true)
  }

  // 处理关联卡选择变化
  const handleRelCardSelect = (cardId: string) => {
    if (selectedRelIds.includes(cardId)) {
      setSelectedRelIds(selectedRelIds.filter(id => id !== cardId));
    } else {
      setSelectedRelIds([...selectedRelIds, cardId]);
    }
  }
  useDidShow(() => {

    getCardDetail({ cid }).then(d => {
      console.log(d);
      setCardInfo(d);
      // 提取关联卡信息
      if (d.relesalecards) {
        setReleasalecards(d.relesalecards);
        // 默认选中所有关联卡
        setSelectedRelIds(d.relesalecards.map((item: any) => item.id));
      }
    });
    const { mobile } = userInfo;
    getDiscountcardList({ uphone: mobile, sid: cid }).then(d => {
      setDiscountcard(d.discountcard || []);
    });
  })
  const handleSubmit = (xlyid?: any) => {
    console.log('xlyid', xlyid)
    const params: any = { cardid: cid };

    // 添加关联卡ID参数
    if (selectedRelIds.length > 0) {
      params.relvids = selectedRelIds.join(',');
    }

    if (xlyid) {
      // 小懒腰购买
      params.xlyid = xlyid
      getUserBuycard(params).then(d => {

        dispatch({ type: 'main/getUserInfo', payload: {} });
        Taro.showToast({
          title: '购买成功',
          icon: 'success',
          duration: 2000
        })
        // 返回上一级页面。
        setTimeout(() => {
          Taro.navigateBack({ delta: 1 });
        }, 2000);
      })
      return
    }
    getUserBuycard(params).then(d => {
      const { arraydata } = d || {};
      const { nonceStr, timeStamp, signType, paySign } = arraydata || {};
      const pak = arraydata.package;
      Taro.requestPayment({
        timeStamp: timeStamp + "",
        nonceStr: nonceStr,
        package: pak,
        signType,
        paySign,
        success: function (res) {
          dispatch({ type: 'main/getUserInfo', payload: {} });
          Taro.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          })
          // 返回上一级页面。
          setTimeout(() => {
            Taro.navigateBack({ delta: 1 });
          }, 2000);
        },
        fail: function (res) {
          showErrorToast("购买失败");
          console.log(res)
        }
      })
    })
  };
  const handleCancel = () => {
    Taro.navigateBack({
      delta: 1, success: function (res) {

      }
    });
    return;
  };

  return (
    <View className='goodgoods-wrap'>
      <View className='goupaiodetail-wrap'>
        <Image style={{ width: '100%', marginBottom: '20px' }} src={cardInfo.cardpic || ''} mode="widthFix" />

        {/* 关联卡展示区域 */}
        {releasalecards && releasalecards.length > 0 && (
          <View className='related-cards-section'>
            <View className='related-cards-title'>关联卡列表</View>
            <View className='related-cards-list'>
              {releasalecards.map((card: any) => (
                <View key={card.id} className='related-card-item'>
                  <Image src={card.thumbinal || ''} className='related-card-image' mode="aspectFill" />
                  <View className='related-card-info'>
                    <View className='related-card-name'>{card.cardname}</View>
                    <View className='related-card-details'>
                      <View>期限：{card.cardduration}{card.carddurationtype === 'year' ? '年' : '月'}</View>
                      <View>次数：{card.cardcount}次</View>
                      <View>价格：¥{card.price}</View>
                    </View>
                    <View className='related-card-remark'>{card.remark}</View>
                  </View>
                  <View className='related-card-checkbox'>
                    <View
                      className={`checkbox ${selectedRelIds.includes(card.id) ? 'checked' : ''}`}
                      onClick={() => handleRelCardSelect(card.id)}
                    >
                      {selectedRelIds.includes(card.id) ? '✓' : ''}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={() => handleSubmit()} className='n-color-btn'>
              立即购买快乐
            </AtButton>
          </View>
          {/* <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleOpen} className='n-color-btn'>
              会员购买
            </AtButton>
          </View> */}

          <AtButton size='small' onClick={handleCancel}>
            再想想先取消
          </AtButton>
        </View>
      </View>
      <AtActionSheet isOpened={openModal} title='会员' onClose={() => setOpenModal(false)}>
        {discountcard.map((item: any) => {
          return <AtActionSheetItem onClick={() => handleSubmit(item.equity_id)}>
            {`${item.goods_name}/剩余（${item.balance}）`}
          </AtActionSheetItem>
        })}
      </AtActionSheet>
    </View>
  );
}

export default GoupiaoDetail;
