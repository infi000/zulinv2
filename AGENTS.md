# 项目概述

**小火车** 是一个基于 Taro 框架开发的微信小程序项目，主要用于实验室设备租赁、票务管理、寄卖商品等功能。

## 技术栈

- **框架**: Taro 2.2.9 (React 语法)
- **语言**: TypeScript + JavaScript
- **状态管理**: Dva (基于 Redux)
- **UI 组件**: Taro UI
- **样式**: SCSS / Less
- **构建工具**: Webpack
- **Node 版本**: 12.12.0 (通过 Volta 锁定)

## 项目结构

```
/Users/sf/Desktop/network/zulin/zulinv2/
├── config/                 # Taro 配置文件
│   ├── dev.js             # 开发环境配置
│   ├── index.js           # 主配置
│   └── prod.js            # 生产环境配置
├── src/
│   ├── app.jsx            # 小程序入口文件
│   ├── app.scss           # 全局样式
│   ├── dva.js             # Dva 状态管理配置
│   ├── global_data.js     # 全局数据管理
│   ├── components/        # 公共组件
│   │   ├── Comment/       # 评论组件
│   │   ├── Divider/       # 分割线组件
│   │   ├── GoodsList/     # 商品列表组件
│   │   ├── Input/         # 输入框组件
│   │   ├── ScrollCon/     # 滚动容器组件
│   │   ├── SoldOut/       # 售罄组件
│   │   ├── Tabbar/        # 底部导航栏
│   │   ├── UnPay/         # 未支付组件
│   │   └── Uploader/      # 上传组件
│   ├── config/
│   │   ├── api.js         # API 接口配置
│   │   └── path.ts        # 路径配置
│   ├── constants/         # 常量定义
│   ├── pages/             # 主包页面
│   │   ├── Main/          # 主页面（Tab 容器）
│   │   ├── Index/         # 首页
│   │   ├── Me/            # 我的页面
│   │   ├── Lease/         # 租赁页面
│   │   ├── LeaseDetail/   # 租赁详情
│   │   ├── LeaseList/     # 租赁列表
│   │   ├── LeaseOrder/    # 租赁订单
│   │   ├── Goupiao/       # 购票页面
│   │   ├── GoodsShow/     # 商品展示
│   │   ├── BuyPage/       # 购买页面
│   │   ├── Address/       # 地址管理
│   │   ├── Order/         # 订单管理
│   │   ├── Consignment/   # 寄卖相关
│   │   └── ...            # 其他页面
│   ├── router/            # 路由配置
│   ├── services/          # 服务层（API 调用）
│   ├── static/            # 静态资源
│   │   ├── images/        # 图片资源
│   │   └── style/         # 公共样式
│   ├── store/             # Dva models
│   ├── subPackages/       # 分包 - 寄卖相关
│   │   ├── Consignment/
│   │   ├── ConsignmentBuyList/
│   │   ├── ConsignmentCreate/
│   │   ├── ConsignmentMenu/
│   │   └── ConsignmentSaleList/
│   └── subPackagesMe/     # 分包 - 用户相关
│       ├── AuthLogin/
│       ├── BuyTabi/
│       ├── BuyVip/
│       ├── LeaseOrderDetail/
│       ├── UserInfoManage/
│       └── WebView/
├── dist/                  # 编译输出目录（小程序根目录）
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript 配置
└── project.config.json    # 微信小程序配置
```

## 常用命令

```bash
# 安装依赖
npm install

# 开发模式（微信小程序）
npm run dev:weapp2

# 编译发布（微信小程序）
npm run build:weapp

# 其他平台开发
npm run dev:swan      # 百度小程序
npm run dev:alipay    # 支付宝小程序
npm run dev:tt        # 字节跳动小程序
npm run dev:h5        # H5
npm run dev:rn        # React Native
```

## 开发规范

### 1. 新增页面流程

以新增 `ZcyTest` 页面为例：

1. **创建页面文件**: `src/pages/ZcyTest/index.tsx`
2. **注册页面**: 在 `src/app.jsx` 的 `config.pages` 数组中添加路径 `'pages/ZcyTest/index'`
3. **注意**: `config.pages` 数组的第 0 位即为小程序首页

### 2. API 接口维护

所有 API 接口统一配置在 `src/config/api.js` 中：

```javascript
const WxApiRoot = 'https://xtblapi.leclubthallium.com/index.php/MiniApi';

export default {
  userInfo: WxApiRoot + '/user/info',
  // ...
};
```

### 3. 状态管理 (Dva)

- Models 统一放在 `src/store/` 目录
- 在 `src/store/index.js` 中注册所有 models
- 使用 `connect` 高阶组件或 `useSelector`/`useDispatch` hooks 连接组件

### 4. 路径别名

项目配置了以下路径别名（在 `tsconfig.json` 和 `config/index.js` 中）：

- `@/components/*` -> `src/components/*`
- `@/config/*` -> `src/config/*`
- `@/store/*` -> `src/store/*`
- `@/pages/*` -> `src/pages/*`
- `@/services/*` -> `src/services/*`
- `@/static/*` -> `src/static/*`
- `@/utils/*` -> `src/utils/*`
- `@/constants/*` -> `src/constants/*`
- `@/subPackages/*` -> `src/subPackages/*`
- `@/subPackagesMe/*` -> `src/subPackagesMe/*`

### 5. 网络请求

使用封装的 `request.js`：

```javascript
import request from '@/utils/request';
import api from '@/config/api';

// GET 请求
request.get(api.userInfo, { id: 1 });

// POST 请求
request.post(api.saveAddress, { address: 'xxx' });

// 文件上传
request.uploadFile(api.uploadImg, filePath);
```

## 小程序配置

### 主包页面 (pages)
- Main - 主页面（Tab 切换容器）
- 租赁相关: Lease, LeaseDetail, LeaseList, LeaseOrder, LeaseOrderList
- 购票相关: Goupiao, GoupiaoDetail
- 商品相关: GoodGoods, GoodsShow, BuyPage
- 订单相关: Order, CheckedList, PicketResult, PicketQr
- 其他: Address, SearchLease, SortPage, SetAddrId

### 分包 (subPackages)
- Consignment - 寄卖首页
- ConsignmentShow - 寄卖展示
- ConsignmentBuyList - 购买列表
- ConsignmentSaleList - 销售列表
- ConsignmentCreate - 创建寄卖
- ConsignmentMenu - 寄卖菜单

### 分包 (subPackagesMe)
- AuthLogin - 授权登录
- BuyVip - 购买会员
- BuyTabi - 铊币充值
- LeaseOrderDetail - 租赁订单详情
- UserInfoManage - 用户信息管理
- WebView - 网页视图

## 注意事项

1. **Node 版本**: 项目使用 Node 12.12.0，通过 Volta 锁定版本
2. **微信小程序 AppID**: `wx5772af7a9975231e`
3. **后端 API 地址**: `https://xtblapi.leclubthallium.com`
4. **登录鉴权**: 使用微信 openid 进行用户鉴权，存储在本地缓存 `wxUserInfo` 中
5. **分享功能**: 已开启朋友圈和好友分享 (`enableShareTimeline`, `enableShareAppMessage`)
