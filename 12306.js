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
                data.data.forEach(function(x){
                    //console.log(x)
                    if (x.queryLeftNewDTO.station_train_code==trainCode && 
                        x.queryLeftNewDTO.canWebBuy=="Y") 
                    {
                        checkG1234(x.secretStr,x.queryLeftNewDTO.start_time,x.queryLeftNewDTO.train_no,x.queryLeftNewDTO.from_station_telecode,x.queryLeftNewDTO.to_station_telecode);
                        clearInterval(timer_);
                    }
                });
            },
            error: function (error, status) {
                console.log("粗错啦! ", error);
                clearInterval(timer_);
            }
        });
    }
    var timer_=setInterval(getMyTicket,500);
})();
