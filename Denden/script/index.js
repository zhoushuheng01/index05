$(function(){
	var simulated_box = $(".simulated_box");
	$(".secs-7").find("a").click(function(){
		simulated_box.removeClass("none")
		return false;
	});
	simulated_box.find(".body").find("span:first-child").click(function(){
		simulated_box.addClass("none");
	});
	
/*	var tab = $("#tab");
	var tab_s = $("header .con");
	tab.find("div").each(function(i){
		this.index=i;
		$(this).click(function(){
			tab_s[this.index].addClass("none")
			
		})
	});*/
	(function(){
		fnTab($('#tab'),$('header .con'),'click');
		
		function fnTab(oNav,aCon,sEvent){
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function(index){
				$(this).on(sEvent,function(){
					aElem.removeClass('active aui-active');
					$(this).removeClass('none').addClass('active aui-active');
					
					aCon.hide().eq(index).show();
				});
			})
			
		};
	})();
	
})