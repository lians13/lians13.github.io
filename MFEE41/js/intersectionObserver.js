const options = {
    threshold: Array.from({ length: 100 }, (_, i) => i / 100),
};

const observer1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.intersectionRatio > 0.5) {
                $('.bgImg-a').removeAttr('style');
                $('.ppc').fadeIn()
                $('nav.hidden').removeAttr('style');
            }else{
                $('.ppc').fadeOut()
                $('nav.hidden').css('visibility','visible');
            }
        } else {
            
        }
    });
}, options);
$('header').each(function () {
    observer1.observe(this);
});



const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            $('.title').fadeOut();
            $('.bgImg-a').css({
                'background-size': 'auto 45%',
                'transform': 'translate(0%,-85%)'
            })

            $('.bgImg-b').each(function (index, element) {
                z = index * -1 + 2 + 1;
                b = 25 - entry.intersectionRatio * z * 25 <= 10 + z ? 10 + z : 25 - entry.intersectionRatio * z * 25;
                $(this).css({
                    'background-size': function () { return 'auto ' + b + '%' },
                })

            });
        } else {
            $('.title').fadeIn();
        }
    });
}, options);
$('main').each(function () {
    observer2.observe(this);
});



const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            $('.bgImg-a').css('opacity', 0)
        } else {
            $('.bgImg-a').css('opacity', 1)
        }
    });
});
$('.info').each(function () {
    observer3.observe(this);
});



const observer4 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            $('banner').css({
                // 'transform': function () { return 'translate(0,' + ((window.scrollY + window.innerHeight - $(entry.target).offset().top) * -1) + 'px)' }
                'height': function () { return 'calc(100vh - ' + ((window.scrollY + window.innerHeight - $(entry.target).offset().top)) + 'px)' }
            })

            if (entry.intersectionRatio >= 0.5) {
                $('.bgImg-a,.title').removeAttr('style')
                $('.bgImg-a').removeClass('hidden')
                $('.title').addClass('light');

            } else {

            }
        } else {
            $('banner').removeAttr('style');
            $('.title').removeClass('light');
        }
    });
}, options);
$('footer>div').each(function () {
    observer4.observe(this);
});



const observer5 = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            $(entry.target).children('div:first').css('display', 'block');
            if (entry.intersectionRatio > 0.5) {

                value = (window.scrollY + $(window).innerHeight() / 2 - $(entry.target).offset().top) / $(entry.target).height() + 0.75;

                $(entry.target).children('div:first').children('article:first').css({
                    'transform': function () { return 'scale(' + value + ')' }
                })
                $(entry.target).children('div:first').children('article:first').fadeIn();
            } else {
                $(entry.target).children('div:first').children('article:first').fadeOut();
            }

        } else {
            $(entry.target).children('div:first').removeAttr('style');
            $(entry.target).children('div:first').children('article:first').removeAttr('style');
        }
    });
}, options);
$('.content').each(function () {
    observer5.observe(this);
});


const observer6 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.intersectionRatio >= .85) {
                $(entry.target).addClass('show')
            }
        } else {
            if ($(entry.target).attr('class').indexOf('once') < 0) {
                $(entry.target).removeClass('show')
            }
        }
    });
}, options);
$('[class^=slide],.hide').each(function () {
    observer6.observe(this);
});

const observer7 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            $(entry.target).addClass('show')
        } else {
            $(entry.target).removeClass('show')
        }
    });
});
$('[class^=flip]').each(function () {
    observer7.observe(this);
});