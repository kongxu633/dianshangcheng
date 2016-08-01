$(document).ready(function(){
    $('#skippr').skippr();
    slidesing("#slidera_name");
});


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
