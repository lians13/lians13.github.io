const header_height = $('header').offset().top;

$(window).scroll(function(){
    if(window.scrollY>header_height){
        $('header').css({'position': 'fixed' ,'top': 0 ,'background-color':'rgba(47,47,49,0.95)'});
        $('.profile').css({'padding-top':$('header').innerHeight()});
    }else{
        $('header').removeAttr('style');
        $('#profile').removeAttr('style');
    }
})

$('a').click(function(){
    var href = $(this).attr("href");
    var pos = $(href).offset().top;
    $("html,body").animate({scrollTop: pos},1500);  
    return false; 
});
