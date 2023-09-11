import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtButton, AtInputNumber } from 'taro-ui'


import './index.scss';


const TaskItem = (props) => {

    return (
        <View className='TaskItem-warp'>
            <View className='name'>{props.data.title}</View>
            <View className='TaskItem-title'>
                <View className='item'>任务开始时间</View>
                <View className='item'>任务目前状态</View>
                <View className='item'>完成时间</View>
            </View>
            {props.data.prebooks?(
                props.data.prebooks.map((item, index) => (
                    <View key={index} className='TaskItem-list'>
                        <View className='item'>{item.startusetime}</View>
                        <View className='item'>{item.ostatus}</View>
                        <View className='item'>{item.offtime}</View>
                    </View>
                ))
            ):''}
        </View>
    )
}

export default TaskItem;