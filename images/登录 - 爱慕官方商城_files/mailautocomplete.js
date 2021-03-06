/**
 * @param {String}  boxClass      默认值 mailListBox                                                                                                              指类名 字符串 表最外框的样式
 * @param {String}  listClass     默认值 mailListDefault                                                                                                          类名 字符串 默认的列表样式
 * @param {String}  focusClass    默认值 mailListFocus                                                                                                            类名 字符串 当前选中的列表的样式
 * @param {String}  markCalss     默认值 mailListHlignt                                                                                                           类名 字符串 指高亮字符的样式
 * @param {Int}     zIndex        默认值 1                                                                                                                        整数 浮动层的层级
 * @param {Boolean} autoClass     默认值 true                                                                                                                     布尔型 指是否使用插件自带的样式
 * @param {Array}   mailArr       默认值 ["qq.com","gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","souhu.com","sina.com"]    提示的数组内容
 * @param {Boolean} textHint      默认值 false Boolean型，                                                                                                        是否默认文字显示隐藏
 * @param {String}  hintText      默认值 “”                                                                                                                     默认提示文字
 * @param {String}  focusColor    默认值 #333                                                                                                                     文本框获取焦点时文字颜色
 * @param {String}  blurColor     默认值 #999                                                                                                                     文本框失去焦点时文字颜色
 */
(function($)
{
	$.fn.mailAutoComplete = function(options)
  {
		var defaults = {
			boxClass: "mailListBox",
			listClass: "mailListDefault",
			focusClass: "mailListFocus",
			markCalss: "mailListHlignt",
			zIndex: 1,
			autoClass: true,
			mailArr: ["qq.com","gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com","sina.com"],
			textHint: false,
			hintText: "",
			focusColor: "#333",
			blurColor: "#999"
		};
		var settings = $.extend({}, defaults, options || {});
		
		if(settings.autoClass && $("#mailListAppendCss").size() == 0)
    {
			$('<style id="mailListAppendCss" type="text/css">.mailListBox{border:1px solid #369; background:#fff; font:12px/20px Arial;}.mailListDefault{padding:0 5px;cursor:pointer;white-space:nowrap;}.mailListFocus{padding:0 5px;cursor:pointer;white-space:nowrap;background:#369;color:white;}.mailListHlignt{color:red;}.mailListFocus .mailListHlignt{color:#fff;}</style>').appendTo($("head"));	
		}
		var cb = settings.boxClass, cl = settings.listClass, cf = settings.focusClass, cm = settings.markCalss; //�����class����
		var z = settings.zIndex, newArr = mailArr = settings.mailArr, hint = settings.textHint, text = settings.hintText, fc = settings.focusColor, bc = settings.blurColor;
		$.createHtml = function(str, arr, cur)
    {
			var mailHtml = "";
			if($.isArray(arr))
      {
				$.each(arr, function(i, n)
        {
					if(i === cur)
          {
						mailHtml += '<div class="mailHover '+cf+'" id="mailList_'+i+'"><span class="'+cm+'">'+str+'</span>@'+arr[i]+'</div>';	
					}
          else
          {
						mailHtml += '<div class="mailHover '+cl+'" id="mailList_'+i+'"><span class="'+cm+'">'+str+'</span>@'+arr[i]+'</div>';	
					}
				});
			}
			return mailHtml;
		};
		var index = -1, s;
		$(this).each(function()
    {
			var that = $(this), i = $(".justForJs").size();	
			if( i > 1 )
      {
			 	return;	
			}
			var w = that.outerWidth(), h = that.outerHeight();
			that.wrap('<span style="display:inline-block;position:relative;"></span>')
				.before('<div id="mailListBox_'+i+'" class="justForJs '+cb+'" style="min-width:'+w+'px;_width:'+w+'px;position:absolute;left:-6000px;top:'+h+'px;z-index:700;"></div>');
			var x = $("#mailListBox_" + i), liveValue; 
			that.focus(function()
      {
				$(this).css("color", fc).parent().css("z-index", z);	
				if(hint && text)
        {
					var focus_v = $.trim($(this).val());
					if(focus_v === text)
          {
						$(this).val("");
					}
				}
				$(this).keyup(function(e)
        {
          if( 8 == e.keyCode )
          {
            $( "#mailListBox_" + i ).hide();
            return false;
          }
					s = v = $.trim($(this).val());	
					if(/@/.test(v))
          {
            $( "#mailListBox_" + i ).show();
						s = v.replace(/@.*/, "");
					}
          else
          {
            return false;
          }
					if(v.length > 0)
          {
						if(e.keyCode === 38)
            {
							if(index <= 0)
              {
								index = newArr.length;	
							}
							index--;
						}
            else if(e.keyCode === 40)
            {
							if(index >= newArr.length - 1)
              {
								index = -1;
							}
							index++;
						}
            else if(e.keyCode === 13)
            {
							if(index > -1 && index < newArr.length)
              {
								$(this).val($("#mailList_"+index).text());	
							}
						}
            else
            {
							if(/@/.test(v))
              {
								index = -1;
								var site = v.replace(/.*@/, "");
								newArr = $.map(mailArr, function(n)
                {
									var reg = new RegExp(site);	
									if(reg.test(n))
                  {
										return n;	
									}
								});
							}
              else
              {
								newArr = mailArr;
							}
						}
						x.html($.createHtml(s, newArr, index)).css("left", 0);
						if(e.keyCode === 13)
            {
							if(index > -1 && index < newArr.length)
              {
								x.css("left", "-6000px");	
							}
						}
					}
          else
          {
						x.css("left", "-6000px");	
					}
				}).blur(function()
        {
					if(hint && text)
          {
						var blur_v = $.trim($(this).val());
						if(blur_v === "")
            {
							$(this).val(text);
						}
					}
					$(this).css("color", bc).unbind("keyup").parent().css("z-index",0);
					x.css("left", "-6000px");	
				});	
				$(".mailHover").live("mouseover", function()
        {
					index = Number($(this).attr("id").split("_")[1]);	
					liveValue = $("#mailList_"+index).text();
					x.children("." + cf).removeClass(cf).addClass(cl);
					$(this).addClass(cf).removeClass(cl);
				});
			});
			x.bind("mousedown", function()
      {
				that.val(liveValue);		
			});
		});
	};
	
})(jQuery);