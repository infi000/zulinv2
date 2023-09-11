import Taro, { scope, Component, useState, useDidShow, useEffect, showToast } from '@tarojs/taro';
import { View, Block, ScrollView, Image } from '@tarojs/components';
import { AtButton, AtImagePicker, AtInput, AtInputNumber, AtList, AtListItem, AtRadio } from 'taro-ui';
import Uploader from '@/components/Uploader';

import { useSelector, useDispatch } from '@tarojs/redux';
import { createGoods, getClassifySearch, getbg, postPay } from './services';
import { isArray } from 'lodash';

import './index.scss';
import { showSuccessToast } from '@/utils/util';



const defaultForm: { [key: string]: any } = {};

const ConsignmentCreate = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.ConsignmentCreate);

  const [form, setForm] = useState(defaultForm);
  const [bg, setBg] = useState('');

  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm((params) => {
      return { ...params, ...opt };
    });
  };
  const handleSubmit = () => {
    // console.log(form);
    // return
    postPay(form).then(d => {
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
          showToast("购买失败");
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
  useEffect(() => {
    getbg({ sname: 'yearbg' }).then((d) => {
      const { pic } = d;
      setBg(pic);
    })
    dispatch({ type: 'ConsignmentCreate/getConsignmenCategorys' });
  }, [])

  return (
    <View className='goodgoods-wrap'>
      <View className='myvip-wrap'>
        <View style={{ height: '500px', lineHeight: '500px', textAlign: 'center' }}>
          <Image style='width: 100%;height: 100%;' src={bg} />
        </View>
        <View className='at-row  at-row__align--center' style={{ margin: '10px 0'}}>
          <View className='at-col at-col-1 at-col--auto'>邀请码:</View>
          <View className='at-col'>
             <AtInput
              className='goods-input'
              name='key'
              onChange={(e) => handleUpdateForm({ key: e })}
            />
          </View>
        </View>
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleSubmit}>
              购买会员
            </AtButton>
          </View>

          <AtButton size='small' onClick={handleCancel}>
            取消
          </AtButton>
        </View>
      </View>
    </View>
  );
};
export default ConsignmentCreate;
