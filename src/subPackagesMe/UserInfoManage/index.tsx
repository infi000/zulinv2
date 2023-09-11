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
    if (opt['price']) {
      handleUpdateForm({ chargefee: (Number(opt['price']) * 0.05).toFixed(2) });
    }
  };
  const isVerify = `${userInfo.verify}` === '1';
  // 去签名
  const handleToSign = () => {
    if (isVerify) {
      showErrorToast("请勿重复提交");
      return;
    }
    if (!payProtocol) {
      showErrorToast("请勾选协议后，再进行提交");
      return;
    }
    if (!form.over18) {
      showErrorToast("请选择是否满18，再进行提交");
      return;
    }
    // 必填项 手机号，真实姓名，监护人姓名，监护人电话，监护人身份证；
    if (form.over18 === '0' && (!form.guardianname || !form.guardianphone || !form.guardiancard)) {
      showErrorToast("请填写监护人信息，再进行提交");
      return;
    }
    if (!form.realname || !form.mobile) {
      showErrorToast("请填写手机号，真实姓名");
      return;
    }
    createUserInfo({ ...form }).then((d) => {
      console.log(d);
    })

    if(form.over18 === '0' ){
      Taro.navigateBack({
        delta: 1,
        success: function (res) {
          Taro.showModal({
            title: '提交成功',
            content: '等待监护人签名中',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
         },
      });
      return;
    }

    const url = encodeURIComponent(`${h5_host}/uiResources/blank/signature?params=${JSON.stringify({ ...form })}&openid=${openid}`);
    console.log('去签名', url);
    // 提交接口
    Taro.navigateTo({
      url: "/subPackagesMe/WebView/index?url=" + url
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

  const dumpProtocol = (e) => {
    let src = e.currentTarget.dataset.url;
    const url = encodeURIComponent(`${h5_host}/uiResources/blank/wordApp?wordNum=${src}`);
    console.log('看合同', url);
    Taro.navigateTo({
      url: "/subPackagesMe/WebView/index?url=" + url
    })
  }
  const agreePayProtocol = () => {
    setPayProtocol(true);
  }
  console.log('form', form);
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
        <View className='at-row  at-row__align--center userinfo-form-item'>
          <View className='at-col at-col-3 userinfo-label'>已满18岁:</View>
          <View className='at-col'>
            <AtRadio
              options={[{ label: '是', value: '1' }, { label: '否', value: '0' }]}
              value={form.over18}
              onClick={(e) => handleUpdateForm({ over18: e })}
            />
          </View>
        </View>
        {
          form.over18 === '0' && (
            <Block>
              <View className='at-row  at-row__align--center userinfo-form-item'>
                <View className='at-col at-col-3 userinfo-label'>监护人姓名:</View>
                <View className='at-col'>
                  <AtInput
                    className='userinfo-input'
                    name='guardianname'
                    value={form.guardianname}
                    disabled={isVerify}
                    onChange={(e) => handleUpdateForm({ guardianname: e })}
                  />
                </View>
              </View>
              <View className='at-row  at-row__align--center userinfo-form-item'>
                <View className='at-col at-col-3 userinfo-label'>监护人身份证号:</View>
                <View className='at-col'>
                  <AtInput
                    className='userinfo-input'
                    name='guardiancard'
                    value={form.guardiancard}
                    disabled={isVerify}
                    onChange={(e) => handleUpdateForm({ guardiancard: e })}
                  />
                </View>
              </View>
              <View className='at-row  at-row__align--center userinfo-form-item'>
                <View className='at-col at-col-3 userinfo-label'>监护人电话:</View>
                <View className='at-col'>
                  <AtInput
                    className='userinfo-input'
                    name='guardianphone'
                    disabled={isVerify}
                    value={form.guardianphone}
                    onChange={(e) => handleUpdateForm({ guardianphone: e })}
                  />
                </View>
              </View>
              <View className='at-row  at-row__align--center userinfo-form-item'>
                <View className='at-col at-col-3 userinfo-label'>监护人联系地址:</View>
                <View className='at-col'>
                  <AtInput
                    className='userinfo-input'
                    name='guardianaddress'
                    disabled={isVerify}
                    value={form.guardianaddress}
                    onChange={(e) => handleUpdateForm({ guardianaddress: e })}
                  />
                </View>
              </View>
            </Block>
          )
        }
        {
          !isVerify && <View className='at-row  at-row__align--center userinfo-form-item'>
            <View className='at-col at-col-3 userinfo-label'>头像:</View>
            <View className='at-col'>
              <UploadHead length={1} ftype='1' />
            </View>
          </View>
        }
        {
          !isVerify && <View className='at-row  at-row__align--center userinfo-form-item'>
            <View className='at-col at-col-3 userinfo-label'>自拍头像:</View>
            <View className='at-col'>
              <UploadHead length={1} ftype='2' />
            </View>
          </View>
        }
        {
          !isVerify && <View>
            <View className='lease-order-pay-protocol'>
              <Radio onClick={agreePayProtocol} checked={payProtocol}></Radio>
              <View>
                我已阅读并同意
                <Text onClick={dumpProtocol} data-url="1" className='href-text'>《烯铊俱乐部安全责任协议书》</Text>与
                <Text onClick={dumpProtocol} data-url="2" className='href-text'>《会员入会协议》</Text>与
                <Text onClick={dumpProtocol} data-url="3" className='href-text'>《用户注册协议范本》</Text>
              </View>
            </View>
          </View>
        }

        <View className='edit-btn-wrap'>
          <View className='btn-submit'>
            <AtButton type='primary' size='small' onClick={handleToSign} disabled={isVerify}>
              {isVerify ? '已提交' : '下一步'}
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
