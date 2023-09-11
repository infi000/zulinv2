import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { showSuccessToast } from '@/utils/util';
import { subMsg, getAllTemplate } from '../services';
import '../index.scss';
import { isArray } from 'lodash';
import { useSelector } from '@tarojs/redux';
import { AtIcon } from 'taro-ui'

const LIST_URL_MAP = [
  // { name: '抽奖', url: '/pages/Choujiang/index' },
  // { name: '照片墙', url: '/pages/PhotoWall/index' },
  // { name: '个人中心', url: '/subPackagesMe/UserInfoManage/index', icon: { val: 'user', color: '#FF9800' } },
  { name: '年卡会员购买', url: '/subPackagesMe/BuyVip/index', icon: { val: 'money', color: '#FF9800' } },
  { name: '购买铊币', url: '/subPackagesMe/BuyTabi/index', icon: { val: 'sketch', color: '#FF9800' } },
  { name: '寄卖', url: '/subPackages/ConsignmentMenu/index', icon: { val: 'mail', color: '#F44336' } },
  // { name: '收藏', url: '/pages/Collect/index' },
  // { name: '我的藏品', url: '/pages/MyVip/index' },
  { name: '地址管理', url: '/pages/Address/index', icon: { val: 'tag', color: '#2196F3' } },
  // { name: '寄卖列表', url: '/subPackages/Consignment/index' },
  // { name: '寄卖售出列表', url: '/subPackages/ConsignmentSaleList/index' },
  // { name: '寄卖购买列表', url: '/subPackages/ConsignmentBuyList/index' },
  // { name: '发布寄卖', url: '/subPackages/ConsignmentCreate/index' },

  // { name: '', url: '/subPackages/Consignment/index' },
  // { name: '客服', url: '/pages/Kefu/index' },

];

// const tmplIds = ['vqWshHTalxdFaNqhdSWJ8Mkb7HsysV39m1h9Yk-94hY', '05mTNKODj3164t8tEgu60oLUyqddSUHtjAOS6i1S0Zs'];
const Others = () => {
  // const [tmplIds, setTmplIds]: [string[], any] = useState([]);
  const { wxUserInfo, userInfo } = useSelector((state) => state.main);

  const handleClickItem = (url) => {
    Taro.navigateTo({ url });
  };
  // const handleSubscribe = (url) => {
  //   Taro.requestSubscribeMessage({
  //     tmplIds: tmplIds,
  //     success: function (res) {
  //       const templateids: string[] = [];
  //       tmplIds.forEach((id) => {
  //         if (res[id] === 'accept') {
  //           templateids.push(id);
  //         }
  //       });
  //       if (templateids.length > 0) {
  //         subMsg({ templateids: templateids.join(",") })
  //         showSuccessToast('提交成功');
  //       }
  //     },
  //   });
  // };
  const handleCarm = () => {
    // eslint-disable-next-line no-undef
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("扫码结果：", res);
        Taro.navigateTo({ url: res.result });
      }
    })
  }
  const handleLeaseOrder = () => {
    Taro.navigateTo({ url: "/pages/LeaseOrderList/index" });
  }
  // const handleTaskList = () => {
  //   Taro.navigateTo({ url: "/pages/TaskList/index" });
  // }
  useEffect(() => {
    // getAllTemplate().then(d => {
    //   const temids = isArray(d) ? d.map(item => item.templateid) : [];
    //   // setTmplIds(temids);
    // })
  }, [])

  return (
    <View className='me-other-wrap'>
      {/* verify: 1审核通过，2审核不通过 */}
      {
        //  `${userInfo.verify}` !== '1' &&
         true &&
        <View className='at-row me-others-con' onClick={() => { handleClickItem('/subPackagesMe/UserInfoManage/index'); }}>
          <View className='at-col-1 textL'><AtIcon value='user' size='18' color='#FF9800' /></View>
          <View className='at-col-5 textL'>个人中心</View>
          <View className='at-col-6 textR'><AtIcon value='chevron-right' size='18' /></View>
        </View>
      }
      {LIST_URL_MAP.map((item) => {
        const { name, url, icon } = item;
        return (
          <View
            className='at-row me-others-con'
            key={name}
            onClick={() => {
              handleClickItem(url);
            }}
          >
            <View className='at-col-1 textL'><AtIcon value={icon.val} size='18' color={icon.color} /></View>
            <View className='at-col-5 textL'>{name}</View>
            <View
              className='at-col-6 textR'
            // onClick={() => {
            //   handleClickItem(url);
            // }}
            ><AtIcon value='chevron-right' size='18' /></View>
          </View>
        );
      })}
      {/* <View className='at-row me-others-con' onClick={handleSubscribe}>
        <View className='at-col-6 textL'>消息订阅</View>
        <View className='at-col-6 textR'></View>
      </View> */}
      {/* // ut: 1不可验票，2可验票\ */}
      {
        userInfo.ut === '2' && <View className='at-row me-others-con' onClick={handleCarm}>
          <View className='at-col-1 textL'><AtIcon value='repeat-play' size='18' color='#2196F3' /></View>
          <View className='at-col-5 textL'>扫码</View>
          <View className='at-col-6 textR'><AtIcon value='chevron-right' size='18' /></View>
        </View>
      }
      <View className='at-row me-others-con' onClick={handleLeaseOrder}>
        <View className='at-col-1 textL'><AtIcon value='bell' size='18' color='#2196F3' /></View>
        <View className='at-col-5 textL'>预约订单</View>
        <View className='at-col-6 textR'><AtIcon value='chevron-right' size='18' /></View>
      </View>
      <View className='at-row me-others-con'>
        <Button open-type="contact" className='hideButton'>
          客服
        </Button>
        <View className='at-col-1 textL'><AtIcon value='message' size='18' color='#2196F3' /></View>
        <View className='at-col-5 textL'>客服</View>
        <View className='at-col-6 textR'><AtIcon value='chevron-right' size='18' /></View>
      </View>
      {/* <View className='at-row me-others-con' onClick={handleTaskList}>
        <View className='at-col-1 textL'><AtIcon value='numbered-list' size='18' color='#2196F3' /></View>
        <View className='at-col-5 textL'>任务中心</View>
        <View className='at-col-6 textR'><AtIcon value='chevron-right' size='18' /></View>
      </View> */}
    </View>
  );
};

export default Others;
