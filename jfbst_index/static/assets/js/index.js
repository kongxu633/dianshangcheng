$(document).ready(function(){
    $('#skippr').skippr({
        autoPlay: true,
    });
    $('#news-skippr').skippr({
        navType: 'bubble',
        arrows: false,
        autoPlay: true,
    });
    slidesing("#slidera_name");

    $(".scrollleft").imgscroll({
        speed: 40,    //图片滚动速度
        amount: 0,    //图片滚动过渡时间
        width: 1,     //图片滚动步数
        dir: "left"   // "left" 或 "up" 向左或向上滚动
    });

});


function chanTab(name,cursel,n,class1,class2){

    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById("con_"+name+"_"+i);
        con.style.display=i==cursel?"block":"none";
        menu.className=i==cursel?class1:class2;
    }
}

/* 品牌加盟 幻灯*/
function slidesing(slider_name){
    var sWidth = $(slider_name).width();
    var len = $(""+slider_name+" .silder_panel").length;
    var index = 0;
    var picTimer;

    var btn = "<a class='prev'>Prev</a><a class='next'>Next</a>";
    $(""+slider_name+"").append(btn);

    $(""+slider_name+" .silder_nav li").css({"opacity":"0.6","filter":"alpha(opacity=60)"}).mouseenter(function(){
        index = $(""+slider_name+" .silder_nav li").index(this);
        showPics(index,slider_name);
    }).eq(0).trigger("mouseenter");

    $(""+slider_name+" .prev,"+slider_name+" .next").css({"opacity":"0.2","filter":"alpha(opacity=20)"}).hover(function(){
        $(this).stop(true,false).animate({"opacity":"0.6","filter":"alpha(opacity=60)"},300);
    },function() {
        $(this).stop(true,false).animate({"opacity":"0.2","filter":"alpha(opacity=20)"},300);
    });

    // Prev
    $(""+slider_name+" .prev").click(function() {
        index -= 1;
        if(index == -1) {index = len - 1;}
        showPics(index,slider_name);
    });

    // Next
    $(""+slider_name+" .next").click(function() {
        index += 1;
        if(index == len) {index = 0;}
        showPics(index,slider_name);
    });

    //
    $(""+slider_name+" .silder_con").css("width",sWidth * (len));

    // mouse
    $(""+slider_name+"").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            showPics(index,slider_name);
            index++;
            if(index == len) {index = 0;}
        },3000);
    }).trigger("mouseleave");

    // showPics
    function showPics(index,sliderid) {

        var nowLeft = -index*sWidth;
        $(""+sliderid+" .silder_con").stop(true,false).animate({"left":nowLeft},300);
        $(""+sliderid+" .silder_nav li").removeClass("current").eq(index).addClass("current");
        $(""+sliderid+" .silder_nav li").stop(true,false).animate({"opacity":"0.5"},300).eq(index).stop(true,false).animate({"opacity":"1"},300);
    }

}


//图片滚动 调用方法 imgscroll({speed: 30,amount: 1,dir: "up"});
$.fn.imgscroll = function(o){
    var defaults = {
        speed: 40,
        amount: 0,
        width: 1,
        dir: "left"
    };
    o = $.extend(defaults, o);

    return this.each(function(){
        var _li = $("li", this);
        _li.parent().parent().css({overflow: "hidden", position: "relative"}); //div
        _li.parent().css({margin: "0", padding: "0", overflow: "hidden", position: "relative", "list-style": "none"}); //ul
        _li.css({position: "relative", overflow: "hidden"}); //li
        if(o.dir == "left") _li.css({float: "left"});

        //初始大小
        var _li_size = 0;
        for(var i=0; i<_li.size(); i++)
            _li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);

        //循环所需要的元素
        if(o.dir == "left") _li.parent().css({width: (_li_size*3)+"px"});
        _li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone());
        _li = $("li", this);

        //滚动
        var _li_scroll = 0;
        function goto(){
            _li_scroll += o.width;
            if(_li_scroll > _li_size)
            {
                _li_scroll = 0;
                _li.parent().css(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll });
                _li_scroll += o.width;
            }
                _li.parent().animate(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll }, o.amount);
        }

        //开始
        var move = setInterval(function(){ goto(); }, o.speed);
        _li.parent().hover(function(){
            clearInterval(move);
        },function(){
            clearInterval(move);
            move = setInterval(function(){ goto(); }, o.speed);
        });
    });
};
