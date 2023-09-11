import Taro, { useState, useEffect, useDidShow, useRouter, useShareAppMessage } from '@tarojs/taro';
import { View, Image, Text, Button, Radio, WebView } from '@tarojs/components';
import { AtCountdown,AtActionSheetItem, AtSwitch, AtRadio, AtList, AtListItem, AtTag, AtBadge, AtActionSheet, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import { useDispatch } from '@tarojs/redux';


import './index.scss';
import Tools from './Modules/OrderTools';
import Apply from './Modules/Apply';
import { leasePrebookjoininfo, orderDetail, applyJoin, applyJoinList, applyCheckPass, applyCheckUnPass, leasePayInfo, leaseOrderWxcode, leasePrebookToolAdd } from './services'
import { sendContent } from '../Community/Add/services';
import { getToolsService, getToolService } from '../Lease/services';
import { showToast, showSuccessToast, showErrorToast, calcCountDown } from '@/utils/util';
import QRCode from '../../utils/weapp-qrcode.js';
import "taro-ui/dist/style/components/badge.scss";

const img = "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";

const LeaseOrder = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const orderPayTimeout = 5;

    // 变量
    const [applyListStatus, setApplyListStatus] = useState(false);
    const [addToolStatus, setAddToolStatus] = useState(false);
    const [shareStatus, setShareStatus] = useState(false);
    const [applyJoinStatus, setApplyJoinStatus] = useState(false)
    const [applyJoinPayStatus, setApplyJoinPayStatus] = useState(false)
    const [uid, setUid] = useState(4);
    const [selectTool, setSelectTool] = useState<any>();
    const [pageType, setPageType] = useState<any>(0);
    const [isTBPay, setIsTBPay] = useState<any>(false);
    const [payProtocol, setPayProtocol] = useState<any>(false)

    // 订单支付倒计时
    const [countDownH, setCountDownH] = useState<any>(0);
    const [countDownS, setCountDownS] = useState<any>(0);

    // 接口数据ostatus:0已下单未支付， 1已支付未核销，2核销完成，3关闭
    const [orderInfo, setOrderInfo] = useState<any>({});
    const [applyList, setApplyList] = useState<any>([]);
    const [tools, setTools] = useState<any>([]);
    const [wxCode, setWxCode] = useState<any>([]);

    const [qrcodeShow, setQrcodeShow] = useState<any>(true)

    // 打开申请列表弹层
    const openApplyList = () => {
        // 审核通过订单获取申请列表数据
        applyJoinList({ bid: orderInfo.bid }).then((result) => {
            console.log("申请预约列表：", result);
            setApplyList(result.prebookusers);
        })

        setApplyListStatus(true);
    }
    const closeApplyList = () => {
        setApplyListStatus(false);
    }

    // 打开添加工具弹层
    const openAddTool = () => {
        getToolsService({ eid: orderInfo.prebook.eid }).then((res) => {
            console.log("工具箱列表：", res)
            let _tools = [] as any
            for (let i = 0; i < res.toolboxs.length; i++) {
                _tools.push({ value: res.toolboxs[i].id, label: res.toolboxs[i].title, desc: res.toolboxs[i].des })
            }
            setTools(_tools);
        });
        setAddToolStatus(true);
    }
    const closeAddTool = () => {
        setAddToolStatus(false);
    }
    // 选择工具
    const selectToolFunc = (value) => {
        console.log("选择的工具1：", value);
        setSelectTool(value);
    }
    // TODO 支付新加工具钱
    const payToolMyPrice = async () => {
        if (!selectTool) {
            showErrorToast("请选择工具")
            return;
        }
        console.log("选择的工具2：", selectTool);
        let tool = await getToolService({ tbid: selectTool })
        let toolsConfig = { tools: [] as any[] };
        for (let i = 0; i < tool.tools.length; i++) {
            // eptotalprice += tool.tools[i].price;
            toolsConfig.tools.push({ id: tool.tools[i].id, tbid: tool.tools[i].tbid, price: tool.tools[i].price })
        }
        // 下单
        let addToolOrder = await leasePrebookToolAdd({ bid: orderInfo.bid, tools: JSON.stringify(toolsConfig) });
        if (!addToolOrder.oid) {
            showToast("下单失败");
            return;
        }
        // 支付金额为0，直接提示购买成功，不走支付流程
        if(addToolOrder.totalpay<=0){
            Taro.showToast({
                title: '购买成功',
                icon: 'success',
                duration: 2000,
            })
            // 获取订单信息
            orderDetail({ oid: router.params.orderId }).then((res) => {
                setOrderInfo(res);
            });
            setSelectTool('');
            setAddToolStatus(false)
            return ;
        }
        // 获取支付信息
       
        let paytype = 'miniwxpay';
        if(isTBPay){
            paytype = 'ta';
        }
        let payInfo = await leasePayInfo({ oid: addToolOrder.oid,paytype:paytype });
        // 铊币支付，不走下方的代码
        if(isTBPay){
            if(payInfo){
                Taro.showToast({
                    title: '购买成功',
                    icon: 'success',
                    duration: 2000,
                })
                // 获取订单信息
                orderDetail({ oid: router.params.orderId }).then((res) => {
                    setOrderInfo(res);
                });
                setSelectTool('');
                setAddToolStatus(false)
            }
            
            return;
        }

        if (!payInfo.arraydata) {
            showToast("支付信息不存在");
            return;
        }

        console.log("新加工具支付信息", payInfo)
        let { timeStamp, nonceStr, signType, paySign } = payInfo.arraydata;
        const pak = payInfo.arraydata.package;
        // 支付
        Taro.requestPayment({
            timeStamp: timeStamp + "",
            nonceStr: nonceStr,
            package: pak,
            signType,
            paySign,
            success: function (res) {
                Taro.showToast({
                    title: '购买成功',
                    icon: 'success',
                    duration: 2000,
                })
                // 获取订单信息
                orderDetail({ oid: router.params.orderId }).then((res) => {
                    setOrderInfo(res);
                });
            },
            fail: function (res) {
                showToast("购买失败");
                console.log(res)
            }
        })
        setAddToolStatus(false)
        setSelectTool('');
        console.log("支付", addToolOrder)
    }

    // 打开分享弹层
    const openShare = () => {
        setShareStatus(true);
    }
    const closeShare = () => {
        setShareStatus(false);
    }
    const isTbPayChange = (e) => {
        setIsTBPay(e);
    }

    useDidShow(() => {
        // url参数
        setPageType(router.params.pageType ? router.params.pageType : 0);
        // 获取用户信息
        var value = Taro.getStorageSync('wxUserInfo');
        setUid(value.id)

        // 获取订单信息 router.params.orderId
        orderDetail({ oid: router.params.orderId }).then((res) => {
            setOrderInfo(res);
            let countDown = calcCountDown(res.ctime, orderPayTimeout);
            setCountDownH(countDown.h)
            setCountDownS(countDown.s)

            if (res.ostatus == 0) {
                getQRCode('')
            } else {
                getQRCode(res.ordercode);
            }
        });

    })

    const getQRCode = (code) => {
        if (code == '') {
            let oid = router.params.orderId;
            leaseOrderWxcode({ oid: oid }).then((res) => {
                console.log("收款二维码：", res)
                setWxCode(res.codeurl);

                const W = wx.getSystemInfoSync().windowWidth;
                const rate = 750.0 / W;
                const qrcode_w = 300 / rate;

                const q = new QRCode('canvas', {
                    // usingIn: this,
                    text: res.codeurl,
                    width: qrcode_w,
                    height: qrcode_w,
                    padding: 12,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H,
                    callback: (res) => {
                        // 生成二维码的临时文件
                        console.log(res.path)
                        // setQrcode(res.path)
                        console.log(qrcode_w)
                    }
                });
                console.log("q", q);
            })
        } else {
            getQRCodeByCode(code);
        }
    }

    const getQRCodeByCode = (code) => {
        const W = wx.getSystemInfoSync().windowWidth;
        const rate = 750.0 / W;
        const qrcode_w = 300 / rate;
        let url = "/subPackagesMe/LeaseOrderDetail/index?ordercode=" + code
        const q = new QRCode('canvas', {
            // usingIn: this,
            text: url,
            width: qrcode_w,
            height: qrcode_w,
            padding: 12,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
            callback: (res) => {
                // 生成二维码的临时文件
                console.log(res.path)
                console.log(qrcode_w)
            }
        });
        console.log("q", q);
    }

    const closeApplyJoinPayStatus = () =>{
        
        setApplyJoinPayStatus(false)
        console.log(applyJoinPayStatus)
    }

    const applyJoinSelectFunc = async() => {
        let joinInfo = await leasePrebookjoininfo({bid:orderInfo.bid});
        console.log(joinInfo);
        let joinInfoMoney = parseFloat(joinInfo.joinmoney);
        
        if(joinInfoMoney > 0) {
            setApplyJoinPayStatus(true)
        }else{
            setApplyJoinStatus(true)
        }
    }

    // 无需支付的申请加入
    const applyJoinFreeFunc = () => {
        applyJoin({ bid: orderInfo.bid }).then((res) => {
            Taro.showToast({
                title: '申请成功',
                icon: 'success',
                duration: 2000
            })
            Taro.navigateTo({url: '/pages/Main/index' });
            dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 0})
        })

        setApplyJoinStatus(false)
        
    }

    // 申请加入（需要TA支付）
    const applyJoinTaFunc = async() => {
        applyJoin({ bid: orderInfo.bid, paytype: "ta"}).then((res) => {
            Taro.showToast({
                title: '拼团成功',
                icon: 'success',
                duration: 2000
            })
            Taro.navigateTo({url: '/pages/Main/index' });
            dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 0})
        }).catch((e) => {
            // showErrorToast('拼团失败')
        })

        setApplyJoinPayStatus(false)
        
    }
     // 申请加入（需要TA支付）
     const applyJoinMiniWxpayFunc = async() => {
    
        applyJoin({ bid: orderInfo.bid, paytype: "miniwxpay"}).then((res) => {
            console.log(3333333, res)
            if (!res.arraydata) {
                showToast("支付信息不存在");
                return;
            }
            console.log("支付信息", res)
            let { timeStamp, nonceStr, signType, paySign } = res.arraydata;
            const pak = res.arraydata.package;
            // 支付
            Taro.requestPayment({
                timeStamp: timeStamp + "",
                nonceStr: nonceStr,
                package: pak,
                signType,
                paySign,
                success: function (res) {
                    Taro.showToast({
                        title: '拼团成功',
                        icon: 'success',
                        duration: 2000,
                    })
                    Taro.navigateTo({url: '/pages/Main/index' });
                    dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 0})
                },
                fail: function (res) {
                    showToast("拼团失败");
                    console.log(res)
                }
            })
            
        }).catch((e) => {
            console.log(e)
            showErrorToast('申请失败')
        })

        setApplyJoinPayStatus(false)
        
    }


    const pass = (event) => {
        let jid = event.currentTarget.dataset.jid;
        applyCheckPass({ jid: jid }).then((res) => {
            Taro.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
            })
        })
        closeApplyList();
    }

    const unpass = (event) => {
        let jid = event.currentTarget.dataset.jid;
        applyCheckUnPass({ jid: jid }).then((res) => {
            Taro.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
            })
        })
        closeApplyList();
    }
    useShareAppMessage((res) => {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: orderInfo.prebook.etitle,
            path: '/pages/LeaseOrder/index?orderId=' + router.params.orderId + "&identity=share",
            imageUrl: orderInfo.prebook.thumbinal
        }
    })

    // 发帖
    const shareCommunity = async (event) => {
        let { oid, title, type, cid } = event.currentTarget.dataset;
        Taro.navigateTo({
            url: "/pages/Community/Add/index?oid=" + oid + "&title=" + title + "&type=" + type + "&cid=" + cid
        });
    }

    // 订单支付
    const orderPay = async () => {
        let countDown = calcCountDown(orderInfo.ctime, orderPayTimeout);
        if(countDown.h == 0 && countDown.s == 0) {
            showErrorToast("订单已经过期");
            // Taro.navigateTo({url: '/pages/Main/index' });
            // dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 2})
            return ;
        }
        if(!payProtocol){
            showErrorToast("请勾选协议后，再进行预约");
            return ;
        }
        let oid = router.params.orderId;
        let paytype = 'miniwxpay';
        if(isTBPay){
            paytype = 'ta';
        }
        // 获取支付信息
        let payInfo = await leasePayInfo({ oid: oid,paytype:paytype });
        // console.log("支付信息", payInfo);
        // return;
        // 铊币支付，不走下方的代码
        if(isTBPay){
            if(payInfo){
                Taro.showToast({
                    title: '购买成功',
                    icon: 'success',
                    duration: 2000,
                })
                // 获取订单信息
                orderDetail({ oid: router.params.orderId }).then((res) => {
                    setOrderInfo(res);
                });
            }
            return;
        }

        if (!payInfo.arraydata) {
            showToast("支付信息不存在");
            return;
        }
        console.log("支付信息", payInfo)
        let { timeStamp, nonceStr, signType, paySign } = payInfo.arraydata;
        const pak = payInfo.arraydata.package;
        // 支付
        Taro.requestPayment({
            timeStamp: timeStamp + "",
            nonceStr: nonceStr,
            package: pak,
            signType,
            paySign,
            success: function (res) {
                Taro.showToast({
                    title: '购买成功',
                    icon: 'success',
                    duration: 2000,
                })
                // 获取订单信息
                orderDetail({ oid: router.params.orderId }).then((res) => {
                    setOrderInfo(res);
                });
            },
            fail: function (res) {
                showToast("购买失败");
                console.log(res)
            }
        })
    }

    const agreePayProtocol = () => {
        setPayProtocol(true);
    }
    const dumpProtocol = (e) => {
        console.log(e)
        let src = e.currentTarget.dataset.url;
        Taro.navigateTo({
            url: "/pages/LeaseOrder/Modules/Protocol/index?url=" + src
         })
    }

    useEffect(() => {
        if (!shareStatus && !applyListStatus && !addToolStatus) {
            let code = orderInfo.ostatus == "0" ? '' : orderInfo.ordercode;
            getQRCode(code);
        }

    }, [shareStatus, applyListStatus, addToolStatus, applyJoinPayStatus])

    //订单支付倒计时结束跳转我的页面
    const countDownTimeUp = () => {
        showErrorToast("订单已经过期");
        setTimeout(()=>{
            console.log(111)
            // Taro.reLaunch
            let pages = Taro.getCurrentPages();
            Taro.navigateBack({
                delta: pages.length//回到最上一页面
              })
            // Taro.navigateTo({url: '/pages/Main/index' });
            dispatch({type: 'tabbar/updateCurrentNavIndex', payload: 3})
        }, 1000)
        
    }

    return (
        <View className='LeaseOrder-warp'>
            <View className='LeaseOrder-title'>
                <View className='lease-before-icon'></View>
                {pageType == 0 ? '确认订单' : '订单信息'}
            </View>
            <View className='LeaseOrder-orderinfo'>
                <View className='order-info'>
                    <View className='image'>
                        <Image className='image-img' src={orderInfo.prebook.thumbinal} mode="aspectFit" />
                    </View>
                    <View className='text'>
                        <View className='title'>{orderInfo.prebook.etitle}-{orderInfo.prebook.eptitle}</View>
                        {/* <View className='money'>金额：￥{orderInfo.prebook.epprice}*{parseInt(orderInfo.prebook.duration) / 60}</View> */}
                        <View className='money'>订单号：{orderInfo.orderid}</View>
                        <View className='money'>预约日期：{orderInfo.prebook.starttimestr.substring(0, 10)}</View>
                        <View className='money' style={"margin-left:55px"}>{orderInfo.prebook.starttimestr.substring(11)} ~ {orderInfo.prebook.endtimestr.substring(11)}</View>
                    </View>
                </View>
            </View>
            <View className='LeaseOrder-tools'>
                <Tools title={"项目名称："} name={orderInfo.prebook.eptitle + " " + orderInfo.prebook.epprice + "*"} num={parseInt(orderInfo.prebook.duration) / 60 > 3?3:parseInt(orderInfo.prebook.duration) / 60} price={orderInfo.prebook.eptotalprice}></Tools>
                <Tools title={"门  票："} name={orderInfo.prebook.etitle + "*"} num={3} price={orderInfo.deposit}></Tools>
                {orderInfo.prebook.tools.map((item, index) => (
                    <Tools title={"工具佣金："} key={index} name={item.title} num="" price={item.price}></Tools>
                ))}
            </View>
            <View className='LeaseOrder-sale'>
                <View className='title'>年卡会员</View>
                <Tools title={""} key={101} name={"门票减免"} num="" price={"-"+orderInfo.yearsubtract} pricecolor='red'></Tools>
                <Tools title={""} key={101} name={"项目减免"} num="" price={"-"+orderInfo.discount} pricecolor='red'></Tools>
            </View>
            {/*  TODO ostatus >= 1  */}
            {orderInfo.ostatus >= 0 ? (
                <View className='LeaseOrder-people'>
                    <View className='title'>项目合作</View>
                    <View className='start-people'>
                        <Text className='title'>发起人：</Text>{orderInfo.uname}
                    </View>
                    <View className='start-people'>
                        <Text className='title'>参与人：</Text>
                        <View className='join'>
                            {orderInfo.prebook.prebookusers.map((item, index) => (
                                item.vstatus == 1 ? (
                                    <AtTag key={index} className='tag'>{item.uname}</AtTag>
                                ) : ''
                            ))}
                        </View>
                    </View>

                </View>
            ) : ''}
            <View className='LeaseOrder-code'>
                {orderInfo.ostatus == 0 ? (
                    <View className='title'>扫码即可完成支付</View>
                ) : (
                    <View className='title'>扫码查看订单信息</View>
                )}

                {!shareStatus && !applyListStatus && !addToolStatus && !applyJoinPayStatus ? (
                    <View className='qrcode'>
                        <canvas class='canvas' canvas-id='canvas' bindlongtap='save'></canvas>
                    </View>
                ) : ''}

            </View>
            {orderInfo.ostatus == 0 && router.params.identity == 'my' ? (
                <View>
                    <View className='lease-order-countdown'>
                        <Text>支付倒计时</Text>
                        <AtCountdown
                        isShowHour={false}
                        minutes={countDownH}
                        seconds={countDownS}
                        onTimeUp={countDownTimeUp}
                        />
                    </View>
                    <View className='lease-order-pay-selector'>
                        <AtSwitch class='switch' border={false} title='铊币支付' checked={isTBPay} color="#45AD21" onChange={isTbPayChange} />
                    </View>
                    <View className='lease-order-pay-protocol'>
                        <Radio onClick={agreePayProtocol} checked={payProtocol}></Radio>
                        <View>
                        我已阅读并同意
                        <Text onClick={dumpProtocol} data-url="https://apidev.leclubthallium.com/Uploads/Picture/2023-07-12/p1.pdf" className='href-text'>《租赁服务协议》</Text>与
                        <Text onClick={dumpProtocol} data-url="https://apidev.leclubthallium.com/Uploads/Picture/2023-07-12/p2.pdf" className='href-text'>《隐私协议》</Text>与
                        <Text onClick={dumpProtocol} data-url="https://apidev.leclubthallium.com/Uploads/Picture/2023-07-12/p3.pdf" className='href-text'>《数字证书使用协议》</Text>
                        </View>
                    </View>
                </View>
            ) : ''}
            {/* TODO ostatus=0 */}
            {orderInfo.ostatus == 0 && router.params.identity == 'my' ? (
                <View className='LeaseOrder-footer'>
                    <View className='title'>订单金额：￥{orderInfo.totalpay}</View>
                    <Button className='sub-btn' type='primary' onClick={orderPay}>立即预约</Button>
                </View>

            ) : ''}
            {/* TODO ostatus=1 */}
            {orderInfo.ostatus == 1 && router.params.identity == 'share' ? (
                <View className='LeaseOrder-footer-apply'>
                    <Button  onClick={applyJoinSelectFunc} type='primary'>申请加入</Button>
                </View>
             ) : ''} 

            {orderInfo.ostatus == 1 && router.params.identity == 'my' ? (
                <View className='LeaseOrder-footer-manage'>
                    <View className='foot-btn-q'>
                        <AtBadge value={orderInfo.waitusercount?orderInfo.waitusercount:0} maxValue={99}>
                            <Button className='manage-btn' type='default' onClick={openApplyList}>申请列表</Button>
                        </AtBadge>
                    </View>
                    <View className='foot-btn'>
                        <Button className='manage-btn' type='default' onClick={openAddTool}>增加工具箱</Button>
                    </View>
                    <View className='foot-btn-q'>
                        <Button className='manage-btn' type='default' onClick={openShare}>
                            分享
                        </Button>
                    </View>
                </View>
            ) : ''}



            {/*  */}
            {/* 申请列表弹层 */}
            <AtModal isOpened={applyListStatus} onClose={closeApplyList}>
                <AtModalHeader>申请列表</AtModalHeader>
                <AtModalContent>
                    <View className='apply-list'>
                        {/* <Apply key={1} jid={1} pass={pass} unpass={unpass} name={"aaa"}></Apply> */}
                        {applyList.map((item, index) => (
                            item.vstatus == 0 ? (
                                <Apply key={index} jid={item.id} pass={pass} unpass={unpass} name={item.uname}></Apply>
                            ) : ''
                        ))}

                    </View>
                </AtModalContent>
                <AtModalAction> <Button onClick={closeApplyList}>取消</Button> </AtModalAction>
            </AtModal>

            {/* 添加工具弹窗 */}
            <AtModal isOpened={addToolStatus} onClose={closeAddTool}>
                <AtModalHeader>添加工具</AtModalHeader>
                <AtModalContent>
                    <AtList>
                        {/* {tools.map((item, index) => ( */}
                        <AtRadio

                            options={tools}
                            value={selectTool}
                            onClick={selectToolFunc}
                        />
                        {/* ))} */}
                    </AtList>
                    <AtSwitch class='switch' border={false} title='铊币支付' checked={isTBPay} color="#45AD21" onChange={isTbPayChange} />
                </AtModalContent>
                <AtModalAction> <Button onClick={closeAddTool}>取消</Button> <Button onClick={payToolMyPrice}>确定</Button></AtModalAction>
            </AtModal>

            {/* 分享弹窗 */}
            <AtActionSheet key={1} isOpened={shareStatus} cancelText='取消' title='分享' onClose={closeShare}>
                {/* <AtActionSheetItem> */}
                <View className='LeaseOrder-share'>
                    <View className='share'>
                        <Button type='primary' size='mini' openType={"share"}>微信好友</Button>
                    </View>
                    <View className='share'>
                        <Button type='default' size='mini' data-oid={router.params.orderId} data-cid={13} data-type={"share"} data-title={orderInfo.prebook.etitle} onClick={shareCommunity}>我的社区</Button>
                    </View>
                </View>
                {/* </AtActionSheetItem> */}
            </AtActionSheet>

            {/* 申请加入弹窗 */}
            <AtModal isOpened={applyJoinStatus}>
                <AtModalHeader>申请加入</AtModalHeader>
                <AtModalContent>
                    拼团需要审核通过。通过后无需支付实验费用，但需要自行购买门票入场。
                </AtModalContent>
                <AtModalAction> <Button onClick={()=>setApplyJoinStatus(false)}>取消</Button> <Button onClick={applyJoinFreeFunc}>确定</Button> </AtModalAction>
            </AtModal>

            {/* 申请支付弹窗 */}
            <AtActionSheet key={2} isOpened={applyJoinPayStatus} cancelText='取消' title='付费加入' onCancel={closeApplyJoinPayStatus} onClose={closeApplyJoinPayStatus}>
                <AtActionSheetItem data-paytype="miniwxpay" onClick={applyJoinMiniWxpayFunc}>
                    微信支付
                </AtActionSheetItem>
                <AtActionSheetItem data-paytype="ta" onClick={applyJoinTaFunc}>
                    铊币支付
                </AtActionSheetItem>
            </AtActionSheet>
        </View>
    )
}

export default LeaseOrder;