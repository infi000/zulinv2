import Taro, { useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui'


import './index.scss';

const LeaseRadio = (props) => {

    const [name, setName] = useState('');
    const [money, setMoney] = useState(0);
    const [timer, setTimer] = useState(0);

    const [styler, setStyler] = useState('LeaseRadio-warp');

    useEffect(()=>{
        setName(props.name);
        setMoney(props.money);
        setTimer(props.timer);
    },[]);

    return (
        <View className={props.status}>
            <View className='LeaseRadio-name'>{name}</View>
            <View className='LeaseRadio-money'>￥{money}</View>
            {/* <View className='LeaseRadio-timer'>
                <AtIcon value='clock' size='15' color='#E6A23C' className='timer-at-icon'></AtIcon>
                {timer}分钟
            </View> */}
        </View>
    )
}

export default LeaseRadio;