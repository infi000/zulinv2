import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtButton, AtInputNumber } from 'taro-ui'


import './index.scss';
import "taro-ui/dist/style/components/button.scss";


const Apply = (props) => {


    const pass = (event) => {
        console.log("child:",event)
        props.pass()
    }

    return (
        <View className='Apply-warp'>
            <View className='name'>用户{props.name}申请加入实验，是否通过？</View>
            <View className='btn'>
                <Button className='btn-s' data-jid={props.jid} onClick={props.pass} type='primary'>通过</Button>
                <Button className='btn-s' type={'default'} data-jid={props.jid} onClick={props.unpass}>拒绝</Button>
            </View>
        </View>
    )
}

export default Apply;