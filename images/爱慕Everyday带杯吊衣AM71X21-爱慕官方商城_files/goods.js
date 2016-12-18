		//上下轮播切换
var detail_number = 0;
$(document).ready(function(){
 $(function(){
				var page = 1;
				var i = 5; //每版放4个图片


				//向后 按钮
				$("div.pageshowtop").click(function(){    //绑定click事件
					var $parent = $(this).parents("div.pageshowsmall");//根据当前点击元素获取到父元素
					var $pagetr = $parent.find("div.pageshowdh"); //寻找到“视频内容展示区域”
					var $pageshowdh_li = $parent.find(".pageshowdh li"); //寻找到“视频内容展示区域”外围的DIV元素
					var $v_content = $parent.find("div.pageshowcontent"); //寻找到“视频内容展示区域”外围的DIV元素
					var v_height = $pageshowdh_li.height() ;
					var len = $pagetr.find("li").length;
/*					var page_count = Math.ceil(len / i);   //只要不是整数，就往大的方向取最小的整数*/
					if( !$pagetr.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
						if( page > 1 ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
							$pagetr.animate({ top : '+='+v_height}, "slow"); //通过改变left值，跳转到第一个版面
							page --;
						}
						if( page == 1 )
							$(".pageshowtop").addClass("pageshowadr");
						else
							$(".pageshowtop").removeClass("pageshowadr");

						if( page < len )
							$(".pageshowbottom").removeClass("pageshowpdo");
					 }
			   });
				//往前 按钮
				$("div.pageshowbottom").click(function(){
					 var $parent = $(this).parents("div.pageshowsmall");//根据当前点击元素获取到父元素
					 var $pagetr = $parent.find("div.pageshowdh"); //寻找到“视频内容展示区域”
					 var $pageshowdh_li = $parent.find(".pageshowdh li"); //寻找到“视频内容展示区域”外围的DIV元素
					 var v_height = $pageshowdh_li.height();
					 var len = $pagetr.find("li").length;

/*					 var page_count = Math.ceil(len / i); //只要不是整数，就往大的方向取最小的整数*/

					 if( !$pagetr.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
						 if( page < len-4 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
							$pagetr.animate({ top : '-='+v_height}, "slow");
							page ++;

						}
						if( page == len-4 )
							$(".pageshowbottom").addClass("pageshowpdo");

							$(".pageshowtop").removeClass("pageshowadr");
					}
/*					$parent.find("a").eq((page-1)).addClass("current").siblings().removeClass("current");*/
				});
			});
 		});
      
      //左右切换
$(document).ready(function(){
  $(function(){
				var page = 1;
				var i = 5; //每版放4个图片
				//向后 按钮
				$("a.pageleft").click(function(){    //绑定click事件
					var $parent = $(this).parents("div.pagetr");//根据当前点击元素获取到父元素
					var $pagetr = $parent.find("div.productlunbo"); //寻找到“视频内容展示区域”
					var $v_content = $parent.find("div.v_content"); //寻找到“视频内容展示区域”外围的DIV元素
					var v_width = $v_content.width() ;
					var len = $pagetr.find("li").length;
					var page_count = Math.ceil(len / i);   //只要不是整数，就往大的方向取最小的整数
					if( !$pagetr.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
						if( page > 1 ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
							$pagetr.animate({ left : '+='+v_width}, "slow"); //通过改变left值，跳转到第一个版面
							page --;
						}
						if( page == 1 )
							$(".pageleft").addClass("pageico_1");
						else
							$(".pageleft").removeClass("pageico_1");

						if( page < page_count )
							$(".pageright").removeClass("pageico_3");
					 }
			   });
				//往前 按钮
				$("a.pageright").click(function(){
					 var $parent = $(this).parents("div.pagetr");//根据当前点击元素获取到父元素
					 var $pagetr = $parent.find("div.productlunbo"); //寻找到“视频内容展示区域”
					 var $v_content = $parent.find("div.v_content"); //寻找到“视频内容展示区域”外围的DIV元素
					 var v_width = $v_content.width();
					 var len = $pagetr.find("li").length;
					 var page_count = Math.ceil(len / i); //只要不是整数，就往大的方向取最小的整数

					 if( !$pagetr.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
						 if( page < page_count ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
							$pagetr.animate({ left : '-='+v_width }, "slow");
							page ++;

						}
						if( page == page_count )
							$(".pageright").addClass("pageico_3");

							$(".pageleft").removeClass("pageico_1");
					}
/*					$parent.find("a").eq((page-1)).addClass("current").siblings().removeClass("current");*/
				});
			});
});
      
 //设置评论字数
 $(document).ready(function(){
		var txtobj={
			divName:"myapptextarea", //外层容器的class
			textareaName:"input-txea", //textarea的class
			numName:"num", //数字的class
			num:140 //数字的最大数目
		}
		
		var textareaFn=function(){
			//定义变量
			var $onthis;//指向当前
			var $divname=txtobj.divName; //外层容器的class
			var $textareaName=txtobj.textareaName; //textarea的class
			var $numName=txtobj.numName; //数字的class
			var $num=txtobj.num; //数字的最大数目

			function isChinese(str){  //判断是不是中文
				var reCh=/[u00-uff]/;
				return !reCh.test(str);
			}
			function numChange(){
				var strlen=0; //初始定义长度为0
				var txtval = $.trim($onthis.val());
				for(var i=0;i<txtval.length;i++){
					if(isChinese(txtval.charAt(i))==true){
						strlen=strlen+2;//中文为2个字符
					}else{
						strlen=strlen+1;//英文一个字符
					}
				}
				strlen=Math.ceil(strlen/2);//中英文相加除2取整数
				if($num-strlen<0){
					$par.html("超出 <b style='color:red;font-weight:lighter' class="+$numName+">"+Math.abs($num-strlen)+"</b> 字"); //超出的样式
				}
				else{
					$par.html("还可以输入 <b class="+$numName+">"+($num-strlen)+"</b> 字"); //正常时候
				}
				$b.html($num-strlen);			
			}
			$("."+$textareaName).live("focus",function(){
				$b=$(this).parents("."+$divname).find("."+$numName); //获取当前的数字
				$par=$b.parent(); 
				$onthis=$(this); //获取当前的textarea
				var setNum=setInterval(numChange,500);				
			});
		}					
		textareaFn();
});

 //评分
$(document).ready(function(){
var Class = {
create: function() {
return function() { this.initialize.apply(this, arguments); }
}
}
var Extend = function(destination, source) {
for (var property in source) {
destination[property] = source[property];
}
}
function stopDefault( e ) {
if ( e && e.preventDefault ){
e.preventDefault();
}else{
window.event.returnValue = false;
}
return false;
} 
/**
* 星星打分组件
*
* @author    Yunsd
* @date    2010-7-5
*/
var Stars = Class.create();
Stars.prototype = {
initialize: function(star,options) {
this.SetOptions(options); //默认属性
var flag = 999; //定义全局指针
var isIE = (document.all) ? true : false; //IE?
if ( !document.getElementById(star) )
  return;
var starlist = document.getElementById(star).getElementsByTagName('a'); //星星列表
var input = document.getElementById(this.options.Input) || document.getElementById(star+"-input"); // 输出结果
var tips = document.getElementById(this.options.Tips) || document.getElementById(star+"-tips"); // 打印提示
var nowClass = " " + this.options.nowClass; // 定义选中星星样式名
var tipsTxt = this.options.tipsTxt; // 定义提示文案
var len = starlist.length; //星星数量
        
for(i=0;i<len;i++){ // 绑定事件 点击 鼠标滑过
starlist[i].value = i;
starlist[i].onclick = function(e){
stopDefault(e);
this.className = this.className + nowClass;
flag = this.value;
input.value = this.getAttribute("star:value");
tips.innerHTML = tipsTxt[this.value]
}
starlist[i].onmouseover = function(){
if (flag< 999){
var reg = RegExp(nowClass,"g");
starlist[flag].className = starlist[flag].className.replace(reg,"")
}
}
starlist[i].onmouseout = function(){
if (flag< 999){
starlist[flag].className = starlist[flag].className + nowClass;
}
}
};
if (isIE){ //FIX IE下样式错误
var li = document.getElementById(star).getElementsByTagName('li');
for (var i = 0, len = li.length; i < len; i++) {
var c = li[i];
if (c) {
c.className = c.getElementsByTagName('a')[0].className;
}
}
}
},
//设置默认属性
SetOptions: function(options) {
this.options = {//默认值
              Input:            "",//设置触保存分数的INPUT
              Tips:            "",//设置提示文案容器
              nowClass:    "current-rating",//选中的样式名
              tipsTxt:        ["   1分"," 2分"," 3分"," 4分"," 5分"]//提示文案
    };
Extend(this.options, options || {});
}
}
if( detail_number >= 1 )
{
  for( var i = 1; i <= detail_number; i++ )
  {
    var Stars1_i = new Stars("stars1_"+i)
    var Stars2_i = new Stars("stars2_"+i);
    var Stars3_i = new Stars("stars3_"+i);
  }
}
var Stars1 = new Stars("stars1")
var Stars2 = new Stars("stars2");
var Stars3 = new Stars("stars3");
var Stars4 = new Stars("stars4",{nowClass:"current-rating",tipsTxt:["100分-严重不合格","200分-不合格","300分-合格","400分-优秀","500分-完美"]});
var Stars5 = new Stars("stars5");

});

function buildPaginationHtml( type, pageNo, pageSize, totalcount )
{
  if( totalcount >0 )
  {  
    var totalPage = Math.ceil(totalcount / pageSize);
    var html;
    if ( pageNo == 1 )
    {
      html = '<a class="pSIMyReply" href="javascript:void(0)">首页</a>&nbsp;<a class="pSIMyReply" href="javascript:void(0)">上一页</a>&nbsp';
    }
    else
    {
      html = '<a class="pSIMyReply" href="javascript:getQuestions(\''+type+'\',1)">首页</a>&nbsp;<a class="pSIMyReply" href="javascript:getQuestions(\''+type+'\','+(pageNo-1)+')">上一页</a>&nbsp';
    }
    var page_count = 5
    var startNo = 1;
    var endNo = totalPage;
    if( totalPage < page_count*2){
      endNo = totalPage;
    }
    else if(pageNo < page_count +1 ){
      endNo = page_count*2;
    }
    else if( (totalPage-pageNo) <= page_count){
      startNo = totalPage - page_count*2;
      endNo = totalPage;
    }
    else if( (pageNo+5)< totalPage && (pageNo -5) >0 ){
      startNo = pageNo - page_count;
      endNo = pageNo + page_count;
    }

    for ( var i = startNo; i<= endNo ; i ++ )
    {
      if ( i == pageNo )
      {
        html += '<a class="pSIMyClick" href="javascript:void(0)">&nbsp;'+i+'&nbsp;</a>&nbsp;';
      }
      else
      {
        html += '<a href="javascript:getQuestions(\''+type+'\','+i+')">&nbsp;'+i+'&nbsp;</a>&nbsp;';
      }
    }

    if ( pageNo == totalPage )
    {
      html += '<a class="pSIMyNext" href="javascript:void(0)">下一页</a>&nbsp;<a class="pSIMyNext" href="javascript:void(0)">尾页</a>&nbsp';
    }
    else
    {
      html += '<a class="pSIMyNext" href="javascript:getQuestions(\''+type+'\','+(pageNo+1)+')">下一页</a>&nbsp;<a class="pSIMyNext" href="javascript:getQuestions(\''+type+'\','+totalPage+')">尾页</a>';
    }
  }
  return html;
}

function decreaseGoodCount( type )
{
  if( type == 'goods' )
  {
    if( $("#goodCount").val() > 1 )
    {
      $("#goodCount").attr("value", ( $("#goodCount").val()-1) );
    }
  }
  else if( type == 'suit' )
  {
    var count = $( "#suitGoodsNum" ).val();
    if( 1 < count )
    {
      count--;
      $( "#suitGoodsNum" ).val( count );
    }
  }
}
      
//增加购买商品数量
function addGoodCount( type )
{
  if( type == 'goods' )
  {
    var count = $( "#goodCount" ).val();
    if( $("#goodCount").val() < 10 )
    {
      $("#goodCount").attr("value",  ++count );
    }
  }
  else if( type == 'suit' )
  {
    //先加1
    var count = $( "#suitGoodsNum" ).val();
    if( count < 10 )
    {
      count++;
      $( "#suitGoodsNum" ).val( count );
    }
  }
}

function checkedThis(obj,cname)
{
  var boxArray = document.getElementsByName(cname); //这里不需要加'' 或者""
  for(var i=0;i<=boxArray.length-1;i++)
  {
    if(boxArray[i]==obj && obj.checked)
    {
      boxArray[i].checked = true;
    }
    else
    {
      boxArray[i].checked = false;
    } 
  } 
} 