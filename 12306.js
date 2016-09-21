;(function () {
    var when="2016-10-07",//乘车日期
    from="WHN",//从
    to="IOQ",//到
    trainCode="G1001";//车次
    function getMyTicket(){
        $.ajax({
            type: "GET",
            url: "https://kyfw.12306.cn/otn/leftTicket/queryT",
            data: "leftTicketDTO.train_date=" + when + "&leftTicketDTO.from_station=" +
            from + "&leftTicketDTO.to_station=" + to + "&purpose_codes=ADULT",
            success: function (data) {
            	console.log("我刷！");
                for( x in data.data){
                    if (data.data[x].queryLeftNewDTO.station_train_code==trainCode && data.data[x].queryLeftNewDTO.canWebBuy=="Y") {
                        checkG1234(data.data[x].secretStr,data.data[x].queryLeftNewDTO.start_time,data.data[x].queryLeftNewDTO.train_no,data.data[x].queryLeftNewDTO.from_station_telecode,data.data[x].queryLeftNewDTO.to_station_telecode);
                        clearInterval(timer_);
                    }
                }
            },
            error: function (error, status) {
                console.log("粗错啦! ", error);
                clearInterval(timer_);
            }
        });
    }
    var timer_=setInterval(getMyTicket,500);
})();
