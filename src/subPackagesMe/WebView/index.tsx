/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:39:41
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-01 02:22:55
 * @FilePath: /zulin/src/subPackagesMe/UserInfoManage/modules/Word1App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 烯铊俱乐部安全责任协议书
import Taro, { scope, Component, useState, useDidShow, useEffect, showToast, useRouter } from '@tarojs/taro';
import { View, Block, Text, Picker, WebView } from '@tarojs/components';
import { AtButton, AtImagePicker, AtInput, AtInputNumber, AtList, AtListItem  } from 'taro-ui';
// import html2canvas from 'html2canvas';

interface IProps {
  sign: string;

}

const App = () => {
  const router:any = useRouter();
  const  { url } = router.params;
  console.log(router);
  console.log(url);
  return <WebView src={url} />
  
}

export default App;
