import Taro, { useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon, AtFloatLayout, AtTextarea, AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/article.scss";

import './index.scss';

import { reply } from '../../services';

const Comment = (props) => {

    const [postId, setPostId] = useState(0);
    const [fatherId, setFatherId] = useState(0);


    // 当前回复用户临时信息
    const [atFloatLayoutStatus, setAtFloatLayoutStatus] = useState(false);
    const changeAtFloatLayoutStatus = (event) => {
        console.log("changeAtFloatLayoutStatus:", event)
        let postId = event.currentTarget.dataset.postid
        let fatherId = event.currentTarget.dataset.fatherid
        setPostId(postId);
        setFatherId(fatherId);

        setAtFloatLayoutStatus(true);
    }
    // 回复弹窗关闭事件
    const atFloatLayoutOnClose = () => {
        // 初始化当前回复用户临时信息
        console.log("回复弹窗关闭：初始化当前回复用户临时信息");
        setAtFloatLayoutStatus(false);
    }

    const [content, setContent] = useState<any>();
    const contentChange = (value, event) => {
        setContent(content => value);
    }

    const send = () => {
        console.log("send:", content)
        reply({
            content: content,
            post_id: postId,
            father_id: fatherId
        })
      
        setAtFloatLayoutStatus(false)
        props.getDetail();
    }

    return (
        <View className='comment-warp'>
           
            {props.datalist.length >0 ? props.datalist.map((item, index) => (
                <View key={index} className='at-article comment'>
                    <View className='comment-header'>
                        <View className='user'>
                            <AtAvatar circle image={item.user.avatarUrl} size='small'></AtAvatar>
                            <Text className='at-article__info nickname'>{item.user.nickName}</Text>
                        </View>
                        <Text className='at-article__info comment-date'>{item.created_at}</Text>
                    </View>
                    <View className='at-article__p level-1-comment'>{item.content}</View>
                    {item.reply.length > 0?(
                    <View className='at-article__p level-2-comment'>
                        {item.reply.map((itemChild, i) => (
                            <View key={i}><b>{itemChild.user.nickname}：</b>{itemChild.content}</View>
                        ))}
                    </View>
                    ):''}
                    <View className='reply'>
                        <View data-postid={item.post_id} data-fatherid={item.id} onClick={changeAtFloatLayoutStatus}>
                            <AtIcon className='message-icon' value='message' size='17' color='#999'></AtIcon>
                            回复
                        </View>
                    </View>
                </View>
            )):''}           

            <AtFloatLayout isOpened={atFloatLayoutStatus} onClose={atFloatLayoutOnClose} title="回复">
                <View className='content'>
                    <AtTextarea
                        height={300}
                        value={content}
                        onChange={contentChange}
                        maxLength={400}
                        placeholder='请输入回复内容'
                    />
                </View>
                <View className='send-btn'>
                    <AtButton type='primary' onClick={send}>回复</AtButton>
                </View>
            </AtFloatLayout>
        </View>
    );
}

export default Comment;