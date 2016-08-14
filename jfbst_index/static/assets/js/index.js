$(document).ready(function(){

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


$(document).ready(function() {
    var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
    var len = $("#focus ul li").length; //获取焦点图个数
    var index = 0;
    var picTimer;

    //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
    var btn = "<div class='btnBg'></div><div class='btn'>";
    for(var i=0; i < len; i++) {
        btn += "<span></span>";
    }
    btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
    $("#focus").append(btn);
    $("#focus .btnBg").css("opacity",0.5);

    //为小按钮添加鼠标滑入事件，以显示相应的内容
    $("#focus .btn span").css("opacity",0.4).mouseover(function() {
        index = $("#focus .btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseover");

    //上一页、下一页按钮透明度处理
    $("#focus .preNext").css("opacity",0.2).hover(function() {
        $(this).stop(true,false).animate({"opacity":"0.5"},300);
    },function() {
        $(this).stop(true,false).animate({"opacity":"0.2"},300);
    });

    //上一页按钮
    $("#focus .pre").click(function() {
        index -= 1;
        if(index == -1) {index = len - 1;}
        showPics(index);
    });

    //下一页按钮
    $("#focus .next").click(function() {
        index += 1;
        if(index == len) {index = 0;}
        showPics(index);
    });

    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $("#focus ul").css("width",sWidth * (len));

    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $("#focus").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if(index == len) {index = 0;}
        },4000); //此4000代表自动播放的间隔，单位：毫秒
    }).trigger("mouseleave");

    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) { //普通切换
        var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
        $("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
        $("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
        $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
    }
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
