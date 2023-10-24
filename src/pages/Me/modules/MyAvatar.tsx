/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-08-10 23:47:55
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-09-26 00:35:52
 * @FilePath: /zulin/src/pages/Me/modules/MyAvatar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';
import { View, Button, Block, Swiper, SwiperItem, Image } from '@tarojs/components';
import { AtAvatar, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';

import { logIn } from '@/utils/auth';

import '../index.scss';
import { FormatDate, formatDate, showErrorToast } from '@/utils/util';
import { setwxuserphone } from '../services'
import { CARD_TYPE } from '@/utils/constants';

const myType = {
  1: '普通会员',
  2: '年卡会员'
}
const MyAvatar = () => {
  const { isLogIn, wxUserInfo, userInfo } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const getPhoneNumber = (e) => {
    wx.getUserInfo({
      desc: '用于完善会员资料',
      success: async (res) => {
        console.log("获取到的用户信息：", res);
        // 这里提交数据到后端接口，成功返回后设置登录状态
        if ("getPhoneNumber:ok" == e.detail.errMsg) {
          await logIn({ dispatch, userInfo: res.userInfo, phone: { encryptedData: e.detail.encryptedData, iv: e.detail.iv } });
        } else {
          showErrorToast("登录失败")
        }

      },
      fail: (err) => {
        console.log(1212121, err)
      }
    })
    // return ;
    // console.log("获取手机号返回结果:", e.detail.errMsg) // 错误信息，如果获取失败则返回该信息
    // console.log("手机号iv用于解密操作：",e.detail.iv) // iv用于解密操作
    // console.log("密文，解密后可以获取手机号", e.detail.encryptedData) // 密文，解密后可以获取手机号


  }

  const handleLogIn = () => {
    // eslint-disable-next-line no-undef
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        logIn({ dispatch, userInfo: res.userInfo });
      }
    })
  };


  const handleSwitch = (e) => {
    try {
      console.log(e)
      // const res = await picketSearch({ orderid: params.orderid });
      // setInfo(res['pickets'][0]);
      // restTime(res['pickets'][0])
      // // const codeCon = get(res,['pickets',0,'codecontent'], '');
      // const W = wx.getSystemInfoSync().windowWidth;
      // const rate = 750.0 / W;
      // const qrcode_w = 300 / rate;

      // const codeCon = res['pickets'][0]['codecontent'];
      // const qrText = "/pages/PicketResult/index?data=" + codeCon;

      // const q = new QRCode('canvas', {
      //   // usingIn: this,
      //   text: qrText,
      //   width: qrcode_w,
      //   height: qrcode_w,
      //   padding: 12,
      //   colorDark: "#000000",
      //   colorLight: "#ffffff",
      //   correctLevel: QRCode.CorrectLevel.H,
      //   callback: (res) => {
      //     // 生成二维码的临时文件
      //     console.log(res.path)
      //     console.log(qrcode_w)
      //   }
      // });
      // console.log(q);
    } catch (error) {
      showErrorToast(error.toString())
    }
  }
  console.log('userInfo', userInfo);


  return (
    <View className='my-avatar-con'>
      <View className='at-row at-row__align--center  my-avatar-top'>
        {isLogIn ? (
          <Block key={JSON.stringify(userInfo)}>
            <View className='at-col  at-col-3'>
              <AtAvatar circle image={userInfo.face}></AtAvatar>
            </View>
            <View className='at-col'>{userInfo.nickname}</View>
            <View className='at-col'>{myType[userInfo.mtype] ? myType[userInfo.mtype] : ''}</View>
            {/* <View className='at-col'>{userInfo.nickname}</View> */}
          </Block>
        ) : (
          // onClick={handleLogIn}
          <Button open-type="getPhoneNumber" onGetPhoneNumber={getPhoneNumber} >
            授权登录
          </Button>
        )}
      </View>
      {
        <View className='Swiper-con' style={{ display: !Array.isArray(userInfo.cards) || userInfo.cards.length === 0 ? 'none' : '' }}>


          <Swiper
            onChange={handleSwitch}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay={false}
            style={{ height: '100%' }}
          >
            {(Array.isArray(userInfo.cards) ? userInfo.cards : []).map((item, index) => (
              <SwiperItem key={index}>
                <View className='mycard-con'>
                  <View className='swiper-desc'>卡类型： {CARD_TYPE[item.cardtype]}</View>
                  <View className='swiper-img-con'><Image src={item.codeurl || 'https://beyondplayapi.leclubthallium.com/Public/static/images/defaultucardbg.jpg'} className='swiper-img' /></View>
                  <View className='at-row  at-row__align--center swiper-desc2'>
                    <View className='at-col at-col-1 at-col--auto'>有效期：{formatDate(item.cardexpired)}</View>
                    <View className='at-col'></View>
                    <View className='at-col'>{
                      item.cardtype == 4 && <View>次数：{item.leftcount}/{item.totalcount}</View>
                    }
                    </View>
                  </View>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      }
      {
        isLogIn &&   <AtModal isOpened={userInfo.isbindphone == 0}>
        <AtModalHeader>获取您的手机号</AtModalHeader>
        <AtModalContent>
          <View style={{ textAlign: 'center'}}>比莱童园申请获取并验证您的手机号</View>
        </AtModalContent>
        <AtModalAction>
           <Button>取消</Button> 
           <Button open-type="getPhoneNumber" onGetPhoneNumber={getPhoneNumber} >确定</Button>
         </AtModalAction>
      </AtModal>
      }
    
    </View>
  );
};

export default MyAvatar;
