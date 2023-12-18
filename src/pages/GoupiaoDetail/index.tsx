/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-03 17:44:01
 * @FilePath: /zulinv2/src/subPackages/Paidui/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard, AtButton } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';
import { getUserBuycard, getCardDetail } from './services';
import { showErrorToast } from '@/utils/util';
import { useDispatch } from '@tarojs/redux';

const GoupiaoDetail = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { params } = router;
  const { cid } = params;
  const [cardInfo, setCardInfo] = useState<any>({})
  useDidShow(() => {

    getCardDetail({ cid }).then(d => {
      console.log(d);
      setCardInfo(d);
    });
  })
  const handleSubmit = (form: any) => {

    getUserBuycard({cardid: cid}).then(d => {
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
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleSubmit} className='n-color-btn'>
              立即购买快乐
            </AtButton>
          </View>

          <AtButton size='small' onClick={handleCancel}>
            再想想先取消
          </AtButton>
        </View>
      </View>
    </View>
  );
}

export default GoupiaoDetail;