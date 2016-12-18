//选择寻找DOM
//通过ID CLASSNAME TgaName
function dd(param,obj){
	obj = obj||document;
	if(param.indexOf('#') === 0){
		return document.getElementById(param.slice(1))
	}
	if(param.indexOf('.') === 0){
		return getClassname(param.slice(1),obj)
	}
	return obj.getElementsByTagName(param)

}
//classname的兼容性
	function getClassname(classname,obj){
		obj = obj||document;	
		if(obj.getElementsByClassName){
			return obj.getElementsByClassName(classname)
		}
		var classnames  = [],
			oALL        = obj.getElementsByTagName('*');
			
		for(var i in oALL){
			var classnamees = obj[i].className.split(' ');
			console.log(classnamees)
			for(var j in classnamees){
				if(classnamees[j] === classname){
					classnames.push(obj[i]);
					break
				}
			}
		}
		return classnames
	}
	
	
// 获取指定的 element 元素 CSS 中的 attr 属性值
function getcss(element,attr){
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}
	
	
	
	
	
