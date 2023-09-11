import Taro, { scope, Component, useState, useDidShow, useEffect, showToast } from '@tarojs/taro';
import { View, Block, ScrollView, Picker } from '@tarojs/components';
import { AtButton, AtImagePicker, AtInput, AtInputNumber, AtList, AtListItem, AtRadio } from 'taro-ui';
import Uploader from '@/components/Uploader';

import { useSelector, useDispatch } from '@tarojs/redux';
import { createGoods, getClassifySearch, postPay } from './services';
import { isArray } from 'lodash';

import './index.scss';
import { showSuccessToast } from '@/utils/util';



const defaultForm: { [key: string]: any } = {gcid: '1'};

const ConsignmentCreate = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.ConsignmentCreate);
  // title:商品名称
  // thumbinal:商品预览图,文件域
  // des:商品描述
  // price:商品价格
  // chargefee:手续费
  // uphone:联系手机号
  // gcid:商品分类id 
  // pics[]:寄卖商品详情图，文件域
  const [form, setForm] = useState(defaultForm);
  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm((params) => {
      return { ...params, ...opt };
    });
    if(opt['price']){
      handleUpdateForm({ chargefee: (Number(opt['price'])*0.05).toFixed(2)})
    }
  };
  const handleSubmit = () => {
    // console.log(form);
    // return
    createGoods({ ...form }).then((d) => {
      showSuccessToast("提交成功")
      const {jgid  } = d;
      postPay({ jgid  }).then(d => {
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
      return;
    });
  };
  const handleCancel = () => {
    Taro.navigateBack({
      delta: 1, success: function (res) {

      }
    });
    return;
  };
  useEffect(() => {
    dispatch({ type: 'ConsignmentCreate/getConsignmenCategorys' });
  }, [])
  const handleUpdateForm2 = (e) => {
    console.log(e)
  }

  console.log('form', form);
  return (
    <View className='goodgoods-wrap'>
      <View className='myvip-wrap'>
        <AtInput
          className='goods-input'
          required
          name='title'
          title='商品名称'
          onChange={(e) => handleUpdateForm({ title: e })}
        />
        <AtInput
          className='goods-input'
          required
          name='des'
          title='商品描述'
          onChange={(e) => handleUpdateForm({ des: e })}
        />
        <AtInput
          className='goods-input'
          required
          name='price'
          title='商品价格'
          type='number'
          onChange={(e) => handleUpdateForm({ price: e })}
        />
        <AtInput
          className='goods-input'
          required
          name='chargefee'
          title='手续费'
          type='number'
          disabled
          onChange={(e) => {}}
          value={form.chargefee || 0}
        />
        <AtInput
          className='goods-input'
          required
          name='uphone'
          title='手机号'
          type='number'
          onChange={(e) => handleUpdateForm({ uphone: e })}
        />
        {/* <View>分类:<AtRadio
          options={categorys.map(item => ({ value: item.id, label: item.cname }))}
          value={form.gcid}
          onClick={(e) => handleUpdateForm({ gcid: e })}
        /></View> */}
        <View className='at-row  at-row__align--center'>
          <View className='at-col at-col-1 at-col--auto'>
            分类:
  </View>
          <View className='at-col'><AtRadio
            options={categorys.map(item => ({ value: item.id, label: item.cname }))}
            value={form.gcid}
            onClick={(e) => handleUpdateForm({ gcid: e })}
          /></View>
        </View>
        <View>
          预览图
          <Uploader count={1} uploadSucc={(e) => handleUpdateForm({ thumbinal: e })} imgtype='thum' />
        </View>
        <View>
          详情图
          <Uploader count={5} uploadSucc={(e) => handleUpdateForm({ pics: e })} imgtype='bigimg' />
        </View>
        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleSubmit}>
              提交
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
