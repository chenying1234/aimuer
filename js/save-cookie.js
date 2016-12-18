//保存cookie
//options= { path:"/",domain:"",secure:true}
//cookie存储的格式，key=value;expires=XXXX;path=/;domain=xxxx;secure
function setcookie(key,value,options){
	//最基本的键值对
	var str=encodeURIComponent(key)+"="+encodeURIComponent(value);
	//失效时间
	if(options.expires){
		var expires = day = options.expires;
		if(typeof expires === 'number'){//失效时间传递的是一个数字
			var expires = new Date();
			expires.setDate(date.getDate()+day);//计算失效时间
		}
		str +=";expires="+expires.toUTCString();
	}
	//路径
	if(options.path)
		str += ";path="+options.path
	//域名
	if(options.domain)
		str += ";path="+options.domain
	//安全
	if(options.secure)
		str += ";path="+secure
	//保存cookie
	document.cookie=str;
}

//根据key获取cookie
function getcookie(key){
	//获取到所有的cookie
	var cookies = document.cookie.split("; ");
	//遍历
	for (var i in cookies){
		//用=将key=value 分隔， =号前的为key 后面的为value
		var cookie = cookies[i].split("=");
		if(decodeURIComponent(cookie[0]) === key){
			return decodeURIComponent(cookie[1]);
		}
	}
	return null
}


//删除cookie
function removecookie(key){
	//让value为空，并将失效时间设置为过期时间
		setcookie(key,"",{expires:-1});
}
















