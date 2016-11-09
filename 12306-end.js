~function () {
    var when="2016-12-29",//乘车日期
    from="IOQ",//从
    to="WHN",//到

    trainCode=["G1002","G1312","T96","Z24"],//车次 优先顺序 若两或多趟车次同时满足条件，优先选择前面的
    seat={
        //K T Z车次想要的座位类型 硬卧 硬座 软卧
        KTZ:["yw_num","yz_num","rw_num"],
        //高铁想要的座位类型 二等 一等
        D:["ze_num","zy_num"],
        //高铁想要的座位类型
        G:["ze_num","zy_num"]   
    },
    key=true,
    timer_;
    
    function getMyTicket(){
        $.ajax({
            type: "GET",
            url: "https://kyfw.12306.cn/otn/leftTicket/queryX",
            data: "leftTicketDTO.train_date=" + when + "&leftTicketDTO.from_station=" +
            from + "&leftTicketDTO.to_station=" + to + "&purpose_codes=ADULT",
            success: function (data) {
                console.time('testForEach');
                console.log("我刷！");
                for (var i = 0; i < trainCode.length; i++) {
                    if (key) {
                        for (var j = 0; j < data.data.length; j++) {
                            if (trainCode[i] != data.data[j].queryLeftNewDTO.station_train_code) {
                                continue;
                            }else{
                                var type=data.data[j].queryLeftNewDTO.station_train_code.substr(0,1);
                                switch( type )
                                {
                                case 'K':
                                    KTZDG('KTZ');
                                    break;
                                case 'T':
                                    KTZDG('KTZ');
                                    break;
                                case 'Z':
                                    KTZDG('KTZ');
                                    break;
                                case 'D':
                                    KTZDG('D');
                                    break;
                                case 'G':
                                    KTZDG('G');
                                    break;
                                default:
                                    alert('发生了什么？');
                                }
                                break;
                            }
                            function KTZDG(x){
                                var type;
                                if (x==='KTZ') {
                                    type='KTZ';
                                }else if (x==='D') {
                                    type='D';
                                }else if(x==='G'){
                                    type='G';
                                }
                                for (var w =  0; w < seat[type].length; w++) {
                                    if (data.data[j].queryLeftNewDTO[ seat[type][w] ]!=="无" &&　data.data[j].queryLeftNewDTO[ seat[type][w]  ]!=="--") {

                                        console.timeEnd('testForEach');
                                        clearInterval(timer_);
                                        key=!key;
                                        new Notification(data.data[j].queryLeftNewDTO.station_train_code+'有票提醒', {  
                                            body: '有票啦！快快快！',  
                                            icon: 'http://file.youboy.com/shangpu/79/24/55/4/10500674.jpg',
                                            tag: 1  
                                        });
                                        checkG1234(data.data[j].secretStr,data.data[j].queryLeftNewDTO.start_time,data.data[j].queryLeftNewDTO.train_no,data.data[j].queryLeftNewDTO.from_station_telecode,data.data[j].queryLeftNewDTO.to_station_telecode);
                                        return;
                                    }
                                }
                            }

                        }
                    }
                }
            },
            error: function (error, status) {
                console.log("粗错啦! ", error);
                clearInterval(timer_);
            }
        });
    }
    if (typeof Notification.requestPermission === 'function' && typeof Promise === 'function'){
        Notification.requestPermission()
        .then(function(){
            timer_=setInterval(getMyTicket,500);
        })
    } else{
        timer_=setInterval(getMyTicket,500);
    }
}()
