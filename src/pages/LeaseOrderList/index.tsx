import Taro, { useState, useDidShow, useRouter } from '@tarojs/taro';
import { View, Image, ScrollView,  } from '@tarojs/components';
import { AtListItem, AtList } from 'taro-ui'


import './index.scss';
import {getOrderList} from './services'

const img = "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";

const LeaseOrderList = () => {
    const pageSize = 20;
    const [list, setList] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    useDidShow(()=>{
        getList();
    });

    const getList = () => {
        let params = {
            pageNum: page,
            pageSize: pageSize,
        }
        getOrderList(params).then((res) => {
            console.log("订单列表",res)
            if(res.orders.length > 0){
                setList(res.orders);
            }
            setTotal(res.total);
            setPage(page+1);
        });
    };

    const dumpLease = (event) => {
        console.log(event);
        let id = event.currentTarget.dataset.id;
        Taro.navigateTo({ url: '/pages/LeaseOrder/index?orderId=' + id + "&pageType=1"+"&identity=my" });
    }

    // 滑动到底部翻页
    const onScrollToLower = (e) => {
        getList();
    }

    return (
        <View className='LeaseOrderList-warp'>
            <View className='at-article LeaseOrderList-title'>
                <View className='at-article__h1 title-h1'>
                    预约订单
                </View>
            </View>
            <View className='LeaseOrderList-list'>
                <AtList>
                    <ScrollView  scrollY={true} scrollWithAnimation style={{ height: '100vh' }} onScrollToLower={onScrollToLower}>
                        {list.map((item, index)=>(
                            <View className='LeaseOrderList-img' key={index} data-id={item.id} data-title={item.title} onClick={dumpLease}>
                                <AtListItem
                                data-oid={item.id}
                                title={(item.ostatus == "0"?'待支付 - ':(item.ostatus == "1"?'待核销 - ':(item.ostatus == "2"?'已核销 - ':'已关闭 - ')))+item.title}
                                note={"订单金额："+item.totalpay+" 申请人数："+(item.waitusercount?item.waitusercount:0)}
                                extraText='查看'
                                arrow='right'
                                thumb={item.thumbinal}
                                />
                                
                            </View>
                        ))}
                    </ScrollView>
                </AtList>

            </View>
        </View>
    );
}

export default LeaseOrderList;