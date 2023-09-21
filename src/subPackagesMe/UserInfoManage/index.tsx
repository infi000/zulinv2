import Taro, { useState, useEffect, useRef } from '@tarojs/taro';
import { View, Text, Picker, Radio, Block } from '@tarojs/components';
import { AtButton, AtInput, AtList, AtListItem, AtRadio } from 'taro-ui';

import { useSelector, useDispatch } from '@tarojs/redux';
import { agreementregisterinfo, createUserInfo, getMeInfo } from './services';
import './index.scss';
import UploadHead from './modules/UploadHead';
import { showErrorToast } from '@/utils/util';

const h5_host = 'https://backstagedev.leclubthallium.com';
// const h5_host = 'http://localhost:3035';
const defaultForm: { [key: string]: any } = {};

const ConsignmentCreate = () => {
  const [payProtocol, setPayProtocol] = useState<any>(false)
  const { openid, userInfo } = useSelector((state) => state.main);

  const [form, setForm] = useState(defaultForm);
  const handleUpdateForm = (opt: any) => {
    console.log(opt);
    setForm((params) => {
      return { ...params, ...opt };
    });
  };
  const isVerify = undefined;;
  // 去签名
  const handleToSign = () => {
    if (isVerify) {
      showErrorToast("请勿重复提交");
      return;
    }
    if (!form.realname || !form.mobile) {
      showErrorToast("请填写手机号，真实姓名");
      return;
    }
    createUserInfo({ ...form }).then((d) => {
      Taro.showModal({
        title: '提交成功',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
  }
  const handleCancel = () => {
    Taro.navigateBack({
      delta: 1,
      success: function (res) { },
    });
    return;
  };
  useEffect(() => {
    getMeInfo().then((d) => {
      console.log(d);
      setForm({ ...d })
    })
  }, []);

  return (
    <View className='userinfo-wrap'>
      <View className='myvip-wrap'>
        <View className='at-row  at-row__align--center userinfo-form-item'>
          <View className='at-col at-col-3 userinfo-label'>昵称:</View>
          <View className='at-col'>
            <AtInput
              className='userinfo-input'
              name='nickname'
              disabled={isVerify}
              value={form.nickname}
              onChange={(e) => handleUpdateForm({ nickname: e })}
            />
          </View>
        </View>
        <View className='at-row  at-row__align--center userinfo-form-item'>
          <View className='at-col at-col-3 userinfo-label'>手机号:</View>
          <View className='at-col'>
            <AtInput
              className='userinfo-input'
              name='mobile'
              type='number'
              disabled={isVerify}
              value={form.mobile}
              onChange={(e) => handleUpdateForm({ mobile: e })}
            />
          </View>
        </View>
        <View className='at-row  at-row__align--center userinfo-form-item'>
          <View className='at-col at-col-3 userinfo-label'>真实姓名:</View>
          <View className='at-col'>
            <AtInput
              className='userinfo-input'
              name='realname'
              disabled={isVerify}
              value={form.realname}
              onChange={(e) => handleUpdateForm({ realname: e })}
            />
          </View>
        </View>
        <View className='at-row  at-row__align--center userinfo-form-item'>
          <View className='at-col at-col-3 userinfo-label'>生日:</View>
          <View className='at-col'>
            <Picker mode='date' disabled={isVerify} onChange={(e: any) => handleUpdateForm({ birthday: e.target.value })} value={form.birthday}>
              <AtList>
                <AtListItem extraText={form.birthday} />
              </AtList>
            </Picker>
          </View>
        </View>
        <View className='at-row  at-row__align--center userinfo-form-item'>
          <View className='at-col at-col-3 userinfo-label'>身份证:</View>
          <View className='at-col'>
            <AtInput
              className='userinfo-input'
              name='ucard'
              disabled={isVerify}
              type='number'
              value={form.ucard}
              onChange={(e) => handleUpdateForm({ ucard: e })}
            />
          </View>
        </View>
        <View className='at-row  at-row__align--center userinfo-form-item'>
          <View className='at-col at-col-3 userinfo-label'>性别:</View>
          <View className='at-col'>
            <AtRadio
              options={[{ label: '男', value: '1' }, { label: '女', value: '2' }]}
              value={form.sex}
              onClick={(e) => handleUpdateForm({ sex: e })}
            />
          </View>
        </View>

        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleToSign} disabled={isVerify}>
              {isVerify ? '已提交' : '提交'}
            </AtButton>
          </View>
          <View style={{ height: ' 20px' }}></View>
          <AtButton size='small' onClick={handleCancel}>
            取消
          </AtButton>
        </View>
        <View style={{ height: ' 20px' }}></View>
      </View>
    </View>
  );
};
export default ConsignmentCreate;
