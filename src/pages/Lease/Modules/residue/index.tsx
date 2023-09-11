import Taro, { useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';


import './index.scss';

const Residue = (props) => {

    const [num, setNum] = useState('');
    const [money, setMoney] = useState(0);
    const [timer, setTimer] = useState('');

    useEffect(()=>{
        setNum(props.num);
        setMoney(props.money);
        setTimer(props.timer);
    },[]);

    return (
        <View className={props.status}>
            <View className='Residue-money'></View>
            {/* ￥{money} */}
            <View className='Residue-timer'>{timer}</View>
            <View className='Residue-name'>{props.num}</View>
            {/* {num} */}
        </View>
    )
}

export default Residue;