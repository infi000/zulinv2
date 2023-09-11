import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, ScrollView, Image, Text } from '@tarojs/components';

import './index.scss';

import { getexperiments } from './services';

const SearchLease = () => {
    const route = useRouter();
    const [list, setList] = useState<any>([]);
    const pageSize = 20;
    const [page, setPage] = useState(1);

    useEffect(() => {
        getListData(page);
    }, [])

    // 滑动到底部翻页
    const onScrollToLower = (e) => {
        console.log("onScrollToLoweronScrollToLoweronScrollToLower");
        let _page = page + 1;
        getListData(_page);
    }

    const getListData = (page) => {
        let {cid, title} = route.params;
        // let cid = 104;
        // let title = '打';
        let offset = (page - 1) * pageSize;
        if (cid && title) {
            let data = {
                cid: cid,
                title: title,
                offset: offset,
                count: 1000,
            };
            getexperiments(data).then((res) => {
                console.log("搜索预约结果", res);
                if (res.experiments.length > 0) {
                    setPage(page);
                    setList(res.experiments);
                }

            });
        }
    }

    return (
        <View className='search-lease-warp'>
            <ScrollView scrollY={true} scrollWithAnimation style={{ height: '100vh' }} onScrollToLower={onScrollToLower}>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <View key={index}>
                            <Image
                                style='width: 100%; heibackground: #fff;'
                                // mode='aspectFit' 
                                src={item.thumbinal}
                            ></Image>
                            <View className='search-lease-list-title'>
                                <Text>实验项目名称：{item.title}</Text>
                            </View>
                        </View>
                    ))

                ) : ''}


            </ScrollView>
        </View>
    );
}

export default SearchLease;