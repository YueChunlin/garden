/**
 * Created by Administrator on 2017/2/15.
 */
window.onresize = function(){
    location.reload();
};

//----------headnav
$(".head-nav>li a").mouseenter(function(){
    $(this).next("ul").show();
})
    .mouseleave(function(){
    $(this).next("ul").hide();
});

$(".head-nav ul").mouseenter(function(){
        $(this).show();
    })
    .mouseleave(function(){
        $(this).hide();
    });

//--------banner------------
var index= 1,oUl=$(".banner ul"),oWidth=oUl.width()/ 6,
    oNext=$(".ban-next"),oPrev=$(".ban-prev"),oBanSp=$(".ban-sp span");
function checkIndex(x){
    if(x>4){
        x=1;
        oUl.css({"left":-oWidth*(x-1)+"px"});
    }
    if(x<1){
        x=4;
        oUl.css({"left":-oWidth*(x+1)+"px"});
    }
    return index=x;
}
function oBannerMove(obj,iTg,fnEnd){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iAllTarget = true;
        var iPosNow=obj.position().left;
            var iSpeed = -(iPosNow - iTg)/8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(Math.abs(iTg-iPosNow)>Math.abs(iSpeed)){
                iAllTarget = false;
                obj.css("left",iPosNow + iSpeed + "px");
            }else{
                obj.css("left",iTg + "px");
            }
        //console.log(iSpeed,"speed");
        if(iAllTarget){
            clearInterval(obj.timer);
            obj.css("left",iTg + "px");
            if(fnEnd){
                fnEnd();
            }
        }
    },30);
}
function oBanSpchange(x){
    oBanSp.eq(x-1).addClass("sp-select").siblings().removeClass("sp-select");
}
oNext.click(function(){
   index++;
    checkIndex(index);
    console.log(index,"index++");
    oBannerMove(oUl,-oWidth*index);
    oBanSpchange(index);
});
oPrev.click(function(){
    index--;
    checkIndex(index);
    console.log(index,"index--");
    oBannerMove(oUl,-oWidth*index);
    oBanSpchange(index);
});
oBanSp.click(function(){
    var spnumber=$(this).index();
    index=spnumber+1;
    oBannerMove(oUl,-oWidth*index);
    oBanSpchange(index);
    console.log(spnumber);
});
function oBanautoMove(){
    timer1=setInterval(function(){
        index++;
        checkIndex(index);
        oBannerMove(oUl,-oWidth*index);
        oBanSpchange(index);
    },2000)
}
oBanautoMove();
oNext.hide();
oPrev.hide();
$(".banner").mouseenter(function(){
    clearInterval(timer1);
    oNext.show();
    oPrev.show();
}).mouseleave(function(){
    oBanautoMove();
    oNext.hide();
    oPrev.hide();
});

//----------download------------
$(".download ul li .down").hide();
$(".download ul li").mouseenter(function(){
    $(this).find(".down").show();
    $(this).find(".down-txt").hide();
}).mouseleave(function(){
    $(this).find(".down").hide();
    $(this).find(".down-txt").show();
});
//-------------news----------
$.get('data.json',{},function(data){
    console.log(data);
    for(var i = 0;i<data.length;i++){
        $('.new-picinfo').eq(i)
            .find('img')
            .attr('src','img/'+data[i].body.img);
        $('.new-picinfo').eq(i)
            .find('a')
            .html(data[i].body.title);

        var allA = $('.new-p-t').eq(i).find("ul li a");//找当前栏目所有a
        for(var j = 0;j<allA.length;j++){
            allA.eq(j)
                .html(data[i].links[j].text)
                .attr('href',data[i].links[j].href)
        }
    }
},'json');


//--------------language---------

var oLanguage=$(".mult-device li").eq(0);
    oLanguage.mouseenter(function(){
        if(timer1){clearTimeout(timer1)}
        $(".language div").show();
    }).mouseleave(function(){
        timer1=setTimeout(function(){
            $(".language div").hide();
        },500)
    });
$(".language div").mouseenter(function(){
    if(timer1){clearTimeout(timer1)}
    $(this).show();
}).mouseleave(function(){
    timer1=setTimeout(function(){
        $(".language div").hide();
    },500)
});
//---------links----------
$(".glinks span").mouseenter(function(){
    $(".glinks").toggleClass("height");
});
$(".flinks span").mouseenter(function(){
    $(".flinks").toggleClass("height1");
})