/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-02 20:24:37
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-18 23:13:36
 * @FilePath: /zulinv2/src/subPackages/Paidui/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect,useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard } from 'taro-ui'
import { HOST } from '@/config/api';
import './index.scss';

const Paidui = () => {


    useDidShow(()=>{
    });



    return (
        <View className='Paidui-warp'>
            <Image style={{ width: '100%'}}  src={HOST + '/Uploads/PaiDui/1111.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}   src={HOST + '/Uploads/PaiDui/2.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}    src={HOST + '/Uploads/PaiDui/3.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}    src={HOST + '/Uploads/PaiDui/4.png'} mode="widthFix" />
            <Image style={{ width: '100%'}}    src={HOST + '/Uploads/PaiDui/5.png'} mode="widthFix" show-menu-by-longpress/>
        </View>
    );
}

export default Paidui;