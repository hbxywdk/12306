;(function () {
    var when="2016-10-10",//乘车日期
    from="WHN",//从
    to="IOQ",//到

    trainCode=["K1091","G1005","T95","G1001"],//车次 优先顺序 若两或多趟车次同时满足条件，优先选择前面的
    seat={
        //K T Z车次想要的座位类型
        KTZ:["yw_num","yz_num","rw_num"],
        //高铁想要的座位类型
        D:["ze_num","zy_num"],
        //高铁想要的座位类型
        G:["ze_num","zy_num"]   
    };
    var key=true;
//alert(seat.KTZ.length)
    function getMyTicket(){
        
        $.ajax({
            type: "GET",
            url: "https://kyfw.12306.cn/otn/leftTicket/queryT",
            data: "leftTicketDTO.train_date=" + when + "&leftTicketDTO.from_station=" +
            from + "&leftTicketDTO.to_station=" + to + "&purpose_codes=ADULT",
            success: function (data) {
                console.time('testForEach');
                console.log("我刷！");
                for (var i = 0; i < trainCode.length; i++) {
                    //trainCode[i]
                    if (key) {
                        for (var j = 0; j < data.data.length; j++) {
                            //console.log(  trainCode[i] )
                            if (trainCode[i] != data.data[j].queryLeftNewDTO.station_train_code) {
                                continue;
                            }else{
                                //console.error(1)
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
                                    //console.error(2)
                                    if (data.data[j].queryLeftNewDTO[ seat.KTZ[w] ]!=="无" &&　data.data[j].queryLeftNewDTO[ seat.KTZ[w]  ]!=="--") {
                                        console.timeEnd('testForEach');
                                       //alert(x.queryLeftNewDTO.station_train_code)
                                        clearInterval(timer_);
                                        key=!key;
                                        checkG1234(data.data[j].secretStr,data.data[j].queryLeftNewDTO.start_time,data.data[j].queryLeftNewDTO.train_no,data.data[j].queryLeftNewDTO.from_station_telecode,data.data[j].queryLeftNewDTO.to_station_telecode);
                                        return;
                                    }else{
                                        //console.error(1)
                                        continue;
                                    }
                                   
                                }
                            }
                            function dongche(){
                                for (var w =  0; w < seat.D.length; w++) {
                                    if (data.data[j].queryLeftNewDTO[ seat.D[w]  ]!=="无" &&　data.data[j].queryLeftNewDTO[ seat.D[w]  ]!=="--") {
                                        console.timeEnd('testForEach');
                                        console.log(data.data[j].queryLeftNewDTO.station_train_code);
                                                                     console.log(data.data[j].queryLeftNewDTO.station_train_code);
                                        //alert(x.queryLeftNewDTO.station_train_code)
                                        clearInterval(timer_);
                                        key=!key;
                                        checkG1234(data.data[j].secretStr,data.data[j].queryLeftNewDTO.start_time,data.data[j].queryLeftNewDTO.train_no,data.data[j].queryLeftNewDTO.from_station_telecode,data.data[j].queryLeftNewDTO.to_station_telecode);
                                        return;
                                    }else{
                                        continue;
                                    }
                                   
                                }
                            }
                            function gaotie(){
                                for (var w =  0; w < seat.G.length; w++) {
                                    if (data.data[j].queryLeftNewDTO[ seat.G[w]  ]!=="无" &&　data.data[j].queryLeftNewDTO[ seat.G[w]  ]!=="--") {
                                        console.timeEnd('testForEach');
                                        console.log(data.data[j].queryLeftNewDTO.station_train_code);
                                        //alert(x.queryLeftNewDTO.station_train_code)
                                        clearInterval(timer_);
                                        key=!key;
                                        checkG1234(data.data[j].secretStr,data.data[j].queryLeftNewDTO.start_time,data.data[j].queryLeftNewDTO.train_no,data.data[j].queryLeftNewDTO.from_station_telecode,data.data[j].queryLeftNewDTO.to_station_telecode);
                                        return;
                                    }else{
                                        continue;
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


/*;(function () {
    var when="2016-10-15",//乘车日期
    from="WHN",//从
    to="IOQ",//到

    trainCode=["Z23","G1001","G1005"],//车次 优先顺序 若两或多趟车次同时满足条件，优先选择前面的
    seat={
        //K T Z车次想要的座位类型
        "KTZ":["yw_num","yz_num"],
        //高铁想要的座位类型
        "D":["ze_num","zy_num"],
        //高铁想要的座位类型
        "G":["ze_num","zy_num"]   
    };
//alert(seat.KTZ.length)
    function getMyTicket(){
        $.ajax({
            type: "GET",
            url: "https://kyfw.12306.cn/otn/leftTicket/queryT",
            data: "leftTicketDTO.train_date=" + when + "&leftTicketDTO.from_station=" +
            from + "&leftTicketDTO.to_station=" + to + "&purpose_codes=ADULT",
            success: function (data) {
                //console.log("我刷！");
                //console.log(data)
                data.data.forEach(function(x){
                    //console.log(x)
                    if (x.queryLeftNewDTO.canWebBuy=="Y") 
                    {
                        //console.log("有票的");
                        //KTZ
                        function ordinary(){
                            for (var i =  0; i < seat["KTZ"].length; i++) {
                                if (x.queryLeftNewDTO[ seat["KTZ"] ]!=="无" &&　x.queryLeftNewDTO[ seat["KTZ"] ]!=="--") {
                                    alert(x.queryLeftNewDTO.station_train_code)
                                    checkG1234(x.secretStr,x.queryLeftNewDTO.start_time,x.queryLeftNewDTO.train_no,x.queryLeftNewDTO.from_station_telecode,x.queryLeftNewDTO.to_station_telecode);
                                }else{
                                    continue;
                                }
                               
                            }
                        }
                        //D
                        function dongche(){
                            for (var i =  0; i < seat["D"].length; i++) {
                                if (x.queryLeftNewDTO[ seat["D"] ]!=="无" &&　x.queryLeftNewDTO[ seat["D"] ]!=="--") {
                                    alert(x.queryLeftNewDTO.station_train_code)
                                    checkG1234(x.secretStr,x.queryLeftNewDTO.start_time,x.queryLeftNewDTO.train_no,x.queryLeftNewDTO.from_station_telecode,x.queryLeftNewDTO.to_station_telecode);
                                }else{
                                    continue;
                                }
                               
                            }
                        }
                        //G
                        function gaotie(){
                            for (var i =  0; i < seat["G"].length; i++) {
                                if (x.queryLeftNewDTO[ seat["G"] ]!=="无" &&　x.queryLeftNewDTO[ seat["G"] ]!=="--") {
                                    alert(x.queryLeftNewDTO.station_train_code)
                                    checkG1234(x.secretStr,x.queryLeftNewDTO.start_time,x.queryLeftNewDTO.train_no,x.queryLeftNewDTO.from_station_telecode,x.queryLeftNewDTO.to_station_telecode);
                                }else{
                                    continue;
                                }
                               
                            }
                        }
                        for(var i=0;i<trainCode.length;i++){
                            console.log(x.queryLeftNewDTO)
                            if (x.queryLeftNewDTO.station_train_code==trainCode[i]) {

                                switch( x.queryLeftNewDTO.station_train_code.substr(0,1) )
                                {
                                case 'K':
                                    //alert("K");
                                    ordinary();
                                    break;
                                case 'T':
                                    //alert("T");
                                    ordinary();
                                    break;
                                case 'Z':
                                    //alert("Z");
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

                            }
                        }
                        //checkG1234(x.secretStr,x.queryLeftNewDTO.start_time,x.queryLeftNewDTO.train_no,x.queryLeftNewDTO.from_station_telecode,x.queryLeftNewDTO.to_station_telecode);
                        //clearInterval(timer_);
                    }

                });
            },
            error: function (error, status) {
                console.log("粗错啦! ", error);
                //clearInterval(timer_);
            }
        });
    }
    //getMyTicket()
    var timer_=setInterval(getMyTicket,3000);
})();*/

