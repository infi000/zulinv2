const MOCK = 'http://easy-mock.sftcwl.com/mock/5f6a20a67266ef5678785185/wxschool';
const MOCK2 = 'http://easy-mock.sftcwl.com/mock/5f1a8bf410c3f359faddc7df/test';
const yjw_test = 'https://dev.tangguostore.com/index.php/MiniApi';
// const yjw = 'https://dev.tangguostore.com';
const yjw = 'https://apidev.leclubthallium.com';
const community = 'https://heshenghui.zhiheworld.com';
const WxApiRoot = yjw + '/index.php/MiniApi'; 
const assetRoot = yjw + '/Public/MiniApi/images'
// https://www.tangguostore.com/index.php/MiniApi/CC/myowns?openid=oKDX35X2NHYdiZdb8ukgFZmqwM8M
// https://dev.tangguostore.com/Public/MiniApi/images/jimai.jpg
// https://dev.tangguostore.com/Public/MiniApi/images/paimai.jpg
export default {
  picJimai: assetRoot + '/jimai.jpg', // 图片
  picPaimai: assetRoot + '/paimai.jpg', // 图片





  userInfo: WxApiRoot + '/user/info', // 1.	商品搜索（推荐、最热、最新、关键词、分类、页码）
  searchGoods: WxApiRoot + '/Shop/searchgoods', // 1.	商品搜索（推荐、最热、最新、关键词、分类、页码）
  goodsAllCtype: WxApiRoot + '/Shop/allctype', // 3.	获取商品类型
  goodsDetail: WxApiRoot + '/Shop/detail', // 4.	商品详情
  relatedGoods: WxApiRoot + '/Shop/tjgoods', // 5.	商品关联热门推荐
  isfav: WxApiRoot + '/User/isfav', // 6.	检测是否已收藏商品	
  fav: WxApiRoot + '/User/fav', // 7.	收藏商品
  unfav: WxApiRoot + '/User/unfav', // 8.	删除收藏
  buysRecord: WxApiRoot + '/Shop/buys', // 9. 获取购买记录	
  searchOrder: WxApiRoot + '/Order/search', // 11.	我的订单（全部、待付款、待发货、待收货、交易完成）
  userFavorite: WxApiRoot + '/User/favorite', // 12.	我的收藏	
  myAddress: WxApiRoot + '/User/address', // 13.	我的地址
  saveAddress: WxApiRoot + '/User/saveAddress', // 14.	添加新地址
  setDefaultAddress: WxApiRoot + '/User/saveAddress', // 设置默认地址
  delAddress: WxApiRoot + '/User/delAddress', // 删除地址
  delOrder: WxApiRoot + '/Order/del', // 16.	删除订单
  getJscode2session:  WxApiRoot + '/User/jscode2session', //	19.	小程序登录更新session
  saveUserData:  WxApiRoot + '/User/saveuserdata', //	20.	添加/更新小程序用户信息
  getMyowns:  WxApiRoot + '/CC/myowns', //	13.	我的藏品myowns/更新小程序用户信息
  postChangecc:  WxApiRoot + '/CC/changecc', //	14.	变更归属（添加传承信息）changecc
  postAdddetail:  WxApiRoot + '/CC/adddetail', //	15.	添加商品信息
  getPricehistory:  WxApiRoot + '/CC/pricehistory', //		2.	历史价格信息
  getBuyhistory:  WxApiRoot + '/CC/buyhistory', //		3.	成交价格信息
  getSearchmsg:  WxApiRoot + '/CC/searchmsg', //		4.	留言信息接口
  getSearchbuymsg:  WxApiRoot + '/CC/searchbuymsg', //	7.	求购信息接口
  postAddmsg:  WxApiRoot + '/CC/addmsg', //		5.	添加留言
  postAddbuymsg:  WxApiRoot + '/CC/addbuymsg', //		8.	添加求购信息
  getSearchcc:  WxApiRoot + '/CC/searchcc', //		10.	商品传承信息接口
  ccUpload:  WxApiRoot + '/CC/upload', //		10.	商品传承信息接口
  getCCdetial:  WxApiRoot + '/CC/ccdetail', //		11.	商品传承信息详情接口
  searchDynamic:  WxApiRoot + '/DynamicShow/search', //	24.	展示墙产品搜索
  getBgs:  WxApiRoot + '/DynamicShow/getbgs', //	25.	展示墙背景
  payQuery:  WxApiRoot + '/Pay/query', //	23.	查询支付状态
  getOderDetail:  WxApiRoot + '/Order/getdetail', //	24.	获取订单详情
  payex:  WxApiRoot + '/Pay/payex', //	22.	预支付付款
  createOrder:  WxApiRoot + '/User/createorder', //	21.	添加订单
  subMsg:   WxApiRoot + '/User/submsg', //	28.	订阅消息
  getAllTemplate:   WxApiRoot + '/User/alltemplate', //	31.	获取所有模板信息
  getClassifySearch:   WxApiRoot + '/Classify/shopsearch', //	29.	搜索分类集合
  getClassifyGoods:   WxApiRoot + '/Classify/getgoods', //	30.	获取分类集合下的商品
  orderComplete:   WxApiRoot + '/Order/complete', //	30.	获取分类集合下的商品
  picketSearch:   WxApiRoot + '/Picket/search', //	获取我的票
  picketCheck:   WxApiRoot + '/Picket/check', //	验票
  modifyAddress:   WxApiRoot + '/Order/modifyaddress', //	修改订单地址
  choujiangId:   WxApiRoot + '/Category/cj', //	获取需要跳转抽奖页面的id

  // 社区相关接口
  channel:   community + '/api/community', //	获取频道接口
  communityList:   community + '/api/post', //	根据频道ID获取列表信息
  communityDetail:   community + '/api/post/', //	获取详情
  uploadImg: community + '/api/upload/file', //	上传图片
  send: community + '/api/post', //	发帖
  reply: community + '/api/reply', //	回复

  // 租赁接口
  leaseExperiments: WxApiRoot + '/Lease/experiments', //	实验项目列表
  leaseEquipments: WxApiRoot + '/Lease/equipments', //	设备列表
  leaseToolboxs: WxApiRoot + '/Lease/toolboxs', //	工具箱列表
  leaseToolbox: WxApiRoot + '/Lease/tools', //	工具列表
  leaseEquipmentbooktimes: WxApiRoot + '/Lease/equipmentbooktimes', // 房间已预约时间段
  leaseOrderadd: WxApiRoot + '/Lease/orderadd', // 创建订单
  leaseOrderDetail: WxApiRoot + '/Lease/orderdetail', // 订单详情
  leaseOrderList: WxApiRoot + '/Lease/orders', // 订单列表
  
  leasePrebookjoininfo: WxApiRoot + '/Lease/prebookjoininfo', // 申请加入预约信息
  leasePrebookjoin: WxApiRoot + '/Lease/prebookjoin', // 申请加入预约
  leasePrebookusers: WxApiRoot + '/Lease/prebookusers', // 申请加入预约列表
  leasePrebookpass: WxApiRoot + '/Lease/prebookpass', // 预约申请通过
  leasePrebookunpass: WxApiRoot + '/Lease/prebookunpass', // 预约申请未通过
  
  leasePayInfo: WxApiRoot + '/Lease/orderpay', // 支付信息
  leaseOrderWxcode: WxApiRoot + '/Lease/orderwxcode', // 订单收款二维码
  leasePrebookToolAdd: WxApiRoot + '/Lease/prebooktooladd', // 预约增加工具
  leaseExperimentcondetail: WxApiRoot + '/Lease/experimentcondetail', // 设备详情页面

  leasePrebookhistory: WxApiRoot + '/Lease/prebookhistory', // 任务列表
  
  choujiangId:   WxApiRoot + '/Category/cj', //	获取需要跳转抽奖页面的id
  experiments:   WxApiRoot + '/Lease/experiments', //	实验项目列表experiments
  experimentDetail:   WxApiRoot + '/Lease/experimentdetail', //	实验项目

  //寄卖
  consignmentGoods: WxApiRoot +  '/Consignment/goods', //寄卖商品列表goods
  consignmentGoodsdetail: WxApiRoot + '/Consignment/goodsdetail', // 寄卖商品详情信息goodsdetail
  consignmentBuy: WxApiRoot + '/Consignment/buy', // 3.1 购买寄卖商品buy
  consignmenBuypay: WxApiRoot + '/Consignment/buypay', //3.2 购买寄卖商品支付信息buypay
  consignmenMybuy: WxApiRoot + '/Consignment/mybuys', //3.5 我的购买寄卖商品列表mybuys
  consignmenBuydetail: WxApiRoot + '/Consignment/buydetail', //3.4 购买寄卖商品详情buydetail
  consignmenMygoods: WxApiRoot + '/Consignment/mygoods', //2.5 我的寄卖商品列表mygoods
  consignmenGoodsadd: WxApiRoot + '/Consignment/goodsadd', //2.1 寄卖商品添加goodsadd
  consignmenCategorys: WxApiRoot + '/Consignment/categorys', //4.1 获取分类列表categorys
  goodsUpload:  WxApiRoot + '/Consignment/goodsupload', //		10.	商品传承信息接口
  chargepay:  WxApiRoot + '/Consignment/chargepay', //	手续费支付信息（寄售未支付）chargepay

  // user
  userSavehead:  WxApiRoot + '/User/savehead', //	 上传头像savehead
  meInfo:  WxApiRoot + '/User/baseinfo', //	 我的信息baseinfo
  userInfoModify:  WxApiRoot + '/User/baseinfomodify', //	 修改我的信息baseinfomodify
  buyyear:  WxApiRoot + '/User/buyyear', //	 购买年会会员buyyear
  buyta:  WxApiRoot + '/User/buyta', //	 铊币充值buyta

  // 首页
  classifySearch: WxApiRoot + '/classify/search', //获取首页数据
  classifyGetexperiments: WxApiRoot + '/classify/getexperiments', //搜索预约设备
  getbg: WxApiRoot + '/User/getbg', //获取设置getbg
  

  orderdetailbycode:  WxApiRoot + '/Lease/orderdetailbycode', // 订单详情orderdetailbycode
  
//   User/agreement
// 必需参数：
// registersign:会员入会协议图片；格式base64；数据需包含“data:image/jpeg;base64,”、“data:image/png;base64,”信息
// safesign：安全责任协议图片；格式base64；数据需包含“data:image/jpeg;base64,”、“data:image/png;base64,”信息
// registernum：入会协议编号
// 非必需参数：
// 	regusersign：入会协议会员签字图片，格式base64
// 	reguserguardiansign：入会协议会员监护人签字图片，格式base64
// 	safeuserguardiansign：安全责任协议乙方签字图片，格式base64
// 	safeusersign：安全责任协议未成年人签字图片，格式base64
  userAgreement:  WxApiRoot + '/User/agreement', //   8.    签署协议agreement
  uploadbase64:  WxApiRoot + '/User/uploadbase64', //   8.    签署协议agreement
  agreementregisterinfo:  WxApiRoot + '/User/agreementregisterinfo', //   8.    签署协议agreement
  setpicketduration:  WxApiRoot + '/Picket/setpicketduration', //   8.    签署协议agreement

  // 设置手机号
  setwxuserphone: WxApiRoot + '/User/setwxuserphone',
  baseinfo2: WxApiRoot + '/User/baseinfo2'
};
