(function () {
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
    };
    var key=true;
    if (typeof Notification.requestPermission) Notification.requestPermission();
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
                                    ordinary();
                                    break;
                                case 'T':
                                    ordinary();
                                    break;
                                case 'Z':
                                    ordinary();
                                    break;
                                case 'D':
                                    dongche();
                                    break;
                                case 'G':
                                    gaotie();
                                    break;
                                default:
                                    alert();
                                }
                                break;

                            }
                            function ordinary(){
                                for (var w =  0; w < seat.KTZ.length; w++) {

                                    if (data.data[j].queryLeftNewDTO[ seat.KTZ[w] ]!=="无" &&　data.data[j].queryLeftNewDTO[ seat.KTZ[w]  ]!=="--") {
                                        console.timeEnd('testForEach');

                                        clearInterval(timer_);
                                        key=!key;
                                        new Notification(data.data[j].queryLeftNewDTO.station_train_code+'有票提醒', {  
                                            body: '有票啦！快快快！',  
                                            icon: 'http://itakeo.com/images/icon3.png',
                                            tag: 1  
                                        });
                                        checkG1234(data.data[j].secretStr,data.data[j].queryLeftNewDTO.start_time,data.data[j].queryLeftNewDTO.train_no,data.data[j].queryLeftNewDTO.from_station_telecode,data.data[j].queryLeftNewDTO.to_station_telecode);
                                        return;
                                    }
                                   
                                }
                            }
                            function dongche(){
                                for (var w =  0; w < seat.D.length; w++) {
                                    if (data.data[j].queryLeftNewDTO[ seat.D[w]  ]!=="无" &&　data.data[j].queryLeftNewDTO[ seat.D[w]  ]!=="--") {
                                        console.timeEnd('testForEach');

                                        clearInterval(timer_);
                                        key=!key;
                                        new Notification(data.data[j].queryLeftNewDTO.station_train_code+'有票提醒', {  
                                            body: '有票啦！快快快！',  
                                            icon: 'http://itakeo.com/images/icon3.png',
                                            tag: 1  
                                        });
                                        checkG1234(data.data[j].secretStr,data.data[j].queryLeftNewDTO.start_time,data.data[j].queryLeftNewDTO.train_no,data.data[j].queryLeftNewDTO.from_station_telecode,data.data[j].queryLeftNewDTO.to_station_telecode);
                                        return;
                                    }
                                   
                                }
                            }
                            function gaotie(){
                                for (var w =  0; w < seat.G.length; w++) {
                                    if (data.data[j].queryLeftNewDTO[ seat.G[w]  ]!=="无" &&　data.data[j].queryLeftNewDTO[ seat.G[w]  ]!=="--") {
                                        console.timeEnd('testForEach');

                                        clearInterval(timer_);
                                        key=!key;
                                        new Notification(data.data[j].queryLeftNewDTO.station_train_code+'有票提醒', {  
                                            body: '有票啦！快快快！',  
                                            icon: 'http://itakeo.com/images/icon3.png',
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
    //getMyTicket()
    var timer_=setInterval(getMyTicket,500);
})();
