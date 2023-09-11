import Taro, { useState, useEffect } from '@tarojs/taro';
import { View,Swiper, SwiperItem, Image, Text } from '@tarojs/components';
import '../index.scss';
import { dumpByType } from '../services';

const SwiperImg = (props) => {
    // 计算swiper高度
    const [swiperHeight, setSwiperHeight] = useState<any>(0)
    const computeImgHeight = (e) => {
        var winWid = wx.getSystemInfoSync().windowWidth;      //获取当前屏幕的宽度
        var imgh=e.detail.height; //图片高度
        var imgw=e.detail.width;
        var swiperH = winWid * imgh / imgw + "px"           //等比设置swiper的高度。  
        setSwiperHeight(swiperH);
    }

    // 轮播图开始
    const [swiperImages, setSwiperImages] = useState<any>([
        {pic:'https://heshenghui.zhiheworld.com/images_tmp/swiper.gif', desc:'这里是介绍内容这里是介绍内容', btn:'立即查看'},
        {pic:'https://heshenghui.zhiheworld.com/images_tmp/swiper.gif', desc:'这里是介绍内容', btn:'立即查看'},
    ])
    // 轮播图结束

    const dump = (e) => {
        let gotype = e.currentTarget.dataset.gotype;
        let eid = e.currentTarget.dataset.eid;
        let cid = e.currentTarget.dataset.cid;
        let gid = e.currentTarget.dataset.gid;
        let title = e.currentTarget.dataset.title;
        dumpByType(gotype, {
            title: title,
            gid: gid,
            cid: cid,
            eid: eid,
        })
    }

    return (
        <View>
                <Swiper
                    style={`height:${swiperHeight}`}
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    autoplay={false}>
                    {props.datas.map((item, index) => (
                        <SwiperItem key={index}>
                            <View 
                                data-gotype={item.gotype} 
                                data-title={item.goods[0].title?item.goods[0].title:''}
                                data-eid={item.goods[0].id?item.goods[0].id:''}
                                data-cid={item.goods[0].id?item.goods[0].id:''}
                                data-gid={item.goods[0].id?item.goods[0].id:''}
                                onClick={dump}
                            >
                                <Image className='index-swiper-img' src={item.fpath} mode="widthFix" onLoad={computeImgHeight} />
                                {/* <Text className='index-swiper-desc'>{item.desc}</Text>
                                <Text className='index-swiper-btn'>{item.btn}</Text> */}
                            </View>
                        </SwiperItem>
                    ))}
                </Swiper>
            </View>
    );
}

export default SwiperImg;