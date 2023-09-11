import Taro, { Component } from '@tarojs/taro';
import { Provider, connect } from '@tarojs/redux';
import dva from './dva';
import models from './store';
import { set as setGlobalData, get as getGlobalData } from './global_data';
import Index from './pages/index';
import './app.scss';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    console.log(e);
    // dispatch(action("sys/error", e));
  },
});
const store = dvaApp.getStore();

@connect(({ main }) => ({
  ...main,
}))
class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    Taro.checkSession({
      success(res) {
        //session_key 未过期，并且在本生命周期一直有效
        Taro.getStorage({
          key: 'wxUserInfo',
          success: function(res) {
            const wxUserInfo = res.data;
            dispatch({ type: 'main/updateIsLogIn', payload: true });
            dispatch({ type: 'main/updateWxUserInfo', payload: wxUserInfo });
            dispatch({ type: 'main/updateOpenid', payload: wxUserInfo.openid });
            dispatch({ type: 'main/getUserInfo', payload:{}});
          },
        });
      },
      fail() {
        console.log('session验证未登陆！');
        Taro.removeStorageSync('wxUserInfo');
        Taro.login()
      },
    });
    this.update();  
  }

  config = {
    pages: [
        //  'pages/ZcyTest/index',
        
        // 'pages/Consignment/index',
        // 'pages/ConsignmentShow/index',
        'pages/Main/index',
        'pages/GoodGoods/index',

        // 'pages/Index/index',
      'pages/TaskList/index',
      'pages/LeaseOrderList/index',
      
      'pages/LeaseList/index',
      'pages/Lease/index',
      'pages/LeaseDetail/index',
      'pages/SearchLease/index',

      'pages/LeaseOrder/index',
      'pages/PicketQr/index',
      'pages/CommunityDetail/index',
      'pages/Community/Add/index',
      'pages/Community/AddVideo/index',
      // 'pages/Choujiang/index',
      'pages/SetAddrId/index',
      'pages/PicketResult/index',
      // 'pages/PicketQr/index',
      'pages/BuyPage/index',
      // 'pages/Kefu/index',
      // 'pages/PhotoWall/index',
      // 'pages/MyVip/index',
      'pages/Address/index',
      'pages/GoodsShow/index',
      'pages/Order/index',
      'pages/SearchRes/index',
      'pages/Collect/index',
      'pages/SortPage/index',
      'pages/LeaseOrder/Modules/Protocol/index',
      
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '西塔科学探索俱乐部',
      navigationBarTextStyle: 'black',
    },
    subpackages: [
      {
        root: 'subPackages',
        name: 'subPackages2',
        pages: [
          'Consignment/index',
          'ConsignmentShow/index',
          'ConsignmentBuyList/index',
          'ConsignmentSaleList/index',
          'ConsignmentCreate/index',
          'ConsignmentMenu/index',
        ],
      },
      {
        root: 'subPackagesMe',
        name: 'subPackagesMe',
        pages: [
          'UserInfoManage/index',
          'BuyVip/index',
          'BuyTabi/index',
          'LeaseOrderDetail/index',
          'AuthLogin/index',
          'WebView/index'
        ],
      },
    ],
    'networkTimeout': {
      'request': 10000,
      'downloadFile': 10000,
    },
    'enableShareTimeline': true,
    'enableShareAppMessage': true,
    'enablePullDownRefresh': true,
    'debug': true,
    "permission":{
      "scope.userLocation":{
        "desc":"你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  };
  update = () => {
    if (process.env.TARO_ENV === 'weapp') {
      const updateManager = Taro.getUpdateManager();
      Taro.getUpdateManager().onUpdateReady(function() {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
