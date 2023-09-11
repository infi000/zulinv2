import Taro, { useState, useEffect,useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { AtList, AtListItem, AtCard } from 'taro-ui'


import './index.scss';
import { getListData } from './services';

const img = "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";
const LeaseList = () => {

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
        getListData(params).then((res) => {
            if(res.experiments.length > 0){
                setList(res.experiments);
            }
            setTotal(res.total);
            setPage(page+1);
        });
    };

    const dumpLease = (event) => {
        console.log(event);
        let id = event.currentTarget.dataset.id;
        // let title = event.currentTarget.dataset.title;
        // let swiper = event.currentTarget.dataset.swiper;
        Taro.navigateTo({
          url: "/pages/Lease/index?eid="+id//+"&title="+title+"&swiper="+JSON.stringify(swiper)
        });
    }

    // 滑动到底部翻页
    const onScrollToLower = (e) => {
        getList();
    }

    return (
        <View className='LeaseList-warp'>
            <View className='at-article LeaseList-title'>
                <View className='at-article__h1 title-h1'>
                    预约产品
                </View>
            </View>
            <View className='LeaseList-list'>
                <AtList>
                    <ScrollView  scrollY={true} scrollWithAnimation style={{ height: '100vh' }} onScrollToLower={onScrollToLower}>
                        {list.map((item, index)=>(
                            <View className='LeaseList-img' key={index} data-id={item.id} data-title={item.title} data-swiper={item.pics} onClick={dumpLease}>
                                {/* <AtListItem
                                title={item.title}
                                note={item.des}
                                extraText='预约'
                                arrow='right'
                                thumb={item.thumbinal}
                                /> */}
                                <AtCard
                                    note={item.des}
                                    title={item.title}
                                    thumb={item.thumbinal}
                                >
                                <Image  src={item.thumbinal} mode="aspectFit" />
                                </AtCard>
                            </View>
                        ))}
                    </ScrollView>
                </AtList>

            </View>
        </View>
    );
}

export default LeaseList;