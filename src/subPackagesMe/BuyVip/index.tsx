import Taro, { scope, Component, useState, useDidShow, useEffect, showToast } from '@tarojs/taro';
import { View, Block, ScrollView, Image, Picker } from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem, AtButton, AtImagePicker, AtInput, AtInputNumber, AtList, AtListItem, AtRadio } from 'taro-ui';
import Uploader from '@/components/Uploader';

import { useSelector, useDispatch } from '@tarojs/redux';
import { createGoods, getCarddCards, getClassifySearch, getUserBuycard, getbg, postPay } from './services';
import { isArray } from 'lodash';

import './index.scss';
import { showErrorToast, showSuccessToast } from '@/utils/util';
import { USE_DAY_TYPE } from '@/utils/constants';



const defaultForm: { [key: string]: any } = {};

const ConsignmentCreate = () => {
  const dispatch = useDispatch();

  const [bg, setBg] = useState('');
  const [dCards, setDCards] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  const handleSubmit = (form: any) => {

    getUserBuycard(form).then(d => {
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


  const handleOpen = () => {
    setOpenModal(true)
  }
  useEffect(() => {
    getbg({ sname: 'yearbg' }).then((d) => {
      const { pic } = d;
      setBg(pic);
    })
    getCarddCards({}).then((d) => {
      const { cards } = d;
      setDCards(cards || []);
    })
    dispatch({ type: 'ConsignmentCreate/getConsignmenCategorys' });
  }, [])

  return (
    <View className='goodgoods-wrap'>
      <View className='myvip-wrap'>
        <View style={{ height: '500px', lineHeight: '500px', textAlign: 'center' }}>
          <Image style='width: 100%;height: 100%;' src={bg || 'https://xtblapi.leclubthallium.com/Public/static/images/defaultdatecardbg.jpg'} />
        </View>
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small'  onClick={handleOpen} className='n-color-btn'>
              购买会员
            </AtButton>
          </View>

          <AtButton size='small' onClick={handleCancel}>
            取消
          </AtButton>
        </View>
        <AtActionSheet isOpened={openModal} title='会员类型' onClose={ () => setOpenModal(false) }>
          {dCards.map((item: any) => {
            return <AtActionSheetItem onClick={() => handleSubmit({ cardid: item.id })}>
              {`${item.cardname}/${item.price}/(${USE_DAY_TYPE[item.usedaytype]})`}
            </AtActionSheetItem>
          })}
        </AtActionSheet>
      </View>
    </View>
  );
};
export default ConsignmentCreate;
