if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    var mobile=
    {
        'flex-direction': 'column-reverse',
        'height': 'auto','width':'100%',
        'padding-bottom':'2em',
    }
    $('.content').css(mobile);    
    $('.content_reverse').css(mobile);
    $('.selection').css('display','none');
    $('.content_text').css('padding','0');
    $('.content_text').css('width','80%');
    $('.content_img').css('width','100%');
    $('.title').css('font-size','3em');
    $('.text').css('font-size','1.5em');
    $('.button').css('font-size','1em');

    $('h2').css('font-size','2.25em')
    $('h3').css('font-size','1.1em')
}else{}