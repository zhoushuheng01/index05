	// 用于链接到淘宝链接
    var toDetail = function(obj){
        var url = $api.attr(obj,'data-url');
        var title = $api.attr(obj,'data-title');

        api.execScript({
            name: 'root',
            script: 'indexToDetail("'+title+'","'+url+'")'
        });
    };
// toWeb 链到移动端网页上

    var toWeb = function(obj){
        var url = $api.attr(obj,'data-url') ||'';
        var title = $api.attr(obj,'data-title');
        var frameName = $api.attr(obj,'data-frameName');
        var options = {
                title: title,
                url: url,
                frameName: frameName
            };
        options = JSON.stringify(options);

        // api.alert({msg:options});
        var str = 'indexToWeb('+options+')';
        api.execScript({
            name: 'root',
            script: str
        });
    };
    var toWebS = function(obj){
        var url = $api.attr(obj,'data-url') ||'';
        var title = $api.attr(obj,'data-title');
        var frameName = $api.attr(obj,'data-frameName');
        var options = {
                title: title,
                url: url,
                frameName: frameName
            };
        options = JSON.stringify(options);

        // api.alert({msg:options});
        var str = 'indexToWebS('+options+')';
        api.execScript({
            name: 'root',
            script: str
        });
    };
// toWeb end
// toNative app页面样式
    var toNative = function(obj){
        var url = $api.attr(obj,'data-url');
        var title = $api.attr(obj,'data-title');
        var frameName = $api.attr(obj,'data-frameName');
        var index = $api.attr(obj,'data-index');

        var pageParam = {
                title: title,
                url: url,
                frameName: frameName,
                index: 0
            };
        if (index >= 0) {
            pageParam.index = index;
        }
        pageParam = JSON.stringify(pageParam);
        var str = 'indexToNative('+pageParam+')';
        api.execScript({
            name: 'root',
            script: str
        });
    };
    var toNativeS = function(obj){
        var url = $api.attr(obj,'data-url');
        var title = $api.attr(obj,'data-title');
        var frameName = $api.attr(obj,'data-frameName');
        var index = $api.attr(obj,'data-index');

        var pageParam = {
                title: title,
                url: url,
                frameName: frameName,
                index: 0
            };
        if (index >= 0) {
            pageParam.index = index;
        }
        pageParam = JSON.stringify(pageParam);
        var str = 'indexToNativeS('+pageParam+')';
        api.execScript({
            name: 'root',
            script: str
        });
        
    };
    var toNativeSearch = function(obj){
        var title = $api.attr(obj,'data-title');
        var pageParam = {
                title: title
            };
        pageParam = JSON.stringify(pageParam);
        var str = 'indexToNativeSearch('+pageParam+')';
        api.execScript({
            name: 'root',
            script: str
        });
        
    };
// toNative end 
// toMission
    var toMission = function(index){
        var str = 'indexToMission('+index+')';
        api.execScript({
            name: 'root',
            script: str
        });
    };

// toMission end

function fnReadyOpenWin() {
    var openWins = $api.domAll('.open-win');
    for (var i = 0; i < openWins.length; i++) {
        // $api.attr(openWins[i], 'tapmode', 'highlight');
        $api.addEvt(openWins[i], 'click', function() {
            var winName = $api.attr(this, 'win');
            var callback = $api.attr(this, 'callback');
            var callbackParam = $api.attr(this, 'callbackParam');
            var pageParam = callback ? window[callback](callbackParam) : {};

            if (!pageParam) {
                return;
            }

            api.openWin({
                name: winName,
                url: 'widget://html/' + winName + '.html',
                pageParam: pageParam
            });
        });

        $api.removeCls(openWins[i], 'open-win');
    }

    api.parseTapmode();
};