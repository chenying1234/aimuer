/**
 * 必填属性
 * @param {Sting}     encloseId     包裹悬浮模块元素的id
 * @param {String}    targetId      悬浮模块的ID
 * @param {Boolean}   topFloat      是否悬浮顶端  默认
 * @param {Boolean}   bottomFloat   是否悬浮底端
 * @param {Boolean}   leftFloat     悬浮左边
 * @param {Boolean}   rightFloat    悬浮右边
 * @param {Int}       top           距离顶部距离
 * @param {Int}       left          距离左边距离
 * @param {Int}       right         距离右边距离
 * @param {Int}       bottom        距离底部距离
 * @version 1.0
 */
( function( $ )
{
  $.fn.floatElement = function( options )
  {
    var defaultCss = {
      encloseId: "",
      targetId: "",
      topFloat: true,
      bottomFloat: false,
      leftFloat: false,
      rightFloat: false,
      top: "",
      bottom: "",
      left: "",
      right: ""
    };
    //获取用户设置
    var settingCss = $.extend({}, defaultCss, options || {});
    if( "" == settingCss.encloseId || "" == settingCss.targetId )
    {
      return false;
    }
    $( window ).scroll(function()
    {
      var initoffset = $( '#' + settingCss.encloseId ).offset();
      var currenttop = $( window ).scrollTop();
      //设置浮动
      if ( currenttop > initoffset.top )
      {
        $( "#" + settingCss.targetId ).css({
          position: "fixed",
          opacity: "1",
        });
        if( settingCss.top >= 0 )
        {
          $( "#" + settingCss.targetId ).css({ top: settingCss.top });
        }
        if( settingCss.right >= 0 )
        {
          $( "#" + settingCss.targetId ).css({ right: settingCss.right });
        }
        if( settingCss.bottom >= 0 )
        {
          $( "#" + settingCss.targetId ).css({ bottom: settingCss.bottom });
        }
        if( settingCss.left >= 0 )
        {
          $( "#" + settingCss.targetId ).css({ left: settingCss.left });
        }
      }
      //恢复原先位置
      if ( $( "#" + settingCss.targetId ).css( "position" ) == "fixed" )
      {
        if ( currenttop < initoffset.top )
        {
          $( "#" + settingCss.targetId ).css({
            position: "static",
            opacity: "1"
          });
        }
      }
    });
  };
} )(jQuery);