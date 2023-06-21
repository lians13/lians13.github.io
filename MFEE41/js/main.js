var currentURL = window.location.href;

// load
$(window).on("load", function () {
    getNewsDate();
    setTimeout(() => {
        if (typeof (transitionDown) === 'function') {
            transitionDown();
        } else {
            $('.load').fadeOut();
            $('header,main,footer').fadeIn();
        }

        if (window.location.hash) {
            var target = window.location.hash;
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500);
        }
    }, 250);
})

// scroll to target
scrollAni = false
$('a').click(function (e) {

    href = $(this).attr('href')

    if (href.indexOf('#') >= 0) {
        if ($(href).length > 0) {
            if (!scrollAni) {
                scrollAni = true
                // e.preventDefault();
                pos = $(href).offset().top;
                $("html,body").animate({ scrollTop: pos }, 1250, () => scrollAni = false);
            }
        }
    }


});


// click functions 
$('nav').click(function (e) {
    $('nav').removeClass('active')
    e.stopPropagation()
})
$('.navButton').click(function (e) {
    $('nav').toggleClass('active')
    e.stopPropagation()
})

$('.question').click(function (e) {
    $(this).toggleClass('active')
})

$('#newsButton').click(function (e) {
    addNewNews()
})
$('#scrollDown').click(function (e) {
    pos = $('#story').offset().top;
    $("html,body").animate({ scrollTop: pos }, 1250, () => scrollAni = false);
})



$('input[type="text"], input[type="email"]').on('focus', function () {
    $(this).addClass('isValue')
})
$('input[type="text"], input[type="email"]').on('focusout', function () {
    if ($(this).val() !== '') {
        $(this).addClass('isValue')
    } else {
        $(this).removeClass('isValue')
    }
})



// ajax news
var data;
const dataUrl = `./json/data.json`;

function getNewsDate() {
    $.getJSON(dataUrl, function (_data) {
        data = _data.result.reverse();
    })
        .done(function () {
            addNewNews(3)

            if (typeof (getNewsContent) === 'function') {
                getNewsContent()
            }
        })
}

//
var newsCount = 0;
function addNewNews(count = 2) {
    var x = $('#newsContainer').html();

    $.each(data, function (index, value) {
        if (index >= newsCount) {
            if (index < newsCount + count) {

                z = `news.html?${value.date.toString().replace(/-/g, '')}&${value.time.toString().replace(/:/g, '')}`
                temp =
                    `<a href="./${z}" class="slideDown once">
                    <h6 class="newsTitle">${value.title}</h6>
                    <span class="newsDate">${value.date}</span>
                    </a>
                    `
                x += temp;
            }
        } else {

        }

    });

    $('#newsContainer').html(x);

    $('[class^=slide],.hide').each(function () {
        observer6.observe(this);
    });

    newsCount += count

    if (newsCount > data.length) {
        $('#newsButton').addClass('done')
        $('#newsButton').text('已到底了')
    }
}