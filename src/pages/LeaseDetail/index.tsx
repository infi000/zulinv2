import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import './index.scss';
import {experimentConDetail} from './services'

import VideoIntro from './Modules/VideoIntro';
import ImageIntro from './Modules/ImageIntro';

const LeaseDetail = () => {
    const route = useRouter();
    // const [name, setName] = useState<any>([])
    const [detail, setDetail] = useState<any>([
        // {pic:"https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400", type:'mp4'},
        // {pic:"https://heshenghui.zhiheworld.com/images_tmp/swiper.gif", type:'image'}
    ])

    useDidShow(()=>{
        let eid = route.params.eid;
        if(eid){
            experimentConDetail({eid:eid}).then((res)=>{
                console.log("设备详情：",res);
                for(let i=0; i<res.conpics.length; i++){
                    let item = res.conpics[i];
                    let path = item.pic;
                    let suffix = path.substring(path.lastIndexOf(".")+1);
                    if(suffix == 'mp4'){
                        res.conpics[i].type = 'video'
                    }else{
                        res.conpics[i].type = 'image'
                    }
                }
                res.conpics.sort((a,b)=>{
                    return parseInt(a.sort)-parseInt(b.sort);
                })
                setDetail(res.conpics);
                Taro.setNavigationBarTitle({title: res.title})
            })
        }
        
    })

    const dumpLease = () => {
        let eid = route.params.eid;
        Taro.navigateTo({ url: '/pages/Lease/index?eid='+ eid });
    }

    return (
        <View className='lease-detail-warp'>
            {detail.length > 0 ? (
                detail.map((item, index)=>(
                    item.type == 'image'?(
                        <ImageIntro key={index} fpath={item.pic}></ImageIntro>
                    ):(
                        <VideoIntro key={index} fpath={item.pic}></VideoIntro>
                    )
                ))
            ):''}
            <View className='lease-detail-subbtn'>
                <Button onClick={dumpLease}>预约</Button>
            </View>
        </View>
    );
}

export default LeaseDetail;