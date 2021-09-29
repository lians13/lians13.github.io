var str=["Hi ...",
        "I am Lian, Yan-Jia.",
        "I graduatted from NTUB Department of Digital Multimedia Design.",
        "I good at programming and art design.",
        "Here is my profolio and take a look."
        ];
var i = 0;var j= 0;
var back;
var reverse = false;

function type(){
    if(!reverse){
        if(i <= str[j].length){
            i++;
            $('.typing').html(str[j].slice(0,i));
            setTimeout('type()', 200);
        }
        else{
            reverse=!reverse;
            if(j<str.length-1){
                setTimeout('type()', 750);
            }else{
                setTimeout('type()', 5000);
            }
            back= 45;
        }
    }else{
        if(i > 0){
            i--;
            $('.typing').html(str[j].slice(0,i));
            setTimeout('type()', back);
            if(back>1){back-=0.25;}
        }
        else{
            reverse=!reverse;
            if(j<str.length-1){j++;}
            else{j=1;}

            setTimeout('type()', 750);
        }
    }
}
type();

var isFlash = false
function flashing(){
    isFlash= !isFlash;
    if(isFlash){
        $('.flashing').html('|');
    }else{
        $('.flashing').html('');
    }
    setTimeout('flashing()', 250);
}
flashing();

$('.detail_btn').click(function (e) { 
    e.stopPropagation();
    if($('.menu').css('display') == 'block'){
        $('.menu').fadeOut(150);
    }else if($('.menu').css('display') == ''||$('.menu').css('display') == 'none'){
        $('.menu').fadeIn(150);
        if($('header').css('position') == 'fixed'){
            $('.menu').css({'top':95})
        }else{
            $('.menu').css({'top':$('.detail_btn').offset().top+55})
        }
    }
});
$('.menu').click(function (e) { 
    e.stopPropagation();
});
$(document).click(function(){
    if($('.menu').css('display') == 'block'){
        $('.menu').fadeOut(150);
    }
});

var navheight = $('header').offset().top;
$(window).scroll(function(){
    if(window.scrollY>navheight){
        $('header').css({'position': 'fixed','boxShadow':'0px 3px 5px rgba(52,44,52,0.1) inset'});
        $('.pack').css({'padding-top':$('header').innerHeight()});
        $('.profolio').css({'padding-top':$('header').innerHeight()});
    }else{
        $('header').removeAttr('style');
        $('.pack').removeAttr('style');
        $('.profolio').removeAttr('style');
    }
});

$(window).resize(function () { 
    setplace();
});
$('.work').click(function (e) { 
    if($(window).innerWidth()>768){
        if($('.info').css('display') == 'none' ||$('.info').css('display') == ''){
            $('.info').fadeIn(100);
            setplace();
        }
    }else{
        if($('.float_info').css('display') == 'none' ||$('.float_info').css('display') == ''){
            $('.float_info').css('display','flex')
        }
    } 
    
    var img_gif_id ='#'+ $(this).attr('id')+'_gif_img';
    var text_id ='#'+ $(this).attr('id')+'_text';

    $('.info_img').html($(img_gif_id).html());

    if($('.info_img').children('.work_img').innerHeight()>$('.info_img').children('.work_img').innerWidth()){
        $('.info_img').children('.work_img').css({'width':'auto','height':$('.info_img').height()});
    }else{
        $('.info_img').children('.work_img').css({'height':'auto','width':$('.info').width()-30});
    }
    $('.info_img').children('.work_img').removeAttr('class');

    $('.info_text').html($(text_id).html());
    $('.info_text_pos').css({'width': $('.info_img').innerWidth()-30 , 'top': $('.info_img').offset().top+$('.info_img').innerHeight()-window.scrollY});
});

$('.float_info').click(function (e) {
    if($('.float_info').css('display') == 'block' ||$('.float_info').css('display') == 'flex'){
        $('.float_info').fadeOut(100);
        setTimeout(() => {
            setplace();
        }, 110);
    }
});

function setplace(){ 
    imgsize();

    var left_width = 0;
    var height_offest =0;   var point=0;
    var work_height= new Array();

    $(".work").each(function(index){

        var y = 0
        if(height_offest == 0){y= $('.preview').offset().top}
        else{y = work_height[index-height_offest]}

        $(this).css({'position': 'absolute' , 'left': left_width , 'top': y+15})
  
        if($(this).offset().left+ $(this).innerWidth() > $('.preview').innerWidth()){
            left_width = 0; 

            height_offest = index - point;
            y = work_height[index-height_offest]
            $(this).css({'position': 'absolute' , 'left': left_width ,'top': y+15})
            point = index;
        }
        left_width+=$(this).innerWidth();

        work_height[index] = $(this).offset().top + $(this).innerHeight();
        
        if( work_height[index] -$('.preview').offset().top> $('.preview').innerHeight()){
            $('.preview').css('height', work_height[index])
        }
    });
}
function imgsize(){
    var fulllwidth = $('.preview').innerWidth();
    var y = 0;
    if(fulllwidth>1024){y= (fulllwidth-40)/4}
    else if(fulllwidth>768){y= (fulllwidth-30)/3}
    else{y= (fulllwidth-20)/2}
    $(".work_img").each(function(){
        $(this).css('width', y)
    })

    $('.preview').css('height','auto');
}

new Clipboard( "#copy" );
$('.contact_btn').click(function(){
    alert('Email 已複製到剪貼簿');
});