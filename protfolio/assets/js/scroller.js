$('a').click(function(){
    var href = $(this).attr("href"); 
    var pos = $(href).offset().top-125;
    $("html,body").animate({scrollTop: pos}, 800);  
    return false; 
});
