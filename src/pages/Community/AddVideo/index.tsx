import Taro, { useState, useRouter, useDidShow } from '@tarojs/taro';
import { View, Video } from '@tarojs/components';
import { AtInput, AtTextarea, AtButton, AtImagePicker } from 'taro-ui'


import './index.scss';
import { upload, sendContent } from './services';
import { showToast } from '@/utils/util';

const DetailAddVideo = () => {

    const router = useRouter();
    const [title, setTitle] = useState<any>('');
    const titleChange = (value, event) => {
        setTitle(title => value);
    }

    const [content, setContent] = useState<any>('');
    const contentChange = (value, event) => {
        setContent(content => value);
    }

    const [oid, setOid] = useState<any>();

    const send = async () => {
        if (title == '') {
            showToast('请填写标题');
            return;
        }
        if (content == '') {
            showToast('请填写帖子内容');
            return;
        }
        Taro.showLoading({
            title: '发布中...',
        })
        console.log("send:", title, content, files)
        let ret = {
            community_id: router.params.cid,
            title: title,
            content: content,
            image: '',

        };

        if (oid) {
            ret['thumb_image'] = "/pages/LeaseOrder/index?orderId=" + oid
        }

        // 先上传文件
        let uploadRes = await upload(router.params.video_path)
        ret.image = uploadRes.path;
        
        // 获取文件地址后，提交后台
        let sendRes = await sendContent(ret);
        if (sendRes) {
            setTitle('');
            setContent('');
            setFiles([]);
            Taro.showToast({
                title: '发布成功',
                duration: 2000,
                icon: 'success',
                mask: true,
            })

            Taro.navigateBack({
                delta: 1//表示回到上一页面
            })
        } else {
            setTitle('');
            setContent('');
            setFiles([]);
            Taro.showToast({
                title: '发布失败',
                duration: 2000,
                icon: 'success',
                mask: true,
            })
        }
        Taro.hideLoading()
    }


    const [files, setFiles] = useState<any>([])

    useDidShow(() => {
        if (router.params.type != 'undefined' && router.params.type == 'share') {
            setTitle(router.params.title);
            setOid(router.params.oid)
        }

    })

    return (
        <View className='container'>
            <View>
                <AtInput
                    className='community-add-title'
                    name='title'
                    type='text'
                    placeholder='填写标题'
                    value={title}
                    onChange={titleChange}
                />
            </View>
            <View className='content'>
                <AtTextarea
                    className='detail-add-content'
                    // height={400}
                    value={content}
                    onChange={contentChange}
                    maxLength={400}
                    placeholder='添加正文'
                />
            </View>
            <Video
                className='index-video'
                style={"width:100%"}
                src={router.params.video_path}
                controls={false}
                autoplay={true}
                // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                initialTime={0}
                id='video'
                loop={true}
                muted={false}
                showMuteBtn={true}
            />
            <View className='send-btn'>
                <AtButton className='send-button' type='primary' onClick={send}>发布笔记</AtButton>
            </View>
        </View>
    );
}

export default DetailAddVideo;