$(function()
{
  //有商城账号
  $(".loginAskY").click(function()
  {
    $(this).parent().hide();
    $(this).parent().next().show();
  });
  //没有商城账号
  $(".loginAskN").click(function()
  {
    $(this).parent().hide();
    $(this).parent().next().next().show();
  });
});

//判断是否存在此用户
function isLoginName()
{
  var $obj = $( 'input[name=login_name]' );
  if( '' != $obj.val() )
  {
    $.post( '/passport/isloginname/', {'login_name':$obj.val()}, function( ret )
    {
      if( 'ok' != ret.status )
      {
        $obj.addClass( "inputError" );
        $( ".loginName" ).html( '没有找到此用户' ).show();
        return false;
      }else{
        //如果为null说明可以登录
        if(ret.data == null)
        {
          return true;
         }
        //查找到相关用户
        if(ret.data.status == 'vip')
        {
          //提示vip绑定
          ShowMessage.Msg.confirm("绑定尊享卡，享受更多会员权益，是否即刻绑定？",function(){
            $( "#loginMainCon" ).children( "li" ).eq( 1 ).show();
            $( "#loginMainCon" ).children( "li" ).eq( 1 ).siblings().hide();
            $('.switchClick').removeClass('switchClick').siblings().addClass('switchClick');
          },340,60);
        }
        if(ret.data.status == 'bind')
        {
          $obj.addClass( "inputError" );
          $( ".loginName" ).html( '该手机号已绑定过官网账户，请您重新登录!' ).show();
        }
        if(ret.data.status == 'v6user')
        {
          ShowMessage.Msg.confirm("该尊享卡已绑定过官网账户，是否需要更改账户进行登录？",function(){
            //如果已经绑定过，则直接在输入框显示已经绑定过的用户名
            $('#logininputname').val(ret.data.loginname);
          },380,60);         
        }
        return false;
      }
      //$( ".loginName" ).html( '' ).hide();
      return true;
    },
    'json'
    )
  }
}
//登陆注册输入框聚焦时，隐藏提示
function hintText( name, event, cname )
{
  var obj = $("input[name=" + name + "]");
  var evt = event ? event : window.event;
  var con = new Array();
  //您可以60秒以后要求系统重新发送
  con["login_name"] = "请输入登录名";
  con["login_pwd"] = "请输入密码";
  con["v6mobile"] = "请输入实体店入会时登记的手机号";
  con["v6checkcode"] = "请输入验证码";
  con["register_name"] = "请输入登录名";
  con["register_pwd"] = "请输入密码";
  con["register_pwd_again"] = "请输入确认密码";
  con["exist_name"] = "请输入官网账号";
  con["exist_pwd"] = "请输入登录密码";
  con["repeatpwd"] = "再次确认密码";
  con["setpwd"] = "设置登录密码";
  con["register_valid_mobile"] = "请输入手机验证码";
  con["register_mobile_msg"] = "请输入验证码"; 
  con[ "sms_code" ] = "请输入手机验证码";
  con["register_code"] = "请输入四位验证码";
  var flag = false;
  switch ( evt.type )
  {
    case "blur":
      if ( !obj.val() )
      {
        obj.addClass("inputError");
        switch ( name )
        {
          case "register_name":
            obj.siblings("label").show();
            $("." + cname).html(con[name]).show();
            break;
          case "login_name":
            obj.parent().siblings("label").show();
            $("." + cname).html(con[name]).show();
            break;
          case "v6checkcode":
            if ( !$("#achieveV6Code").attr("class") )
              break;
            $("." + cname).html(con[name]).show();
          default:
            $("." + cname).html(con[name]).show();
            obj.siblings("label").show();
            break;
        }
        flag = false;
      }
      else
      {
        obj.removeClass("inputError");
        switch ( name )
        {
          case "register_name":
            obj.siblings("label").hide();
            break;
          case "login_name":
            obj.parent().siblings("label").hide();
            break;
          case "v6checkcode":
            if ( "v6checkcode" != name )
              $("." + cname).hide();
            break;
          case "register_code":
            break;
          default:
            $("." + cname).hide();
            obj.siblings("label").hide();
            break;
        }
        flag = true;
      }
      break;
    case "focus":
      switch ( name )
      {   
        case "register_name":
          obj.siblings("label").hide();
          obj.removeClass( "inputError" );
          break;
        case "login_name":
          obj.parent().siblings("label").hide();
          obj.removeClass( "inputError" );
          $( ".loginName" ).html( "" ).hide();
          break;
        case "login_pwd":
          obj.removeClass( "inputError" );
          $( ".loginPwd" ).html( "" ).hide();
          break;
        default:
          obj.siblings("label").hide();
          break;
      }
      flag = true;
      break;
    default:
      flag = false;
      break;
  }
  return flag;
}

function checkUsername( obj, cname )
{
  var val = $(obj).val(); 
	var mobile_Flag = regMobile( val );
  if( !mobile_Flag)
  {
    $(obj).addClass("inputError");
    $("."+cname).html("请填写正确的手机号码").show();
    return false;
  }
  else
    $("."+cname).hide();
//  }
//  else
//  {
//    if ( !email_Flag && !mobile_Flag )
//    {
//      $(obj).addClass("inputError");
//      $("." + cname).html("请填写正确的邮箱或手机号码").show();
//      return false;
//    }
//    else
//      $("." + cname).hide();
//  }
  return true;
}

//线下会员首次登陆验证手机号码
function checkMobile( obj, cname )
{
  var mobile = obj.value;
  if ( !regMobile(mobile) )
  {
    $("." + cname).html("手机号码不正确，请检查！").show();
    $(obj).addClass("inputError");
    return false;
  }
  else
  {
    $("."+cname).hide();
  }
  return true;
}

//改变图片验证码
function changeVerifyCodeImg()
{
  var random = 10 * Math.random();
  $("#v6codeimg").attr("src", "http://www.aimer.com.cn/authcode?width=49&height=34&size=16&number=4&x=2&y=23&type=" + random);
}
//检查并提交注册表单
function subRegisterForm()
{
  $(".registerButton").hide().next().show();
  if ( !$("#amserverhttp").attr("checked") )
  {
    $(".registerButton").show().next().hide();
    ShowMessage.Msg.alert("请先阅读《爱慕服务协议》");
    return false;
  }

  var code = document.getElementsByName("register_code")[0];
  if ( code )
  {
    if ( "" == code.value )
    {
      $(".registerButton").show().next().hide();
      ShowMessage.Msg.alert("请填写验证码");
      return false;
    }
    if ( code.value.length != 4 )
    {
      $(".registerButton").show().next().hide();
      ShowMessage.Msg.alert("验证码应当是 4 位");
      return false;
    }
  }
  var name = $("input[name=register_name]"); 
  var pwd = $("input[name=register_pwd]");
  var repwd = $("input[name=register_pwd_again]");
  var refriend = $("input[name=register_refriend]").val();
  if( refriend == 'register_refriend')
  { 
    var ref_name = $("input[name=register_name_refriend]").val(); 
    if( !regMobile(ref_name))
    {
      $(".regName").html("手机号码不正确,请检查！").show();
      $(obj).addClass("inputError");
      $(".registerButton").show().next().hide();
      return false;
    }
  }
  else
  {
    if ( !checkUsername(name, "regName") || !checkPwd(pwd, "regPwd") || !checkPwd(repwd, "regPwdAga") )
    {
      $(".registerButton").show().next().hide();
      return false;
    }
  }
  
  if ( pwd.val() != repwd.val() )
  {
    $(".registerButton").show().next().hide();
    $(".regPwdAga").html("两次密码不一致").show();
    $(repwd).addClass("inputError");
    return false;
  }
  
  $.post("/passport/regup", $("#newregisterform").serialize(), function( ret )
  { 
    if ( "ok" == ret.status )
    {
      //if ( "y" == ret.data.vip )
      //{
      //  ShowMessage.Msg.alert("您是爱慕集团实体店会员，请点击“实体店会员首次验证”验证后购物！");
      //}
      if( ret.data.sendflag == true ){
        //alert("您已注册成功，恭喜您获得总价值100元超值优惠券礼包，请您到“我的账户-我的优惠券”中查询")
          var tc = '<div id="tc" style="width:464px; height:272px; margin:0 auto;border:1px solid #797979; font-family:微软雅黑; font-weight:normal; position:relative; "><span id="close_tc" style="width:20px; height:20px; position:absolute;right:13px;top:13px;cursor:pointer" onclick="javascript:$.unblockUI();window.location.href =\'/\'"><img src="http://img.aimer.com.cn/theme/2012spring/images/close_r1_c1.png" width="20" height="20" border="0" /></span><p style="margin:60px auto 0; height:52px; text-align:center; font-size:26px; color:#4D4C4C;">188元优惠券已送至您账户！</p><a href="/account/mycoupons?page=mycoupons"><p style="width:320px; height:41px; margin:0 auto; text-align:center; background:#CC0027; line-height:41px; font-size:18px; color:#FFF;">查看我的优惠券</p></a><a href="/"><p style="width:320px; height:41px; margin:15px auto 0; text-align:center; background:#CC0027; line-height:41px; font-size:18px; color:#FFF;">立即购物</p></a></div>';
          $.blockUI({ message: tc, 
          css: 
          {
            top:  ($(window).height()-272)/2+'px',
            left: ($(window).width()-464)/2+'px',
            width: 'auto' ,
            cursor : 'auto',
            position: "absolute",
            border: 'none',
          },
          overlayCSS: {
            opacity:"0"
          },
          showOverlay:false,
          });
          return false;
      }
      var tc = '<div id="tc" style="width:464px; height:272px; margin:0 auto;border:1px solid #797979; font-family:微软雅黑; font-weight:normal; position:relative; "><span id="close_tc" style="width:20px; height:20px; position:absolute;right:13px;top:13px;cursor:pointer" onclick="javascript:$.unblockUI();window.location.href =\'/\'"><img src="http://img.aimer.com.cn/theme/2012spring/images/close_r1_c1.png" width="20" height="20" border="0" /></span><p style="margin:60px auto 0; height:52px; text-align:center; font-size:26px; color:#4D4C4C;">50元优惠券已送至您账户！</p><a href="/account/mycoupons?page=mycoupons"><p style="width:320px; height:41px; margin:0 auto; text-align:center; background:#CC0027; line-height:41px; font-size:18px; color:#FFF;">查看我的优惠券</p></a><a href="/"><p style="width:320px; height:41px; margin:15px auto 0; text-align:center; background:#CC0027; line-height:41px; font-size:18px; color:#FFF;">立即购物</p></a></div>';
      $.blockUI({ message: tc, 
      css: 
      {
        top:  ($(window).height()-272)/2+'px',
        left: ($(window).width()-464)/2+'px',
        width: '464',
        cursor : 'auto',
        position: "absolute",
        border: 'none',
      },
      overlayCSS: {
        opacity:"0"
      },
      showOverlay:false,
      // 是否居中
      centerX: true, 
      centerY: true,
      });  
    return false;
	  window.location.href = ret.data.url;
      
	  /*
      $.blockUI( {
          message: $( '#popWin_new' ),
          css: {
              left: ($( window ).width() - 600) / 2 + 'px',
              top:'20%',
              width: '0',
              padding: '0',
              cursor: 'auto',
              border:0,
              backgroundColor:0
            }
          } );
        document.getElementById("pre_link").href = ret.data.url;
        $( '#popWin_new #pre_link' ).click( $.unblockUI );
		*/
    }
    else
    {
      ShowMessage.Msg.alert(ret.data, function() {
      }, 500, 60);
      $(".registerButton").show().next().hide();
    }
  }, "json");
}

//检查并提交注册表单
function subPurchaseForm()
{
  $(".registerButton").hide().next().show();
  if ( !$("#checkedAgre").attr("checked") )
  {
    $(".registerButton").show().next().hide();
    ShowMessage.Msg.alert("请先阅读《爱慕服务协议》");
    return false;
  }

  var code = document.getElementsByName("purchase_code")[0];
  if ( code )
  {
    if ( "" == code.value )
    {
      $(".registerButton").show().next().hide();
      ShowMessage.Msg.alert("请填写验证码");
      return false;
    }
    if ( code.value.length != 4 )
    {
      //$(".registerButton").show().next().hide();
      //ShowMessage.Msg.alert("验证码应当是 4 位");
      //return false;
    }
  }
  var pwd = $("input[name=register_pwd]");
  var repwd = $("input[name=register_pwd_again]");

  if ( !checkPwd(pwd, "regPwd") || !checkPwd(repwd, "regPwdAga") )
  {
    $(".registerButton").show().next().hide();
    return false;
  }
  
  if ( pwd.val() != repwd.val() )
  {
    $(".registerButton").show().next().hide();
    $(".regPwdAga").html("两次密码不一致").show();
    $(repwd).addClass("inputError");
    return false;
  }
  
  $.post("/passport/purchaseactived", $("#newregisterform").serialize(), function( ret )
  { 
    if ( "ok" == ret.status )
    {

      //window.location.href = ret.data.url;
      window.location.href = '/';
   
    }
    else
    {
      ShowMessage.Msg.alert(ret.data, function() {
      }, 500, 60);
      $(".registerButton").show().next().hide();
    }
  }, "json");
}

//提交登陆表单
function subLoginForm()
{
  $(".loginButton").hide().next().show();
  var form = document.getElementById("loginform");
  var retpwd = checkPwd(form.login_pwd, "loginPwd");
  if ( !retpwd )
  {
    $(".loginButton").show().next().hide();
    return false;
  }

  $.post("/passport/ssologin", $("#loginform").serialize(), function( ret )
  {
    if ( "ok" == ret.status )
    {
      //if ( "y" == ret.data.vip )
      //{
        //ShowMessage.Msg.alert("您是爱慕集团实体店会员，请点击“实体店会员首次验证”验证后购物！",function(){window.location.href = ret.data.url;});
      //}
      //else
        window.location.href = ret.data.url;
    }
    else
    {
      //不同的异常，在不同的位置提示：%>_<%
      switch ( ret.data )
      {
        case "密码错误":
          $("input[name=login_pwd]").addClass("inputError");
          $(".loginPwd").html(ret.data).show();
          break;
        case "没有找到此用户":
        case "用户尚未激活，请激活后再登陆":
        case "用户已被禁用，不允许登陆":
          $("#logininputname").addClass("inputError");
          $(".loginName").html(ret.data).show();
          break;
        default:
          ShowMessage.Msg.alert(ret.data, function() {
          }, 500, 60);
          break;
      }
      $(".loginButton").show().next().hide();
    }
  }, "json");
}

//检查密码
function checkPwd( obj, cname )
{
  var val = $(obj).val();
  if ( val.length < 6 || val.length > 25 )
  {
    $(obj).addClass("inputError");
    $("." + cname).html("密码 6-25位 区分大小写").show();
    return false;
  }
  else
  {
    $("." + cname).hide();
  }

  return true;
}

/*注册验证*/
function registerFormCheck( form, parm )
{
  if ( !checkUsername(form.username, 'register_username_remind') )
    return false;

  if ( !checkPassword(form.password, 'register_password_remind') )
    return false;

  if ( form.password.value.length < 6 || form.password.value.length > 25 )
  {
    ShowMessage.Msg.alert("密码格式不正确");
    return false;
  }
  if ( form.password.value != form.password1.value )
  {
    $(".register_password_remind").html("&nbsp;&nbsp;<span style='color:#D40C19'>两次密码不匹配，请重新输入</span>").show();
    return false;
  }
  if ( !form.protocol.checked )
  {
    ShowMessage.Msg.alert("您必须接受《爱慕服务协议》才能继续进行注册");
    return false;
  }
  //aidesiqi
  if ( parm )
    Ps_Click(parm);
  return true;
}

//获取验证码
function achieve( button )
{
  var mobile = document.getElementsByName("v6mobile")[0];
  var ret = checkMobile(mobile, "v6mobiletext");
  if ( !ret )
    return false;

  $(button).parent().removeClass("loginObtain");
  //验证通过，发送ajax请求
  $.post("/passport/provemobile", {
    "mobile": mobile.value
  },
  function( ret )
  {
    if ( ret.status == "ok" )
    {
      var startTime = new Date();
      var EndTime = startTime.getTime() + 1 * 60 * 1000;
      clearInterval(time_id);
      $(".v6code").html("您可以 <span class='v6seconds'>60 </span>秒以后要求系统重新发送").show();
      time_id = setInterval(function() {
        getTimes(EndTime, document.getElementsByClassName("v6code")[0], button);
      }, 1000);
      $("input[name=v6checkcode]").focus();
    }
    else
    {
      ShowMessage.Msg.alert(ret.data, function() {
      }, 550,60);
      $(button).parent().addClass("loginObtain");
    }
  }, "json");
}

//注册账号--获取手机短息验证码
var wait = 60;
function setTime(me)
{
  if(wait == 0)
  {
    me.removeAttribute("disabled");
    $("#sendBtnSpan").html("获取验证码");
    wait = 60;
  }
  else
  {
    me.setAttribute("disabled", true);
    $("#sendBtnSpan").html("重新发送(" + wait +")");
    wait--;
    setTimeout(function() {
      setTime(me);
    }, 1000);
  }
}
function getMobileCode(me)
{
  var mobile = $("#regNameNew").val(); 
  if( !regMobile( mobile ) )
  {
    $(".regName").html("请填写正确的手机号码").show();
    $("#regNassmeNew").addClass("inputError");
    return false;
  }
  $(me).parent().removeClass("regMsgCode");
  $.post("/passport/getMsgCode", {"mobile":mobile}, function(ret){
    if(ret.status == 'ok')
    {
      setTime(me);
    }
    else
    {
      ShowMessage.Msg.alert(ret.data, function() { }, 550);
      $(me).parent().addClass("regMsgCode");
    }
  }, "json");
}
//检查验证码
function checkedUser()
{
  if ( $.trim($("input[name=v6mobile]").val()) === "" )
  {
    ShowMessage.Msg.alert("手机号不能为空");
    return false;
  }
  if ( $.trim($("input[name=v6checkcode]").val()) === "" )
  {
    ShowMessage.Msg.alert("验证码不能为空");
    return false;
  }
  if ( !$("#checkbox").attr("checked") )
  {
    ShowMessage.Msg.alert("请先阅读《爱慕服务协议》");
    return false;
  }
  //检验验证码
  $.post("/passport/checkcode", {
    "mobile": $("input[name=v6mobile]").val(),
    "checkcode": $("input[name=v6checkcode]").val()
  },
  function( ret )
  {
    if ( ret.status === "ok" )
    {
      $("#v6userRegister").hide();
      $("#v6userRegister").next().show();
    }
    else
    {
      ShowMessage.Msg.alert(ret.data);
    }
  }, "json");
}

//如果是官方会员，则把V6卡关联到账户上
function catenate( obj )
{
  $(obj).hide().next().show();
  var event = { type: "blur" };
  if ( !hintText( "exist_name", event, 'v6mobiletext') || !hintText( "exist_pwd", event, 'v6mobiletext') )
  {
    $(obj).show().next().hide();
    return false;
  }
  var data = {
    "login_name": $("input[name=exist_name]").val(),
    "login_pwd": $("input[name=exist_pwd]").val(),
    "mobile": $("input[name=v6mobile]").val()
  };
  //关联
  $.post("/passport/connect", data, function( ret )
  {
    if ( ret.status === "ok" )
    {
      $(obj).show().next().hide();
      ShowMessage.Msg.alert('您已验证成功，下次登录请点击“登录”输入爱慕官方商城账号和密码进行购物！', function()
      {
        location.href = ret.data.returnurl;
      }, 360, 100, "登录提示");
    }
    else
    {
      $(obj).show().next().hide();
      ShowMessage.Msg.alert(ret.data);
    }
  }, "json");
}

//提交密码
function setv6user( obj )
{
  $(obj).hide().next().show();
  var pwd = $("input[name=setpwd]");
  var repeatpwd = $("input[name=repeatpwd]");
  if ( pwd.val() != repeatpwd.val() )
  {
    $(".repeatpwdtxt").html("两次密码不一致").show();
    $(obj).show().next().hide();
    return false;
  }
  //检查密码
  if ( !checkPwd(pwd, 'setpwdtxt') || !checkPwd(repeatpwd, 'repeatpwdtxt') )
  {
    $(obj).show().next().hide();
    return false;
  }
  var data = {
    "mobile": $("input[name=v6mobile]").val(),
    "pwd": $("input[name=setpwd]").val()
  };
  $.post("/passport/setv6user", data, function( ret )
  {
    if ( ret.status === "ok" )
    {
      $(obj).show().next().hide();
      ShowMessage.Msg.alert('您已验证成功，下次登录请输入手机号和验证时设置的密码点击“登录”进行购物！', function()
      {
        location.href = ret.data.returnurl;
      }, 360, 100, "登录提示");
    }
    else
    {
      $(obj).show().next().hide();
      ShowMessage.Msg.alert(ret.data, function() {
        window.location.reload();
      }, 360, 70, "登录提示");
    }
  }, "json");
}
