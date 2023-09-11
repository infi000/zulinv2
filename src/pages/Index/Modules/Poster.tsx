import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import '../index.scss';
import { dumpByType } from '../services';

const Poster = (props) => {
    
    const [posterTwo, setPosterTwo] = useState<any>('https://heshenghui.zhiheworld.com/images_tmp/haibao.gif')
    const dumpShop = (e) => {
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
        <View className='index-poster-one'>
            <Image 
                data-gotype={props.data.gotype} 
                data-title={props.data.goods[0].title?props.data.goods[0].title:''}
                data-eid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-cid={props.data.goods[0].id?props.data.goods[0].id:''}
                data-gid={props.data.goods[0].id?props.data.goods[0].id:''}
                className='index-poster-one-img' 
                src={props.data.fpath} 
                mode="widthFix" 
                onClick={dumpShop} 
            />
            <View className='index-poster-txt'>
                <Text >{props.data.title}</Text>
            </View>
        </View>
    );
}

export default Poster;