import Taro, { useState, useDidShow, useRouter } from '@tarojs/taro';
import { View, Image, ScrollView,  } from '@tarojs/components';
import { AtListItem, AtList } from 'taro-ui'


import './index.scss';
import TaskItem from './TaskItem';
import {prebookhistory} from './services'

const img = "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";

const TaskList = () => {
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
        prebookhistory(params).then((res) => {
            console.log("历史列表",res)
            if(Object.keys(res.prebooks).length > 0){
                console.log(111);
                setList(res.prebooks);
                setTotal(res.total);
                setPage(page+1);
            }
            console.log(222);
        });
    };

    // 滑动到底部翻页
    const onScrollToLower = (e) => {
        getList();
    }

    return (
        <View className='TaskList-warp'>
            <View className='at-article TaskList-title'>
                <View className='at-article__h1 title-h1'>
                    历史任务状态
                </View>
            </View>
            <View className='TaskList-list'>
                <AtList>
                    <ScrollView  scrollY={true} scrollWithAnimation style={{ height: '100vh' }} onScrollToLower={onScrollToLower}>
                        {Object.keys(list).length > 0?(
                            Object.keys(list).map((item, index) => (
                                <TaskItem key={index} data={list[item]}></TaskItem>
                            ))
                        ):''}
                        
                    </ScrollView>
                </AtList>

            </View>
        </View>
    );
}

export default TaskList;