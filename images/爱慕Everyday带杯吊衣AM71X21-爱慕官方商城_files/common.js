//ie6 png背景透明
//function correctPNG() {
//	for (var i = 0; i < document.images.length; i++) {
//		var img = document.images[i];
//		var imgName = img.src.toUpperCase();
//		if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
//			var imgID = (img.id) ? "id='" + img.id + "' ": ""
//			var imgClass = (img.className) ? "class='" + img.className + "' ": ""
//			var imgTitle = (img.title) ? "title='" + img.title + "' ": "title='" + img.alt + "' "
//			var imgStyle = "display:inline-block;" + img.style.cssText
//			if (img.align == "left") imgStyle = "float:left;" + imgStyle
//			if (img.align == "right") imgStyle = "float:right;" + imgStyle
//			if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
//			var strNewHTML = "<span " + imgID + imgClass + imgTitle + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
//			img.outerHTML = strNewHTML;
//			i = i - 1;
//		}
//	}
//}
function showAuto() {
	n = n >= (count - 1) ? 0: ++n;
	$("#banner li").eq(n).trigger('click')
}
function setfoc(name, id, n) {
	for (i = 0; i < n; i++) {
		document.getElementById(name + i).className = "hidden"
	}
	document.getElementById(name + id).className = "show"
}
//document.domain = "aimer.com.cn";
function loginCallback(response) {
	if (response.status == "ok") {
		$("#win_login").hide();
		if (location.search.indexOf("redirect=") >= 0) {
			var args = location.search.substring(1).split("&");
			for (var i = 0; i < args.length; i++) {
				if (args[i].indexOf("redirect=") == 0) {
					location = args[i].substring("redirect=".length);
					return
				}
			}
		}
		document.getElementById("cdframe").src = "http://passport.aimer.com.cn/passport/status"
	} else {
		alert(response.message)
	}
}
function registerCallback(response)
{
    if (response.status == "ok")
    {
        $("#win_login").hide();
        alert("恭喜，注册成功");
        if (location.pathname == '/passport/register') location = "http://www.aimer.com.cn/index.shtml";
        else document.getElementById("cdframe").src = "http://passport.aimer.com.cn/passport/status"
    }
  else
  {
       alert(response.message)
   }
}
//var CURRENT_USER;
//function statusCallback(response) {
//	if (response.status == "ok") {
//	myDate = new Date();
//    var hours = myDate.getHours();
//    var cont = '';
//    if( hours >= 23 && hours < 5 ){ cont = ',夜深了,注意休息';}
//    else if( hours >= 5 && hours < 8 ){ cont = ',早上好'}
//    else if( hours >= 8 && hours < 11 ){ cont = ',上午好'}
//    else if( hours >= 11 && hours < 14 ){ cont = ',中午好'}
//    else if( hours >= 14 && hours < 19 ){ cont = ',下午好'}
//    else if( hours >= 19 && hours < 23 ){ cont = ',晚上好'}
//    CURRENT_USER = response.user;
//    if (CURRENT_USER.nickname.length > 13)
//       CURRENT_USER.nickname = CURRENT_USER.nickname.substr(0,10)+'...';
//       
//    $("#topNav").html("<a class=\"track\" >"+CURRENT_USER.nickname+cont+"&nbsp</a><a href=\"http://passport.aimer.com.cn/passport/logout\">退出</a>&nbsp");
//    $("#topNavKoub").html("<div class=\"seodenglu\" ><a href=\"http://passport.aimer.com.cn/passport/logout\">退出</a>"+"</div>"+"<a href=\"http://passport.aimer.com.cn/account\" target=\"_blank\">"+"<div class=\"seodenglu1\">"+CURRENT_USER.nickname.substr(0,5)+"..</div></a>");	//口碑中心的登陆后显示
//    } else {}
//}
function registerFormCheck(form) {
	var regexEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
	var regexMobile = /^1(3|5|8)\d{9}$/;
	if (!regexMobile.test(form.username.value) && !regexEmail.test(form.username.value)) {
		alert("必须使用邮件地址或者手机号作为用户名进行注册");
		return false
	}
	if (form.password.value.length < 6 || form.password.value.length > 25) {
		alert("密码格式不正确， 只能接受 6-25位字符");
		return false
	}
	if (form.re_password.value != form.password.value) {
		alert("两次密码不匹配，请重新输入");
		return false
	}
	if (!form.protocol.checked) {
		alert("您必须接受《爱慕服务协议》才能继续进行注册");
		return false
	}
	return true
}
function close_loginNews(obj) {
	$(".loginNews").css("top", "100px");
	$(obj).parent().hide()
}
function tload(n) {
	var str = n;
	var str_arr = str.split("_");
	var parent_id = str_arr[0];
	var child_id = str_arr[1];
	dis(parent_id);
	var html = $("#content" + str).html();
	html = "<b style='color:red'>" + html + "</b>";
	$("#content" + str).html(html)
}

//分类和品牌页面轮播图
function setFocus(ID, t) {
	//主函数...
	if (document.getElementById('myfocus') == null)
	 {
		return;
	}
	function $(id) {
		return document.getElementById(id);
	}
	function $$(tag, obj) {
		return (typeof obj == 'object' ? obj: $(obj)).getElementsByTagName(tag);
	}

	var n = '';
	//标记
	function showPics(num) {
		if (n === num) return true;
		if (n === '') n = 0;
		else n = num;
		var pics = $$('ul', ID)[0];
		var tit = $$('div', pics)[num];
		if (!pics.style.left) {
			pics.style.left = 0 + 'px';
		}
		if (!tit.style.bottom || parseInt(tit.style.bottom) > -34) {
			tit.style.bottom = -34 + 'px';
		}
		var endX = -num * $$('div', ID)[0].clientWidth;
		var goimg = function() {
			X = parseInt(pics.style.left);
			if (pics.movement) {
				clearTimeout(pics.movement);
			}
			if (parseInt(pics.style.left) == endX) return true;
			if ((endX - X) > 0) X += Math.ceil((endX - X) / 10);
			else X += Math.floor((endX - X) / 10);
			pics.style.left = X + 'px';
			pics.movement = setTimeout(goimg, 5);
		}
		var gotit = function() {
			var y = parseInt(tit.style.bottom);
			if (tit.movement) {
				clearTimeout(tit.movement);
			}
			if (y == 0) return true;
			y += Math.ceil((0 - y) / 10);
			if (parseInt(pics.style.left) == endX) tit.style.bottom = y + 'px';
			if (y < 0) tit.movement = setTimeout(gotit, 16);
		}
		goimg();
		gotit();
	}
	function classNormal() {
		//数字标签样式清除
		var focusBtnList = $$('li', $$('ul', ID)[1]);
		for (var i = 0; i < focusBtnList.length; i++) {
			focusBtnList[i].className = '';
		}
	}
	function focusChange() {
		//交互切换
		var focusBtnList = $$('li', $$('ul', ID)[1]);
		for (var i = 0; i < focusBtnList.length; i++) {
			focusBtnList[i].I = i;
			focusBtnList[i].onmouseover = function() {
				showPics(this.I);
				classNormal();
				focusBtnList[this.I].className = 'current';
			}
		}
	}
	var autoFocusChange = function() {
		//自动运行
		if (atuokey) return;
		var focusBtnList = $$('li', $$('ul', ID)[1]);
		for (var i = 0; i < focusBtnList.length; i++) {
			if (focusBtnList[i].className == 'current') {
				var currentNum = i;
			}
		}
		if (currentNum < focusBtnList.length - 1) {
			showPics(currentNum + 1);
			classNormal();
			focusBtnList[currentNum + 1].className = 'current';
		} else if (currentNum == focusBtnList.length - 1) {
			showPics(0);
			classNormal();
			focusBtnList[0].className = 'current';
		}
	}
	var atuokey = '';
	function init() {
		//初始化<div><span></span><a href="#">文字说明</a></div>
		var ul = $$('ul', ID)[0];
		var li = $$('li', ul);
		var NUM = li.length;
		var wid = $('myloading') ? $$('div', ID)[1].clientWidth: $$('div', ID)[0].clientWidth;
		ul.style.width = wid * NUM + 'px';
		for (var i = 0; i < NUM; i++) {
			var a = li[i].getElementsByTagName('a')[0];
			var img = li[i].getElementsByTagName('img')[0];
			li[i].innerHTML = li[i].innerHTML + '<div><span></span><a href="' + a + '">' + img.alt + '</a></div>';
		}
		var s = '<div class="mybtn"><ul>';
		for (var i = 0; i < NUM; i++) {
			s += '<li>' + (i + 1) + '</li>'
		}
		s += '</ul></div>';
		$(ID).innerHTML += s;
		$(ID).removeChild($('myloading'));
		showPics(0);
		classNormal();
		$$('li', $$('ul', ID)[1])[0].className = 'current';
		$(ID).onmouseover = function() {
			atuokey = true;
			clearInterval(auto);
		}
		$(ID).onmouseout = function() {
			atuokey = false;
			auto = setInterval(autoFocusChange, T);
		}
	}
	var T = t * 1000;
	//每帧图片停留的时间，1000=1秒
	var auto = '';
	init();
	focusChange();
	auto = setInterval(autoFocusChange, T);
};

//history goods
var cookie_handle = "am_view_goods_history";
//添加cookie
function writeGoodsIdToCookie(objValue)
 {
	//设置cookie的名字和时间
	var max_count = 5;
	var cookie_time_out = 3600 * 24 * 365;
	//一年
	var date = new Date();
	var old_str = "";
	var goods_ids_str = "";
	date.setTime(date.getTime() + cookie_time_out);
	//时间追加

	//获取原有cookie
	old_str = getViewHistoryCookies(cookie_handle);
	//拼接当前cookie
	if (!old_str)
	 goods_ids_str = escape(objValue);
	else
	 goods_ids_str = old_str + "," + escape(objValue);

	var goods_ids_arr = goods_ids_str.split(",");
	//去重复
	goods_ids_arr = unique(goods_ids_arr);
	var len = goods_ids_arr.length;
	//如果数量超过了最大限额，将前面的 N  - 5 个移除掉
	if (len > max_count)
	 goods_ids_arr.splice(0, len - max_count);

	goods_ids_str = goods_ids_arr.join(",");

	var str = cookie_handle + "=" + goods_ids_str;
	//
	str += "; expires=" + date.toGMTString();
	//带上时间
	str += "; path=/";
	str += "; domain=aimer.com.cn"
	document.cookie = str;

}

//获取cookie
function getViewHistoryCookies()
 {
	var arrStr = document.cookie.split("; ");
	if (arrStr.length > 0)
	 {
		for (var i = 0; i < arrStr.length; i++)
		 {
			var temp = arrStr[i].split("=");
			if (temp[0] == "am_view_goods_history")
			 {
				return unescape(temp[1]);
			}
		}
		return null;
	}
	 else
	 return null;
}

/**
 * 功能：跳转分享连接
 * condition用来判断分享位置,剩余参数为要分享的信息
 */
function share(condition,title,goods_name,goods_brand,shop_price,sales_count,goods_id,is_suit )
{       
        var goods_url = 'http://www.aimer.com.cn/goods/';
        var par = '';
        
        if( title )
          par += title+"|";
        
        if( goods_name )
          par += goods_name+"|";
        
        if( goods_brand )
          par += goods_brand+"|";
        
        if( shop_price )
          par += "现价:"+shop_price+"|";
        
        if( sales_count )
          par += "已售:"+sales_count+"件|";
        
        if( is_suit == true )
          goods_url = "http://www.aimer.com.cn/suit/";

        if(condition == 1)
            window.open("http://v.t.qq.com/share/share.php?title="+par+"&url="+goods_url+goods_id+"&source=aimer&pic=",'_blank');
        else if(condition == 2)
            window.open("http://v.t.sina.com.cn/share/share.php?title="+par+"&url="+goods_url+goods_id+"&source=aimer",'_blank');
        else if(condition == 3)
           window.open("http://www.kaixin001.com/repaste/share.php?rtitle="+par+"&rurl="+goods_url+goods_id+"&rcontent=",'_blank');
        else if(condition == 4)
            window.open("http://share.renren.com/share/buttonshare.do?link="+goods_url+goods_id+"&title="+par,'_blank');
        
}

/**
 * 功能：跳转分享连接
 * condition用来判断分享位置,剩余参数为要分享的相片的信息
 */
function sharephoto( condition, photo_url )
{
  var  title = "我参加了爱慕儿童爱分享活动，请为我和宝宝的亲密抱抱点赞吧！参加活动还能赢得大奖哦！活动网址:http://www.aimer.com.cn/aimerkids2015 ";
  var srcUrl = "http://www.aimer.com.cn/aimerkids2015";
  title = encodeURI(title)
  if(condition == 1)
      window.open("http://v.t.qq.com/share/share.php?title="+title+"&url="+photo_url+"&pic="+photo_url,'_blank');
  else if(condition == 2)
      window.open("http://v.t.sina.com.cn/share/share.php?title="+title+"&url="+photo_url+"&pic="+photo_url,'_blank');
  else if(condition == 3)
  {
    window.open( "http://widget.renren.com/dialog/share?resourceUrl=" + photo_url + "&srcUrl=" + srcUrl + "&pic=" + photo_url + "&title=" + title + "&description=", "_blank" );
  }
//      window.open("http://share.renren.com/share/buttonshare.do?link="+photo_url+"&title="+title+"&image_src="+photo_url,'_blank');
  else if(condition == 4)
      window.open("http://www.kaixin001.com/repaste/share.php?rtitle="+title+"&rurl="+photo_url+"&pic="+photo_url,'_blank');
}

function sharekoubei( condition, photo_url ,title)
{
  var  title = "爱慕口碑中心分享活动；活动参与网址：http://www.aimer.com.cn/ordershow/getlist";
  title = encodeURI(title)
  if(condition == 1)
      window.open("http://v.t.qq.com/share/share.php?title="+title+"&url="+photo_url+"&pic="+photo_url,'_blank');
  else if(condition == 2)
      window.open("http://v.t.sina.com.cn/share/share.php?title="+title+"&url="+photo_url+"&pic="+photo_url,'_blank');
  else if(condition == 3)
      window.open("http://share.renren.com/share/buttonshare.do?link="+photo_url+"&title="+title+"&image_src="+photo_url,'_blank');
  else if(condition == 4)
      window.open("http://www.kaixin001.com/repaste/share.php?rtitle="+title+"&rurl="+photo_url+"&pic="+photo_url,'_blank');
}

function shareLottery(){
  var title = "爱慕官方商城五周年店庆，幸运UP大转盘，100%中奖，赶快来参加把；活动参与网址：http://www.aimer.com.cn/z/es/lotteryturn.shtml";
  title = encodeURI(title)
  window.open("http://v.t.sina.com.cn/share/share.php?title="+title,'_blank');
}

function unique(data) {
	var a = {};
	for (var i = 0; i < data.length; i++) {
		var v = data[i];
		if (typeof(a[v]) == 'undefined') {
			a[v] = 1;
		}
	}
	data.length = 0;
	for (var i in a) {
		data[data.length] = i;
	}
	return data;
}
window.onload=function(){
setFocus('myfocus',4);
}
//if($.browser.msie)
//	window.attachEvent("onload",correctPNG);