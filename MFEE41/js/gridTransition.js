//  use jQuery
//  HTML 
//  <div class="grid">
//      <div></div>
//  </div>

transitionCount = 0;
var reverese = false;

function transitionDown() {
    w = 7.5;

    var maxCount = $(window).height() / w;

    var timeSet = 50 - transitionCount * 15;

    if (timeSet <= 0) { timeSet = 0.1 }

    if (!reverese) {
        transitionCount++;
        $('.grid').css({
            'display': 'block',
            'top': 0,
            'height': function () { return w * transitionCount }
        })
        $('.grid>div').css({
            'top': 0,
        });

       

        if (transitionCount <= maxCount) {
            setTimeout(() => {
                transitionDown();
            }, timeSet);
        } else {
            reverese = true;
            $('.load').fadeOut();
            setTimeout(() => {
                transitionDown();
            }, 150);
            $('header,main,footer').fadeIn();
        }
    } else {
        transitionCount--;
        $('.grid').css({
            'top': function () { return w * (maxCount - transitionCount) },
            'height': function () { return w * transitionCount },
        })
        if (transitionCount % 2 == 0) {
            $('.grid>div').css({

                'background-position': function(){return w+' 0,'+(w*2)+' '+w}
            })
        } else {
            $('.grid>div').css({
                'background-position': function () { return '0 0,' + w + ' ' + w }
            })
        }

        if (transitionCount >= 0) {
            setTimeout(() => {
                transitionDown();
            }, timeSet);
        } else {
            reverese = false;
            window.scroll(0, 0);
        }
    }
}