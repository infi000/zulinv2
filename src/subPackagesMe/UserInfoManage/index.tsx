import Taro, { useState, useEffect, useRef } from '@tarojs/taro';
import { View, Text, Picker, Radio, Block } from '@tarojs/components';
import { AtButton, AtInput, AtList, AtListItem, AtRadio } from 'taro-ui';

import { useSelector, useDispatch } from '@tarojs/redux';
import { agreementregisterinfo, createUserInfo, getMeInfo } from './services';
import './index.scss';
import UploadHead from './modules/UploadHead';
import { showErrorToast } from '@/utils/util';
import AddBaby from './modules/AddBaby';

const h5_host = 'https://backstagedev.leclubthallium.com';
// const h5_host = 'http://localhost:3035';
const defaultForm: { [key: string]: any } = {};
const SEX_TYPE = {
  1: '男',
  2: '女',
};

const ConsignmentCreate = () => {
  const [payProtocol, setPayProtocol] = useState<any>(false)
  const { openid, userInfo } = useSelector((state) => state.main);
  const { modal, children } = useSelector((state) => state.UserInfoManage);
  const [form, setForm] = useState(defaultForm);
  const [bbList, setBbList] = useState([]);
  const dispatch = useDispatch();

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
    if (!form.nickname || !form.mobile) {
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
  const handleAddBB = () => {
    setBbList((params) => {
      return [...params, 1];
    })
  };
  useEffect(() => {
    getMeInfo().then((d) => {
      console.log(d);
      setForm({ ...d })
    })
    dispatch({ type: 'UserInfoManage/getChildren' })
  }, []);
  console.log('modal', modal);
  console.log('children', children);

  /**
 * 添加新地址
 */
  const handleAddBaby = () => {
    dispatch({ type: 'UserInfoManage/updateModal', payload: { show: true, type: 'create', data: {} } });
  };


  return !modal.show ? (
    <View className='userinfo-wrap'>
      <View className='myvip-wrap'>
        <View className='myvip-card'>
          <View className='at-row  at-row__align--center userinfo-form-item'>
            <View className='at-col at-col-3 userinfo-label'>家长姓名:</View>
            <View className='at-col'>
              <AtInput
                className='userinfo-input'
                name='nickname'
                value={form.nickname}
                disabled={isVerify}
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
        </View>


        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton size='small' className='n-color-btn' onClick={handleToSign} disabled={isVerify}>
              {isVerify ? '已提交' : '提交'}
            </AtButton>
          </View>
        </View>
        {
          children.map((item: any, index: any) => {
            return <View className='myvip-card'>
              <View className='at-row  at-row__align--center userinfo-form-item'>
                <View className='at-col at-col-3 userinfo-label'>宝贝姓名:</View>
                <View className='at-col'>
                  <AtInput
                    className='userinfo-input'
                    name='babyname'
                    disabled={true}
                    value={item.babyname}
                    onChange={() => { }}
                  />
                </View>
              </View>
              <View className='at-row  at-row__align--center userinfo-form-item'>
                <View className='at-col at-col-3 userinfo-label'>生日:</View>
                <View className='at-col'>
                  <AtInput
                    className='userinfo-input'
                    name='birthday'
                    disabled={true}
                    value={item.birthday}
                    onChange={() => { }}
                  />
                </View>
              </View>
              <View className='at-row  at-row__align--center userinfo-form-item'>
                <View className='at-col at-col-3 userinfo-label'>性别:</View>
                <View className='at-col'>
                  <AtInput
                    className='userinfo-input'
                    name='sex'
                    disabled={true}
                    value={item.sex? SEX_TYPE[item.sex]:''}
                    onChange={() => { }}
                  />
                </View>
              </View>
            </View>
          })
        }
         <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton size='small' className='n-color-btn' onClick={handleAddBaby}>
            添加宝贝
            </AtButton>
          </View>
        </View>
                <View style={{ height: ' 20px' }}></View>

      </View>
    </View>
  ) : <AddBaby />;
};
export default ConsignmentCreate;
