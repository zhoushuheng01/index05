//@:放在SHA1，dot下面

/*
    @:ajax   
*/
function ajax(url, method, bodyParam, callBack) {
    var common_url = 'https://d.apicloud.com/mcm/api';
    var id = "A6919941751589";
    var now = Date.now();
    var appKey = SHA1(id + "UZ" + "EA5B6F20-8019-7DFB-F30B-0DB42BDE6473" + "UZ" + now) + "." + now;
    api.ajax({
        url: common_url + url,
        method: method,
        cache: false,
        timeout: 20,
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "X-APICloud-AppId": id,
            "X-APICloud-AppKey": appKey
        },
        data: {
            body: bodyParam
        }
    }, function(ret, err) {
        if( typeof callBack == 'function' ){
           callBack(ret, err);
        }else{
        	alert(6);
        }
    });
}



/*
     @ Init
     public: 封装ajax处理数据
     所有方法都挂载在 Init 原型上

     pageNum  必须

     * @skip,  跳过多少条数据，用来分页
     * @limit, 返回几条数据
     * @Boolean, 为true代表第一次加载，，执行dot，，为false在回调中，处理一下，向页面追加评论
     * @callback 回调
     *
     *
*/

function Init(pageNum) {
    this.limit = 10;
    this.skip = (pageNum -1) * 10;
};
Init.prototype = {
    constructor: Init,
    cours: function() {
        model.findAll({
            class: "cour_group",
            qid: this.queryId
        }, function(ret, err) {
            var data = ret;
            //api.alert({ msg: JSON.stringify(ret) });
            var evalText = doT.template($("#course").text());
            $("#aui-waterfall").html(evalText(data));
        });
    },
    ajax: function(url, mood, json, callback) {
        if( typeof callback ==　'function' ){
        	ajax(url, mood, json, callback);
        }
    }
};




/*
 * 日期处理
 */

function fnGetDate(date) {
    var createdAt = new Date(date).getTime(),
        now = new Date().getTime();

    var timeStamp = now - createdAt;

    var ret = '';

    if (1000 * 60 * 60 * 24 <= timeStamp) {
        ret = Math.ceil(timeStamp / (1000 * 60 * 60 * 24)) + '天';
    } else if (1000 * 60 * 60 <= timeStamp) {
        ret = Math.ceil(timeStamp / (1000 * 60 * 60)) + '小时';
    } else if (1000 * 60 <= timeStamp) {
        ret = Math.ceil(timeStamp / (1000 * 60)) + '分钟';
    } else {
        ret = Math.ceil(timeStamp / 1000) + '秒';
    }

    return ret;
};

/*
    图片缓存
 */

function Image_cache(url){
    api.imageCache({
        url: url
    }, function(ret, err) {
        var url = ret.url;

        return url;
    });
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}



function Format(data){
    var time = new Date(data);
    var timeString = time.Format("yyyy-MM-dd hh:mm:ss");


    return timeString;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//    Open  打开窗口

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Open(){

}
Open.prototype = {
    constructor: Open,
    /*
     @ Win  打开window 页面

     @ name 打开窗口的名字
     @ url  打开窗口的地址
     @ pageParam  传递到下一个页面的参数



     */
    Win : function(name,url,pageParam){
        api.openWin({
            name: name,
            url: url + '.html',
            pageParam:pageParam,
            bounces: false
        });
    },
    /*
     @ Frm  打开frame 页面

     @ name 打开窗口的名字
     @ url  打开窗口的地址
     @ rect {

         x,y,w,h
     }
     @ pageParam  传递到下一个页面的参数
     */
    Frm : function(name,url,rect,pageParam){
        api.openFrame({
            name: name,
            url: name+'.html',
            rect: rect,
            pageParam: pageParam,
            bounces: false
        });
    }
};