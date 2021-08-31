$('html,body').animate({ scrollTop: 0 }, 'slow');

if($('.banner_bg').innerWidth()/$('.banner_bg').innerHeight()>1.34){
    $('.banner_img').css({'height':'auto' , 'width':'100%'})
}else{
    $('.banner_img').css({'height':'100%' , 'width':'auto'})
}

/* loading */
$(document).ready(function () {
    $('.release').css({"height": window.innerHeight-$('header').height()-$('footer').height()})

   setTimeout(function(){
       $('.loading').fadeOut(500);
   }, 500);
});

/* nav top */ 
var navheight = $('header').offset().top;
$(window).scroll(function(){
    if($('nav').css('display') == 'flex'){$('nav').removeAttr('style');}

    if(window.scrollY>navheight){
        $('header').css({'position': 'fixed' , 'height': '68px' , 'background': 'rgba(218, 224, 228,1)' , 'boxShadow':'0px 5px 3px rgba(52,44,52,0.1)'});
        $('#banner').css({'padding-top':$('.logo_table').innerHeight()});
    }else{
        $('header').removeAttr('style');
        $('#banner').removeAttr('style');
    }
})
/* content slide */
$(window).scroll(function(){
    var scrollTopa = $(this).scrollTop();
    var scrollTopb = scrollTopa+850;

    $('.content').each(function(index){
        var address = '#'+$(this).attr('id');
        var offest = $(address).offset();

        if(scrollTopb > offest.top){
            $(''+address+' .content_img').addClass('img_slide');
            $(''+address+' .content_text'+' .title').addClass('title_slide');
            $(''+address+' .content_text'+' .text').addClass('text_slide');
            $(''+address+' .content_text'+' .button').addClass('button_slide');
        }
    });
});

/* nav button click */
$('.nav_button').click(function(){
    if(window.innerWidth<=576){
        if($('nav').css('display') =='flex'){
            $('nav').css({'display':''})
            $('header').css({'height':$('.logo_table').innerHeight()})
        }else if($('nav').css('display') =='' ||$('nav').css('display') =='none'){
            $('nav').css({'display':'flex'})
            if($('header').css('position') == 'static' || $('header').css('position') == 'relative'){
                $('.logo_table').css('height','88px')
            }
            $('header').css({'height':$('.logo_table').innerHeight() , 'background': 'rgb(218, 224, 228)'});
            $('nav').css({'position':'fixed' , 'padding-top':$('.logo_table').innerHeight(),'background': 'rgb(218, 224, 228)','boxShadow':'0px 5px 3px rgba(52,44,52,0.1)'})
        }
        $('.release').css({"height": window.innerHeight-$('header').height()-$('footer').height()})
    }
});

/* link move */
$('a').click(function(){
    var href = $(this).attr("href");
    var pos = $(href).offset().top-100;
    $("html,body").animate({scrollTop: pos}, 800);  
    return false; 
});

/* resize */
$(window).resize(function () { 
    $('.release').css({"height": window.innerHeight-$('header').height()-$('footer').height()})

    $('header').css('height',$('.logo_table').innerHeight())
    if(window.innerWidth<=576){ $('nav').css({'display':''})}
    else{$('nav').removeAttr('style')}

    if($('.banner_bg').innerWidth()/$('.banner_bg').innerHeight()>1.34){
        $('.banner_img').css({'height':'auto' , 'width':'100%'})
    }else{
        $('.banner_img').css({'height':'100%' , 'width':'auto'})
    }
});
