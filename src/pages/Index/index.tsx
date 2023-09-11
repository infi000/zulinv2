import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';
import Goods from './Modules/Goods'
import SwiperImg from './Modules/SwiperImg'
import Poster from './Modules/Poster';
import VideoPoster from './Modules/VideoPoster';
import Club from './Modules/Club';

import {getClassifySearchByType} from './services';

const Index = () => {
  
    // 顶部轮播图数据
    const [swiperData, setSwiperData] = useState<any>([]);
    const [middleData, setMiddleData] = useState<any>([]);
    const [footerData, setFooterData] = useState<any>([]);

    // 搜索框开始
    const [searchVal, setSearchVal] = useState<any>('');
    const searchChange = (value) =>{
        setSearchVal(value);
    }
    const searchClick = () => {
        console.log("搜索")
        Taro.showLoading({
            title: 'loading',
        })
        setTimeout(function () {
            Taro.hideLoading()
        }, 2000)
    }
    // 搜索框结束

    useEffect(()=> {
       
        // 获取头部轮播图
        getClassifySearchByType({ctype: 1}).then((res) => {
            console.log("首页数据1", res)
            res.sort((a,b)=>{
                return parseInt(a.sort)-parseInt(b.sort);
            })
            setSwiperData(res);
        });
        getClassifySearchByType({ctype: 2}).then((res) => {
            console.log("首页数据2", res)
            // 获取显示类型，img or video
            for(let i=0; i<res.length; i++){
                let item = res[i];
                let path = item.fpath;
                let suffix = path.substring(path.lastIndexOf(".")+1);
                if(suffix == 'mp4'){
                    res[i].type = 'video'
                }else{
                    res[i].type = 'image'
                }
            }
            // 排序
            res.sort((a,b)=>{
                return parseInt(a.sort)-parseInt(b.sort);
            })
            console.log("首页数据2-1", res);
            setMiddleData(res);
        });
        getClassifySearchByType({ctype: 3}).then((res) => {
            console.log("首页数据3", res)
            setFooterData(res);
        });
    }, [])

    return (
        <View className='index-warp'>
            {/* <AtSearchBar
                actionName='搜一下'
                value={searchVal}
                onChange={searchChange}
                onActionClick={searchClick}
            /> */}
            {/* // 轮播图 */}
           {swiperData.length > 0?(
                <SwiperImg datas={swiperData}></SwiperImg>
           ):''}
           
            {middleData.length > 0 ? (
                middleData.map((item, index)=>(
                    item.type == 'image'?(
                        <Club key={index} data={item}></Club>
                    ):(
                        <VideoPoster key={index} data={item}></VideoPoster>
                    )
                    
                ))
            ):''}

            {footerData.length > 0?(
                footerData.map((item, index) => (
                    <View>
                        <Poster key={index} data={item}></Poster>
                        <Goods key={index} data={item.goods}></Goods> 
                    </View>
                ))
            ):''}

            <View className='index-goods'>
            </View>
        </View>
    );
}

export default Index;
