import Taro from '@tarojs/taro';
import { AtImagePicker } from 'taro-ui';
import api from '@/config/api';
export default class Index extends Taro.Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      files: [],
      ids:[]
    };

  }
  onChange(files) {
    const value = Taro.getStorageSync('wxUserInfo');
    const {ids} = this.state;
    const { imgtype } = this.props;
    const { length } = this.props;
    let openid = '';
    if (value) {
      openid = value.openid;
    }
    const ftype = this.props.ftype;
    const uploadTask = Taro.uploadFile({
      url: api.userSavehead,
      filePath: files[0].url,
      name: 'upimg',
      formData: {
        'openid': openid,
        'ftype': ftype // ftype:1头像；2自拍照
      },
      success: (res)=>{
        const data = JSON.parse(res.data);
      
      const _files = length === 1?[files[files.length-1]]:files;
      const _ids = length === 1? [data.data]:ids.concat(data.data);

        this.setState({
          files:_files,
          ids:_ids,
        });
      },
    });
  }
  onFail(mes) {
    console.log(mes);
  }
  onImageClick(index, file) {
    console.log(index, file);
  }
  render() {
    const { length } = this.props;
    return (
      <AtImagePicker
        multiple={false}
        count={length}
        files={this.state.files}
        onChange={this.onChange.bind(this)}
        onFail={this.onFail.bind(this)}
        onImageClick={this.onImageClick.bind(this)}
      />
    );
  }
}
