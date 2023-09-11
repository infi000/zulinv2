import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View,Text, Swiper, SwiperItem, Image, Picker } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtButton, AtInputNumber } from 'taro-ui'


import './index.scss';


const OrderTools = (props) => {

    return (
        <View className='tools-warp'>
            <View className='name'>
                {props.title != ""?(
                    <View className='title'>{props.title}</View>
                ):''}
                
                {props.name}{props.num}
            </View>
            {props.pricecolor?(
                <View className='price'>￥<Text  style={`color:${props.pricecolor}`}>{props.price}</Text></View>
            ):(
                <View className='price'>￥{props.price}</View>
            )}
            
        </View>
    )
}

export default OrderTools;