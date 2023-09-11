import Taro from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtInput, AtButton, AtMessage, AtListItem } from 'taro-ui';
// import {getList,getIndex,areaList} from '@/utils/area';
import '../index.scss';

const { useState } = Taro;
const EditAddress = () => {
  const { modal } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const [form, setForm] = useState(() => {
    const res = modal.data || {};
    const { cellphone, realname } = res;
    res.uname = realname;
    res.phone = cellphone;
    res.cellphone && delete res.cellphone;
    res.realname && delete res.realname;
    return res;
  });
  // const selector = [['美国', '中国', '巴西', '日本'],[1,2,3,4],['s','d','r']];
  const handleUpdateForm = (item) => {
    setForm((params) => {
      return { ...params, ...item };
    });
  };
  // const handleChangePicker = (e) => {
  //   console.log(e.detail.value);
  //   // setSelect1(e.detail.value);
  // };
  const handleCancel = (e) => {
    dispatch({ type: 'address/updateModal', payload: { type: 'create', show: false, data: {} } });
  };
  const handleSubmit = () => {
    const { uname, phone, address } = form;
    if (!uname || !phone || !address) {
      Taro.atMessage({
        'message': '请填写必填项',
        'type': 'warning',
      });
      return;
    }
    dispatch({ type: 'address/saveAddress', params: form });
  };

  return (
    <View>
      <AtMessage />
      <AtInput
        required
        name='uname'
        title='收货人'
        type='text'
        placeholder='请输入收货人姓名'
        value={form.uname}
        onChange={(e) => handleUpdateForm({ uname: e })}
      />
      <AtInput
        required
        name='phone'
        title='联系电话'
        type='phone'
        placeholder='请输入收货人手机号'
        value={form.phone}
        onChange={(e) => handleUpdateForm({ phone: e })}
      />
      <AtInput
        required
        name='province'
        title='省'
        type='text'
        placeholder='请输入所在地区'
        value={form.province}
        onChange={(e) => handleUpdateForm({ province: e })}
      />
      <AtInput
        name='city'
        title='市'
        type='text'
        placeholder='请输入所在地区'
        value={form.city}
        onChange={(e) => handleUpdateForm({ city: e })}
      />
      <AtInput
        name='area'
        title='区/县'
        type='text'
        placeholder='请输入所在地区'
        value={form.area}
        onChange={(e) => handleUpdateForm({ area: e })}
      />
      <AtInput
        name='address'
        title='详细地址'
        type='text'
        placeholder='请输入详细地址'
        value={form.address}
        onChange={(e) => handleUpdateForm({ address: e })}
      />

      {/* <Picker mode='multiSelector' range={selector} value={select1} onChange={handleChangePicker} onColumnChange={handleColumnChang}>
        <AtList>
          <AtListItem title='国家地区' />
        </AtList>
      </Picker> */}
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
  );
};

export default EditAddress;
