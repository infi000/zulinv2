/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-21 23:21:57
 * @FilePath: /zulinv2/src/pages/Index/Modules/SwiperImg.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        console.log('SwiperImg', e);

        let gotype = e.currentTarget.dataset.gotype;
        let eid = e.currentTarget.dataset.eid;
        let cid = e.currentTarget.dataset.cid;
        let gid = e.currentTarget.dataset.gid;
        let title = e.currentTarget.dataset.title;
        let cardid = e.currentTarget.dataset.cardid;
        dumpByType(gotype, {
            title: title,
            gid: gid,
            cid: cid,
            eid: eid,
            cardid: cardid,
        })
    }
    console.log('props.datas', props.datas);
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
                                data-cardid={item.cards[0].id? item.cards[0].id:''}
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