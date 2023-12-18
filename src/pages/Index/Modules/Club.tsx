/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-29 23:08:59
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-03 22:22:48
 * @FilePath: /zulinv2/src/pages/Index/Modules/Club.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import '../index.scss';
import { dumpByType } from '../services';


const Club = (props) => {
    // 跳转
    const moreDump = (e) => {
        let gotype = e.currentTarget.dataset.gotype;
        if(gotype == 3){
            gotype = 5
        }else if(gotype == 4){
            gotype = 6
        }
        dumpByType(gotype, {})
    }
    const imgDump = (e) => {
        console.log('imgDump', e);
        let gotype = e.currentTarget.dataset.gotype;
        let title = e.currentTarget.dataset.title;
        let eid = e.currentTarget.dataset.eid;
        let cid = e.currentTarget.dataset.cid;
        let gid = e.currentTarget.dataset.gid;
        let cardid = e.currentTarget.dataset.cardid;
        dumpByType(gotype, {
            title: title,
            gid: gid,
            cid: cid,
            eid: eid,
            cardid: cardid,
        })
    }
    return (
        <View className='index-club-one'>
            <Image 
                data-title={props.data.goods[0].title?props.data.goods[0].title:''} 
                data-eid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-cid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-gid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-cardid={props.data.cards[0].id? props.data.cards[0].id:''}
                data-gotype={props.data.gotype} 
                onClick={imgDump} 
                className='index-club-one-img' 
                src={props.data.fpath} mode="widthFix" 
            />
            {props.data.showmore == "1"?(
                <View data-gotype={props.data.gotype} className='more' onClick={moreDump}>
                    <Text>更多</Text>
                    <View className='at-icon at-icon-search'></View>
                </View>
            ):''}
            
        </View>
    );
}

export default Club;