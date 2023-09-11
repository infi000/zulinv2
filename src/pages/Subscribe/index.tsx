import Taro, { useEffect } from '@tarojs/taro';
import { View, ScrollView, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';

import './index.scss';
import { isArray } from 'lodash';

// 作废
const SortPage = () => {

    useEffect(()=>{
        Taro.getSetting({
            success: function (res) {
              // res.authSetting = {
              //   "scope.userInfo": true,
              //   "scope.userLocation": true
              // }
            }
          })
    },[])
    return (
        <View className='.page-wrap'>
            订阅页面
            
 
        </View>
    )

}

export default SortPage;