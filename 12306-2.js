;(function () {
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
                console.time('testForEach');
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
                                    console.timeEnd('testForEach');
                                    //alert(x.queryLeftNewDTO.station_train_code)
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
                                    console.timeEnd('testForEach');
                                    //alert(x.queryLeftNewDTO.station_train_code)
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
                                    console.timeEnd('testForEach');
                                    //alert(x.queryLeftNewDTO.station_train_code)
                                    checkG1234(x.secretStr,x.queryLeftNewDTO.start_time,x.queryLeftNewDTO.train_no,x.queryLeftNewDTO.from_station_telecode,x.queryLeftNewDTO.to_station_telecode);
                                }else{
                                    continue;
                                }
                               
                            }
                        }
                        for(var i=0;i<trainCode.length;i++){
                            //console.log(x.queryLeftNewDTO)
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
    getMyTicket()
    //var timer_=setInterval(getMyTicket,3000);
})();

