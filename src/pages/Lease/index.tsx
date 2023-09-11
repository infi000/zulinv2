
import Taro, { useState, useEffect, useDidShow, useRouter } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image, Video, Button } from '@tarojs/components';
import { AtList, AtListItem, AtInput, AtButton, AtInputNumber, AtCalendar, AtFloatLayout } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux';
import { currentDate,currentHour, showToast } from '@/utils/util';

import './index.scss';
import LeaseRadio from './Modules/LeaseRadio';
import LeaseTools from './Modules/tools';
import Residue from './Modules/residue';

import { getExperimentDetailService, getEquipmentsService, getToolsService, getToolService, getEquipmentBookTimes, orderadd } from './services';

const img = "https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180";
const Lease = () => {
    const router = useRouter();
    const roomDefault = [
        { num: '可约', money: 800, timer: "10:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "11:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "12:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "13:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "14:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "15:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "16:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "17:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "18:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "19:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "20:00", status: 'Residue-warp' },
        { num: '可约', money: 800, timer: "21:00", status: 'Residue-warp' },
        // { num: '可约', money: 800, timer: "22:00", status: 'Residue-warp' }
    ];

    const [experimentsDetail, setExperimentsDetail] = useState<any>({}); // 标题
    const [rooms, setRooms] = useState<any>([]); // 房间信息
    const [tools, setTools] = useState<any>([]); // 工具信息
    const [timer, setTimer] = useState(1); // 预约市场，单位：小时
    const [selectorDateStatus, setSelectorDateStatus] = useState(true); // 是否可以选日期
    const [maxAtInputNumber, setMaxAtInputNumber] = useState(15); // 可选择最大时长
    const [curDate, setCurDate] = useState(''); // 今日日期

    const [startTimeSel, setStartTimeSel] = useState('请选择开始时间'); // 选择开始时间
    const [endTimeSel, setEndTimeSel] = useState('--'); // 选择结束时间
    const [dateSel, setDateSel] = useState(''); // 选择的日期
    const [phone, setPhone] = useState(''); // 手机号
    const [remark, setRemark] = useState(''); // 备注信息
    const [room, setRoom] = useState<any>({}); // 选择的房间
    const [toolBox, setToolBox] = useState<any>({}); // 选择的工具箱信息
    const [tool, setTool] = useState<any>([]); // 选择的工具信息

    // 开始时间弹窗控制
    const [startTimeLayout, setStartTimeLayout] = useState<any>(false)
    const startTimeLayoutCloseFunc = () => {
        setStartTimeLayout(false);
        setTimerLayout(true);
    }
    // 选择时长弹窗控制
    const [timerLayout, setTimerLayout] = useState<any>(false)
    const timerLayoutCloseFunc = () => {
        setTimerLayout(false);
    }

    // const dispatch = useDispatch();

    const [residue, setResidue] = useState<any>([]); // 当日时间段剩余信息

    const [timerDesc, setTimerDesc] = useState('时长最少一个小时'); // 时间说明文案
    const getData = async ({ eid }) => {
        
        
        // 获取项目信息
        getExperimentDetailService({ eid: eid }).then((res) => {
            for(let i=0; i<res.pics.length; i++){
                let item = res.pics[i];
                let path = item.pic;
                let suffix = path.substring(path.lastIndexOf(".")+1);
                if(suffix == 'mp4'){
                    res.pics[i].type = 'video'
                }else{
                    res.pics[i].type = 'image'
                }
            }
            res.pics.sort((a,b)=>{
                return parseInt(a.sort)-parseInt(b.sort);
            })
            setExperimentsDetail(res);
        });

        // 获取房间列表（设备列表）
        getEquipmentsService({eid:eid}).then((res) => {
            for (let i = 0; i < res.equipments.length; i++) {
                res.equipments[i]['status'] = i==0?'LeaseRadio-warp-selector':'LeaseRadio-warp';
            }

            setRooms(res.equipments);
            setRoom(res.equipments[0]);
            setSelectorDateStatus(false);
            let curDate = currentDate();
            console.log("房间ID-当前日期",res.equipments[0].id, curDate)
            getEquipmentbooktimes(res.equipments[0].id, curDate);
            
        });

        // 获取工具箱列表
        getToolsService({eid:eid}).then((res) => {
            for (let i = 0; i < res.toolboxs.length; i++) {
                res.toolboxs[i]['status'] = 'LeaseTools-warp';
            }
            setTools(res.toolboxs);
        });
        
    }

    // 选择房间
    const roomClick = (event) => {

        let index = event.currentTarget.dataset.index;
        const _rooms = [] as any[];
        let room = {} as any;
        for (let i = 0; i < rooms.length; i++) {
            if (i == index) {
                rooms[i].status = 'LeaseRadio-warp-selector';
                room = rooms[i];
            } else {
                rooms[i].status = 'LeaseRadio-warp';
            }
            _rooms.push(rooms[i])
        }

        setRooms([..._rooms]);
        setRoom(room);
        setSelectorDateStatus(false);

        if (dateSel) {
            getEquipmentbooktimes(room.id, dateSel);
        }
    }

    // 选择工具
    const toolsClick = (event) => {

        let index = event.currentTarget.dataset.index;
        const _tools = [] as any[];
        let tool = {} as any;
        for (let i = 0; i < tools.length; i++) {
            if (i == index) {
                tools[i].status = 'LeaseTools-warp-selector';
                tool = tools[i];
            } else {
                tools[i].status = 'LeaseTools-warp';
            }
            _tools.push(tools[i])
        }

        setTools([..._tools]);
        setToolBox(tool);
        // 获取工具箱工具信息
        getToolService({ tbid: tool.id }).then((res) => {
            setTool(res.tools);
        })
    }

    // 选择开始时间
    const residueClick = (event) => {
        if (!room.id || !dateSel) {
            showToast("请选择房间和预约日期")
            return;
        }

        let index = event.currentTarget.dataset.index;
        const _residue = [] as any[];
        let cur = { timer: '' };
        for (let i = 0; i < residue.length; i++) {
            // residue.length > 0 && residue[i]['status'] == 'Residue-warp-selector'
            if (residue[i].status != 'Residue-warp-disabled') {
                if (i == index) {
                    residue[i].status = 'Residue-warp-selector';
                    cur = residue[i];
                } else {
                    residue[i].status = 'Residue-warp';
                }
            }
            _residue.push(residue[i])
        }

        setResidue([..._residue]);
        if (cur.timer) {

            // 计算可以选择的时长
            let _max = 1;
            for (let i = 0; i < _residue.length; i++) {
                if (parseInt(cur.timer) < parseInt(_residue[i].timer)) {
                    if (_residue[i].status == 'Residue-warp-disabled') {

                        break;
                    }
                    _max++;
                }
            }

            setMaxAtInputNumber(_max);
            setStartTimeSel(cur.timer); // 设置开始时间
            if (timer > _max) {
                setTimer(_max);
                setEndTimeSel(parseInt(cur.timer) + _max + ":00") // 设置结束时间
            } else {
                setEndTimeSel(parseInt(cur.timer) + timer + ":00")
            }


        } else {
            setStartTimeSel('请选择开始时间'); // 设置开始时间
            setEndTimeSel("--")
        }
        // 关闭选择开始时间弹窗
        // startTimeLayoutCloseFunc();
        // 开启选择时长弹层
        // setTimerLayout(true);
    }

    // 选择预约日期
    const onDateChange = e => {
        setDateSel(e.value)
        // 获取今日房间预约情况
        if (room.id) {
            getEquipmentbooktimes(room.id, e.value);
        }
        setStartTimeLayout(true);
    }

    // 预留信息
    const phoneChange = (value) => {
        setPhone(value);
        return value
    }
    const remarkChange = (value) => {
        setRemark(value);
        return value
    }
    const timerChange = (value) => {
        setTimer(value);
        setEndTimeSel(parseInt(startTimeSel) + value + ":00") // 设置结束时间
        return value
    }

    useDidShow(() => {
        timerLayoutCloseFunc();
        // setResidue(roomDefault);
        const { params } = router;
        const { eid } = params;
        getData({ eid });
        // 获取当前日期
        let curdate = currentDate();
        console.log("获取当前日期",curdate);
        // 设置当前日期可选择范围
        setCurDate(curdate); 
        setDateSel(curdate);
        // 设置当前选中日期
        // onDateChange({value: curdate})
        // dispatch({ type: 'lease/getExperimentDetail', payload: { eid } });
        
    })

    // 获取房间已预约的时间
    const getEquipmentbooktimes = async (epid, prebookdate) => {
        let curHour = currentHour();
        let todaydate = currentDate();
        await getEquipmentBookTimes({
            epid: epid,
            prebookdate: prebookdate,
            eid: router.params.eid
        }).then((res) => {
            if(res.prebooks.length == 0){
               console.log("------------",roomDefault, residue);
                // setResidue(roomDefault);
                for (let i = 0; i < roomDefault.length; i++) {
                    let _hour = parseFloat(roomDefault[i]['timer']);
                    console.log("------------",_hour, curHour, todaydate, prebookdate);
                    if (_hour <= curHour && (todaydate == prebookdate || prebookdate=='')) {
                        if(residue.length > 0 && residue[i]['status'] == 'Residue-warp-selector'){
                            setStartTimeSel('请选择开始时间'); // 设置开始时间
                            setEndTimeSel("--")
                        }
                        roomDefault[i]['status'] = 'Residue-warp-disabled';
                        roomDefault[i]['num'] = '不可约';
                    }else if(residue.length > 0 && residue[i]['status'] == 'Residue-warp-selector'){
                        roomDefault[i]['status'] = 'Residue-warp-selector';
                        roomDefault[i]['num'] = '可约';
                    }else{
                        roomDefault[i]['status'] = 'Residue-warp';
                        roomDefault[i]['num'] = '可约';
                    }
                }
                setResidue([...roomDefault]);
            }else{
                for (let v = 0; v < res.prebooks.length; v++) {
                    let starttime = new Date(parseInt(res.prebooks[v]['starttime']) * 1000);
                    let endtime = new Date(parseInt(res.prebooks[v]['endtime']) * 1000);
                    let starttimeHour = starttime.getHours();
                    let endtimeHour = endtime.getHours();

                    for (let i = 0; i < roomDefault.length; i++) {
                        if(roomDefault[i]['status'] == 'Residue-warp-disabled'){
                            continue;
                        }
                        let _hour = parseFloat(roomDefault[i]['timer']);
                        console.log("------------",_hour, curHour, todaydate, prebookdate);
                        if ((_hour >= starttimeHour && _hour < endtimeHour) || (_hour <= curHour && (todaydate == prebookdate || prebookdate==''))) {
                            if(residue.length > 0 && residue[i]['status'] == 'Residue-warp-selector'){
                                setStartTimeSel('请选择开始时间'); // 设置开始时间
                                setEndTimeSel("--")
                            }
                            roomDefault[i]['status'] = 'Residue-warp-disabled';
                            roomDefault[i]['num'] = '不可约';
                        }else if(residue.length > 0 && residue[i]['status'] == 'Residue-warp-selector'){
                            roomDefault[i]['status'] = 'Residue-warp-selector';
                            roomDefault[i]['num'] = '可约';
                        }else{
                            roomDefault[i]['status'] = 'Residue-warp';
                            roomDefault[i]['num'] = '可约';
                        }
                    }
                }
                setResidue([...roomDefault]);
            }
        });
    }

    const submitOrder = () => {
        // TODO 获取优惠信息
        // 统计工具金额
        if(tool.length <= 0){
            showToast("请选择工具箱");
            return ;
        }
        if(startTimeSel=='请选择开始时间'){
            showToast("请选择开始时间");
            return ;
        }
        if(endTimeSel=='--'){
            showToast("请选择时长时间");
            return ;
        }
        let eptotalprice = 0 as any;
        let toolsConfig = { tools: [] as any[] };
        for (let i = 0; i < tool.length; i++) {
            eptotalprice += parseFloat(tool[i].price);
            toolsConfig.tools.push({ id: tool[i].id, tbid: tool[i].tbid, price: tool[i].price })
        }
        // let countPrice = parseFloat(eptotalprice) + (parseFloat(room.price)+parseFloat(experimentsDetail.deposit)) * timer;
        let h = timer;
        if(timer > 3){
            h = 3;
        }
        // 设备租赁总价格
        console.log("开台费/设备费:", room.price);
        console.log("时长：", h);
        console.log("门票：", experimentsDetail.deposit);
        console.log("押金", eptotalprice);
        let shebei = parseFloat(room.price) * h ;
        // 总价格
        let countPrice = parseFloat(eptotalprice) + shebei + parseFloat(experimentsDetail.deposit)*3;// * timer;
        let params = {
            eid: experimentsDetail.id,
            edeposit: parseFloat(experimentsDetail.deposit)*3,//parseFloat(eptotalprice),// 押金 parseFloat(experimentsDetail.deposit),//*timer,//parseFloat(eptotalprice),
            epid: room.id,
            eptotalprice: shebei,
            starttime: dateSel + " " + startTimeSel,
            endtime: dateSel + " " + endTimeSel,
            uphone: phone,
            title: experimentsDetail.title,
            total: countPrice,
            totalpay: countPrice,
            tools: JSON.stringify(toolsConfig),
            
        };
        if (remark) {
            params.remark = remark;
        }

        if(!params.epid){
            showToast("请选择房间");
            return ;
        }
        if(params.starttime==' 请选择开始时间'){
            showToast("请选择开始时间");
            return ;
        }
        if(params.endtime==' --'){
            showToast("请选择时长");
            return ;
        }
        if(!params.uphone){
            showToast("请填写手机号");
            return ;
        }
        if(!(/^1[3456789]\d{9}$/.test(params.uphone))){ 
            showToast("手机号码有误，请重填");  
            return ; 
        } 

        orderadd(params).then((res) => {
            Taro.navigateTo({ url: '/pages/LeaseOrder/index?orderId=' + res.oid+"&identity=my" });
        })
    }

    return (
        <View className='lease-warp'>
            <View className='at-article lease-title'>
                <View className='at-article__h2'>
                    {experimentsDetail.title}
                </View>
            </View>
            <View>
                <Swiper
                    className='test-h'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    autoplay={false}
                    >
                    {experimentsDetail.pics.map((item, index) => (
                        <SwiperItem key={index}>
                            <View className='demo-text-1'>
                                {item.type == 'video'?(
                                    <Video
                                    className='index-video'
                                    style={"width:100%"}
                                    src={item.pic}
                                    controls={false}
                                    autoplay={true}
                                    // poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                                    initialTime={0}
                                    id='video'
                                    loop={true}
                                    muted={true}
                                    showMuteBtn={true}
                                />
                                ):(
                                    <Image className='lease-swiper-img' src={item.pic} mode="aspectFit" />
                                )
                                
                                }
                            </View>
                        </SwiperItem>
                    ))}
                </Swiper>
            </View>
            <View className='at-article lease-explain'>
                <View className='at-article__info'>
                    {experimentsDetail.des}
                </View>
            </View>
            <View className='at-article lease-title'>
                <View className='at-article__h2 lease-h2'>
                    <View className='lease-h2-icon'></View>房间
                </View>
                <View className='lease-rooms'>
                    {rooms.map((item, index) => (
                        <View key={index} onClick={roomClick} data-index={index}>
                            <LeaseRadio name={item.title} money={item.price} timer={item.ctime} status={item.status}></LeaseRadio>
                        </View>
                    ))}
                </View>
            </View>

            <View className='at-article lease-title'>
                <View className='at-article__h2 lease-h2'>
                    <View className='lease-h2-icon'></View>工具套装
                </View>
                <View className='lease-rooms'>
                    {tools.map((item, index) => (
                        <View key={index} onClick={toolsClick} data-index={index}>
                            <LeaseTools name={item.title} pic={item.thumbinal} status={item.status}></LeaseTools>
                        </View>
                    ))}
                </View>
            </View>
            <View className='at-article lease-title'>
                <View className='at-article__h2 lease-h2'>
                    <View className='lease-h2-icon'></View>预约时间
                </View>
                <View className='lease-calendar'>
                    {/* <Picker disabled={selectorDateStatus} className='lease-selector-date' mode='date' onChange={onDateChange}>
                        <AtList>
                            <AtListItem title='请选择预约日期' extraText={dateSel} />
                        </AtList>
                    </Picker> */}
                    <AtCalendar 
                        isSwiper 
                        minDate={curDate} 
                        onDayClick={onDateChange}  
                    />
                </View>

                <View className='lease-rooms'>
                    {residue.map((item, index) => (
                        <View key={index} onClick={residueClick} data-index={index}>
                            <Residue num={item.num} money={item.money} timer={item.timer} status={item.status}></Residue>
                        </View>
                    ))}
                </View>
                <View className='lease-selector-timer'>

                    <View className='lease-selector-timer-num'>
                        <View>请选择时长：</View>
                        <AtInputNumber
                            type="number"
                            disabledInput
                            min={1}
                            max={maxAtInputNumber}
                            step={1}
                            value={timer}
                            onChange={timerChange}
                        />
                        <View>（小时）</View>
                    </View>
                    <View className='lease-selector-res'>
                        <View className='start-time'>
                            <View className='start-time-num'>{startTimeSel}</View>
                            <View className='start-time-desc'>起始时间</View>
                        </View>
                        <View className='center-symbol'>~</View>
                        <View className='end-time'>
                            <View className='end-time-num'>{endTimeSel}</View>
                            <View className='end-time-desc'>结束时间</View>
                        </View>
                    </View>

                </View>


                <View className='at-article lease-title'>
                    <View className='at-article__h2 lease-h2'>
                        <View className='lease-h2-icon'></View>预留信息
                    </View>
                    <View className='lease-selector-timer'>
                        <AtInput
                            name='phone'
                            border={false}
                            title='手机号码'
                            type='phone'
                            placeholder='手机号码'
                            value={phone}
                            onChange={phoneChange}
                        />
                        <AtInput
                            name='remark'
                            title='备注'
                            type='text'
                            placeholder='请填写备注信息'
                            value={remark}
                            onChange={remarkChange}
                        />
                    </View>
                </View>
            </View>
            <View className='lease-sub-info'>
                <View className='title'>{experimentsDetail.title}</View>
                <AtButton className='sub-btn' onClick={submitOrder} type='primary'>提交</AtButton>
            </View>
            {/* 选择开始时间弹层 */}
            <View>
                <AtFloatLayout isOpened={startTimeLayout} title="请选择开始时间" onClose={startTimeLayoutCloseFunc}>
                    <View className='lease-rooms-layout'>
                            {residue.map((item, index) => (
                                <View key={index} onClick={residueClick} data-index={index}>
                                    <Residue num={item.num} money={item.money} timer={item.timer} status={item.status}></Residue>
                                </View>
                            ))}
                    </View>
                    <Button key={1} onClick={startTimeLayoutCloseFunc} className='lease-starttimer-subbtn'>确定</Button>
                </AtFloatLayout>
            </View>
            {/* 选择时长弹层 */}
            <View style={`display: ${timerLayout?'':'none'}` }>
                <AtFloatLayout isOpened={timerLayout} title="请选择时长" onClose={timerLayoutCloseFunc}>
                <View className='lease-selector-timer'>
                    <View className='lease-selector-timer-num'>
                        <AtInputNumber
                            type="number"
                            disabledInput
                            min={1}
                            max={maxAtInputNumber}
                            step={1}
                            value={timer}
                            onChange={timerChange}
                        />
                        <View>（小时）</View>
                    </View>
                    <Button key={2} onClick={timerLayoutCloseFunc} className='lease-timer-subbtn'>确定</Button>
                </View>
                </AtFloatLayout>
            </View>
        </View>
    );
}

export default Lease;