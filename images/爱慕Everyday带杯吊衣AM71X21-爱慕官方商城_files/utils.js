/**
 * ESHOP 公用脚本函数库
 
 * $Date: 2006-12-06 15:12:26 +0800 (星期三, 06 十二月 2006) $
 * 
*/
var Browser = new Object();

Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1);
Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari")!=-1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera")!=-1);

var Utils = new Object();

Utils.htmlEncode = function(text) 
{
	return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Utils.trim = function( text ) {
	return text.replace(/^\s*|\s*$/g, "");
}

Utils.isNumber = function(val) {
    var reg = /[\d|\.|,]+/;
    return reg.test(val);
}

Utils.isInt = function(val) {
    var reg = /\d+/;
    return reg.test(val);
}

Utils.isEmail = function( email )
{
    var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;

    return reg1.test( email );
}

Utils.fixEvent = function(e) 
{
    var evt = (typeof e == "undefined") ? window.event : e;
    return evt;
}

Utils.srcElement = function(e)
{
    if (typeof e == "undefined") e = window.event;
    var src = document.all ? e.srcElement : e.target;

    return src;
}

Utils.isTime = function(val)
{
	var reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;

	return reg.test(val);
}

function rowindex(tr)
{
    if (Browser.isIE)
    {
        return tr.rowIndex;
    }
    else
    {
      table = tr.parentNode.parentNode;

      for (i = 0; i < table.rows.length; i++)
      {
          if (table.rows[i] == tr)
          {
              return i;
              break;
          }
      }
    }
}
