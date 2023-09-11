import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Video } from '@tarojs/components';
import '../index.scss';

const VideoIntro = (props) => {

    return (
        <View>
            <Video
                className='index-video'
                src={props.fpath}
                controls={true}
                autoplay={false}
                // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                initialTime={0}
                id='video'
                loop={true}
                muted={true}
                showMuteBtn={true}
            />
        </View>
    );
}

export default VideoIntro;