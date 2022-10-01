const vm = new Vue({
    el:'#app',
    data:{
        data:[],
        instrumentsdata:[],
        orchestradata:[],

        chapter:0,
        class_num:0,
    },
    methods:{
        intro:function(){
            $('.content').fadeOut();
            $('.pagelist').removeClass("active");
        },
        nav_click:function(num){
            this.chapter=num;

            $('.pagelist').removeClass("active");
            $('.pagelist').each(function(index){
                if(index==num){
                    $(this).addClass('active');
                    return;
                }
            })
            $('.content').fadeIn();
            this.select_class(this.class_num);
        },
        show_list:function(){
            if($('#slide-down-list').css('display')=='block'){
                $('#slide-down-list').slideUp();
                $('.menu-btn').removeClass('menu-btn-on');
            }else{
                $('#slide-down-list').slideDown();
                $('.menu-btn').addClass('menu-btn-on');
            }
        },
        select_class:function(num){
            this.class_num=num;
            $('.instrument').each(function(){
                $(this).fadeOut(150);
                
            })
            setTimeout(() => {
                $('.i_active').each(function(){
                    $(this).fadeIn();
                })
            }, 300);
            
        }
    }

})
$(document).click(function(){
    $('#slide-down-list').slideUp();
    $('.menu-btn').removeClass('menu-btn-on');
});
