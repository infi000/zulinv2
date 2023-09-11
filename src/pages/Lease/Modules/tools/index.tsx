import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui'


import './index.scss';

const LeaseTools = (props) => {

    const [name, setName] = useState('');
    const [pic, setPic] = useState('');

    useEffect(()=>{
        setName(props.name);
        setPic(props.pic);
    },[]);

    return (
        <View className={props.status}>
            <Image className='LeaseTools-img' src={pic}  mode='aspectFill'></Image>
            <View className='LeaseTools-name'>{name}</View>
        </View>
    )
}

export default LeaseTools;