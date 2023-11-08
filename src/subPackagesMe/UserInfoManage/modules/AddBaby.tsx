/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-11-05 23:53:09
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-11-07 00:25:48
 * @FilePath: /zulinv2/src/subPackagesMe/UserInfoManage/modules/AddBaby.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtInput, AtButton, AtMessage, AtListItem, AtList } from 'taro-ui';
// import {getList,getIndex,areaList} from '@/utils/area';
import '../index.scss';

const SEX_TYPE = {
  1: '男',
  2: '女',
};

const SEX_MAP = Object.keys(SEX_TYPE).map(key => ({label: SEX_TYPE[key], value: key}));

const { useState } = Taro;
const AddBaby = () => {
  const { modal } = useSelector((state) => state.UserInfoManage);
  const dispatch = useDispatch();
  const [form, setForm] = useState(() => {
    const res = modal.data || {};
    const { babyname, birthday, sex } = res;
    res.babyname = babyname;
    res.birthday = birthday;
    res.sex = sex;
    return res;
  });
  // const selector = [['美国', '中国', '巴西', '日本'],[1,2,3,4],['s','d','r']];
  const handleUpdateForm = (item) => {
    console.log('item', item);
    setForm((params) => {
      return { ...params, ...item };
    });
  };
  // const handleChangePicker = (e) => {
  //   console.log(e.detail.value);
  //   // setSelect1(e.detail.value);
  // };
  const handleCancel = (e) => {
    dispatch({ type: 'UserInfoManage/updateModal', payload: { type: 'create', show: false, data: {} } });
  };
  const handleSubmit = () => {
    const { babyname, birthday, sex } = form;
    if (!babyname || !birthday || !sex) {
      Taro.atMessage({
        'message': '请填写完整信息',
        'type': 'warning',
      });
      return;
    }
    dispatch({ type: 'UserInfoManage/Addchild', params: form });
  };

  return (
    <View>
      <AtMessage />
      <AtInput
        name='babyname'
        title='宝贝姓名'
        type='text'
        value={form.babyname}
        onChange={(e) => handleUpdateForm({ babyname: e })}
      />
      <Picker mode='date' onChange={(e:any) => handleUpdateForm({ birthday: e.target.value })} value={form.birthday}>
        <AtList>
          <AtListItem title='生日' extraText={form.birthday} />
        </AtList>
      </Picker>
      <Picker mode='selector' range={SEX_MAP} onChange={(e:any) => handleUpdateForm({ sex: e.target.value? (SEX_MAP[e.target.value])['value'] :"0" })} value={form.sex} rangeKey='label'>
        <AtList>
          <AtListItem
            title='性别'
            extraText={form.sex ? SEX_TYPE[form.sex]: ''}
          />
        </AtList>
      </Picker>

      <View className='edit-btn-wrap'>
        <View className='btn-submit'>
          <AtButton type='primary' size='small'  className='n-color-btn' onClick={handleSubmit}>
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

export default AddBaby;
