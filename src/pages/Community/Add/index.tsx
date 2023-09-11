import Taro, { useState, useRouter, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtTextarea, AtButton,AtImagePicker } from 'taro-ui'


import './index.scss';
import { upload, sendContent } from './services';
import { showToast } from '@/utils/util';

const DetailAdd = () => {
    
    const router = useRouter();
    const [title, setTitle] = useState<any>('');
    const titleChange = (value, event) => {
        setTitle(title=>value);
    }

    const [content, setContent] = useState<any>('');
    const contentChange = (value, event) => {
        setContent(content=>value);
    }

    const [oid, setOid] = useState<any>();

    const send = async() => {
        if(title == ''){
            showToast('请填写标题');
            return ;
        }
        if(content == ''){
            showToast('请填写帖子内容');
            return ;
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
            images: [] as any [],
            
        };

        if(oid){
            ret['thumb_image'] = "/pages/LeaseOrder/index?orderId="+oid
        }

        // 先上传文件
        let images = [] as any []
        if(files.length > 0){
            for(let i=0; i<files.length; i++) {
                let uploadRes = await upload(files[i].url)
                // uploadRes = JSON.parse(uploadRes);
                
                images.push(uploadRes.path);
            }
            ret.image = images[0];
            ret.images = images;
        }
        console.log("uploadImgUrl", images);
        // 获取文件地址后，提交后台
        let sendRes = await sendContent(ret);
        if(sendRes){
            setTitle('');
            setContent('');
            setFiles([]);
            Taro.showToast({
                title:'发布成功',
                duration:2000,
                icon:'success',  
                mask:true,
            })
            // Taro.navigateTo({
            //     url: "/pages/Community/index"
            // });
            Taro.navigateBack({
                delta: 1//表示回到上一页面
            })
        }else{
            setTitle('');
            setContent('');
            setFiles([]);
            Taro.showToast({
                title:'发布失败',
                duration:2000,
                icon:'success',  
                mask:true,
            })
        }
        Taro.hideLoading()
    }


    const [files, setFiles] = useState<any>([])
    const imagePickerChange = (event) => {
        console.log("imagePickerChange", event)
        setFiles([...event])
    }
    const imagePickerFail = (event) => {
        console.log("imagePickerFail", event)
    }
    const imagePickerImageClick = (event) => {
        console.log("imagePickerImageClick", event)
    }

    useDidShow(()=>{
        if(router.params.type != 'undefined' && router.params.type=='share'){
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
            <AtImagePicker
                className='community-add-img-picker'
                length={3}
                count={9}
                files={files}
                onChange={imagePickerChange}
                onFail={imagePickerFail}
                onImageClick={imagePickerImageClick}
            />
            <View className='send-btn'>
                <AtButton className='send-button' type='primary' onClick={send}>发布笔记</AtButton>
            </View>
        </View>
    );
}

export default DetailAdd;