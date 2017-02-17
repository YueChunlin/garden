/**
 * Created by Administrator on 2016/12/29.
 */
var oMove = {
     getFinalStyle : function(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj , null)[attr];
        }
     },
     slowMove : function(obj , json , fnEnd){
         var _this = this;
         clearInterval(obj.timer);
         obj.timer = setInterval(function(){
             var iAllTarget = true;
             for(var attr in json){
                 var iCurrStyle = 0;
                 if(attr == "opacity"){
                     iCurrStyle = Math.round(parseFloat(_this.getFinalStyle(obj,attr))*100);
                 }else{
                     iCurrStyle = parseInt(_this.getFinalStyle(obj, attr));
                 }
                 var iSpeed = (json[attr] - iCurrStyle)/5;
                 iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                 if(iCurrStyle != json[attr]){
                     iAllTarget = false;
                 }
                 if(attr == "opacity"){
                     obj.style[attr] = (iCurrStyle + iSpeed)/100;
                     obj.style.filter = "alpha(opacity:" + (iCurrStyle + iSpeed) + ")";
                 }else{
                     obj.style[attr] = iCurrStyle + iSpeed + "px";
                 }
             }
             if(iAllTarget){
                 clearInterval(obj.timer);
                 if(fnEnd){
                     fnEnd();
                 }
             }
        },30);
    }
};
