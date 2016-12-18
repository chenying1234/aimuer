$(function(){
	$('.loginav li').each(function(index,element){
		$(this).on('click',function(){
			$(this).addClass('nbli').siblings().removeClass('nbli')
			$('.loginlist li').eq(index).show().siblings().hide()
		})
	})
	
	//点击value消失
	$('#txt').focus(function(){
		if($('#txt').val() === '登录账号'){
			$('#txt').val('')
		}
		if($('#txt').val() !== '登录账号'){
			$('#txt').css({
					'color':'#000',
					'border-color':'#7a7a7a',
					'border-weight':"1px",
					'border-style':"solid"
				})
		}
		
	})
	//当user失去焦点的时候
	$('#txt').focusout(function(){
		var vatxt = $('#txt').val();
			
		if(vatxt === ''){
			$('#txt').val('登录账号')
			$('#txt').css({
					'color':'rgb(153,153,153)',
					'border-color':'#D93246',
					'border-weight':"1px",
					'border-style':"solid"
				})
		}
		
		if(vatxt === ''){
			console.log('in')
			$('.uerserror p').text('请输入登录名')
		}
		
	})
	
	
	//密码
	$('#txt').focus(function(){
		if($('#pasword').val() === '登录账号'){
			$('#pasword').val('')
		}
		if($('#pasword').val() !== '登录账号'){
			$('#pasword').css({
					'color':'#000',
					'border-color':'#7a7a7a',
					'border-weight':"1px",
					'border-style':"solid"
				})
		}
		
	})
	//当user失去焦点的时候
	$('#pasword1').focusout(function(){
		var vatxt = $('#pasword1').val()
		if(vatxt === ''){
			$('#pasword1').css({
					'color':'rgb(153,153,153)',
					'border-color':'#D93246',
					'border-weight':"1px",
					'border-style':"solid"
				})
		}
		
		if(vatxt === ''){
			console.log('in')
			$('.passerror1 p').text('请输入登录名')
		}
		
		
	})
	
	
	
	
//用cookie的方法验证密码	
	$('.loginButton').on('click',function(){
		$.cookie.json = true;
	var vatxt = $('#txt').val(),
		pastxt = $('#pasword1').val(),
		
		bbb = $.cookie('userl');
		for(var attr in bbb){
			
			if(bbb[attr].user !== vatxt){
				$('.passerror1 p').text('用户名或密码错误')
			};
			
			if(bbb[attr].pas !== pastxt){
				
				$('.passerror1 p').text('用户名或密码错误')
			};
			
			
			if(bbb[attr].user === vatxt && bbb[attr].pas === pastxt){
				$('.passerror1 p').text('')
				
				window.location.href='../indesx.html'
			}
		
		}
	})
	
	//回车登录
	$('.loginButton').on('click',function(){
		$.cookie.json = true;
	var vatxt = $('#txt').val(),
		pastxt = $('#pasword1').val(),
		
		bbb = $.cookie('userl');
		for(var attr in bbb){
			
			if(bbb[attr].user !== vatxt){
				$('.passerror1 p').text('用户名或密码错误')
			};
			
			if(bbb[attr].pas !== pastxt){
				
				$('.passerror1 p').text('用户名或密码错误')
			};
			
			
			if(bbb[attr].user === vatxt && bbb[attr].pas === pastxt){
				$('.passerror1 p').text('')
				
				window.location.href='../indesx.html'
			}
		
		}
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})