/* float header */
const header_height = $('header').offset().top;

$(window).scroll(function(){
    if(window.scrollY>header_height){
        $('header').css({'position': 'fixed' ,'top': 0 ,'background-color':'rgba(47,47,49,0.95)'});
        $('#what').css({'margin-top':$('header').innerHeight()});
    }else{
        $('header').removeAttr('style');
        $('#what').removeAttr('style');
    }
});

/* link to page */
$('a').click(function(){
    var href = $(this).attr("href");
    var pos = $(href).offset().top+35;
    $("html,body").animate({scrollTop: pos},1250);  
    return false; 
});

/* background change */
$(window).scroll(function(){
    if(window.scrollY>$('#allright').offset().top-100){
        $('body').css('background-color','rgb(145, 145, 145)');
        $('body').css('background-image','url(./assets/images/bg_black.png)');
    }else if(window.scrollY>$('#so').offset().top-100){
        $('body').css('background-color','rgb(45, 95, 160)');
        $('body').css('background-image','url(./assets/images/bg_gray.png)');
    }else if(window.scrollY>$('#what').offset().top-100){
        $('body').css('background-color','rgb(80, 80, 100)');
        $('body').css('background-image','');
    }else if(window.scrollY>$('main').offset().top){
        $('body').css('background-color','rgb(47, 47, 49)');
        $('body').css('background-image','');
    }
});

/* content slide */
$(window).scroll(function(){    
    var scrollTop = $(this).scrollTop() +850;

    $('.name').each(function(){
        if(scrollTop > $(this).offset().top){
            setTimeout(() => {
                $(this).removeClass('name_trans_r');
                $(this).removeClass('name_trans_l');
            }, 300);
        }
    });
});