# 12306
12306.js是一个简单的刷票js脚本，可以指定车次。

12306-2.js是比12306.js稍微复杂些的js脚本，可选项有：（未完成）

1.发车日期 如：when="2016-10-15" （日期需要严格按照此格式填写，若遇个位数日期日，前面加0 ,"2016-10-9" ---> "2016-10-09"）

2.出发站 如：from="WHN"（武汉）

3.下车站 如：to="IOQ"（深圳）

4.车次 优先顺序 若两或多趟车次同时满足条件，优先选择前面的 如：trainCode=["Z24","G1001","G1004"]。

5.对于不同类型的车次，您愿意选择的座位，若选择的车次数组中的车次有对应的座位则会跳转到下一步，如：

"wz_num"  //Z K T D无座

"yz_num"  //Z K T硬座

"rz_num"  //Z K T软座

"yw_num"  //Z K T硬卧

"rw_num"  //Z K T软卧

"gr_num"  //高级软卧

"ze_num"  //高铁二等座 动车共用二等座

"zy_num"  //高铁一等座 动车共用一等座

"tz_num"  //高铁特等座

"swz_num" //高铁商务座

"qt_num"  //其他




                                                                                                       
                                                                         注：验证码以最终座位选择需手动填写










