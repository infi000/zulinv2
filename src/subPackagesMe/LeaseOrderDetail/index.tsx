import Taro, { useState, useDidShow, useRouter } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtTag } from 'taro-ui'


import './index.scss';
import Tools from './Modules/OrderTools';
import { orderDetail } from './services'


const LeaseOrder = () => {
    const router = useRouter();
    // 接口数据ostatus:0已下单未支付， 1已支付未核销，2核销完成，3关闭
    const [orderInfo, setOrderInfo] = useState<any>({});



    useDidShow(async () => {
        const { params } = router;
        const { ordercode } = params;
        orderDetail({ ordercode: ordercode }).then((res) => {
            setOrderInfo(res);
        });
    });

    return (
        <View className='LeaseOrder-warp'>
            <View className='LeaseOrder-title'>
                <View className='lease-before-icon'></View>
                订单信息
            </View>
            <View className='LeaseOrder-orderinfo'>
                <View className='order-info'>
                    <View className='image'>
                        <Image className='image-img' src={orderInfo.prebook.thumbinal} mode='aspectFit' />
                    </View>
                    <View className='text'>
                        <View className='title'>{orderInfo.prebook.etitle}-{orderInfo.prebook.eptitle}</View>
                        {/* <View className='money'>金额：￥{orderInfo.prebook.epprice}*{parseInt(orderInfo.prebook.duration) / 60}</View> */}
                        <View className='money'>订单号：{orderInfo.orderid}</View>
                        <View className='money'>预约日期：{orderInfo.prebook.starttimestr.substring(0, 10)}</View>
                        <View className='money' style={"margin-left:55px"}>{orderInfo.prebook.starttimestr.substring(11)} ~ {orderInfo.prebook.endtimestr.substring(11)}</View>
                    </View>
                </View>
            </View>
            <View className='LeaseOrder-tools'>
                <Tools title={"项目名称："} name={orderInfo.prebook.eptitle + " " + orderInfo.prebook.epprice + "*"} num={parseInt(orderInfo.prebook.duration) / 60} price={orderInfo.prebook.eptotalprice}></Tools>
                <Tools title={"门  票："} name={orderInfo.prebook.etitle + "*"} num={parseInt(orderInfo.prebook.duration) / 60} price={orderInfo.deposit}></Tools>
                {orderInfo.prebook.tools.map((item, index) => (
                    <Tools title={"工具佣金："} key={index} name={item.title} num="" price={item.price}></Tools>
                ))}
            </View>
            <View className='LeaseOrder-sale'>
                <View className='title'>年卡会员</View>
                <Tools title={""} key={101} name={"门票减免"} num="" price={"-" + orderInfo.yearsubtract} pricecolor='red'></Tools>
                <Tools title={""} key={101} name={"项目减免"} num="" price={"-" + orderInfo.discount} pricecolor='red'></Tools>
            </View>
            {/*  TODO ostatus >= 1  */}
            <View className='LeaseOrder-people'>
                <View className='title'>项目合作</View>
                <View className='start-people'>
                    <Text className='title'>发起人：</Text>{orderInfo.uname}
                </View>
                <View className='start-people'>
                    <Text className='title'>参与人：</Text>
                    <View className='join'>
                        {orderInfo.prebook.prebookusers.map((item, index) => (
                            item.vstatus == 1 ? (
                                <AtTag key={index} className='tag'>{item.uname}</AtTag>
                            ) : ''
                        ))}
                    </View>
                </View>

            </View>
        </View>
    )
}

export default LeaseOrder;