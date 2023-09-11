import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import '../index.scss';

const ImageIntro = (props) => {

    return (
        <View className='lease-detail-club-one'>
            <Image className='lease-detail-club-one-img' src={props.fpath} mode="widthFix" />
            {props.data.showmore == "1"?(
                <View className='more'>
                    <Text>更多</Text>
                    <View className='at-icon at-icon-search'></View>
                </View>
            ):''}
            
        </View>
    );
}

export default ImageIntro;