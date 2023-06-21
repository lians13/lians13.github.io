var dataDate

function getPageData() {
    var startIndex = currentURL.lastIndexOf('news.html?');

    if (startIndex >= 0) {
        if (currentURL.lastIndexOf('all') >= 0) {
            backToNewsPage();
        } else {
            startIndex += 10

            temp = currentURL.substring(startIndex)


            if (getDateValue(temp)[0]) {
                dataDate = getDateValue(temp)
            } else {
                backToNewsPage();
            }
        }

    } else {
        // backToNewsPage();
    }
}

function getDateValue(_data) {
    var index = _data.indexOf('&')
    if (index >= 0) {
        x = _data.substring(0, index)
        y = _data.substring(index + 1, index + 1 + 4)

        if (!isNaN(x) && !isNaN(y) && x.length == 8 && y.length == 4) {
            xx = x.substring(0, 4) + '-' + x.substring(4, 6) + '-' + x.substring(6, 8)
            yy = y.substring(0, 2) + ':' + y.substring(2, 4)
            return [true, xx, yy]
        }

    } else {

    }
    return [false]
}

function backToNewsPage() {
    setTimeout(() => {
        document.location.href = `${newLink('/#news')}`;
    }, 150);
}

function getNewsContent() {
    $.each(data, function (index, element) {
        if (element.date == dataDate[1] && element.time == dataDate[2]) {
            dataDate.push(index);
            render()
            return false
        } else {

        }
    })
}
function render() {
    _r = data[dataDate[3]]
    $('#newsTitle').html(_r.title)
    $('#newsContent').html(_r.description)
    $('#newsDate').html(_r.date)

    if (dataDate[3] + 1 < data.length) {

        z = `news.html?${data[dataDate[3] + 1].date.toString().replace(/-/g, '')}&${data[dataDate[3] + 1].time.toString().replace(/:/g, '')}`
        temp =
            `<a href="./${z}">
            <h6 class="newsTitle">${data[dataDate[3] + 1].title}</h6>
            <span class="newsDate">${data[dataDate[3] + 1].date}</span>
            </a>
            `
        $('#lastNews').html(temp)
    } else {
        $('#lastNews').html('<h6>沒有更新的消息了</h6>')
    }

    if (dataDate[3] - 1 >= 0) {
        z = `news.html?${data[dataDate[3] - 1].date.toString().replace(/-/g, '')}&${data[dataDate[3] - 1].time.toString().replace(/:/g, '')}`
        temp =
            `<a href="./${z}">
            <h6 class="newsTitle">${data[dataDate[3] - 1].title}</h6>
            <span class="newsDate">${data[dataDate[3] - 1].date}</span>
            </a>
            `
        $('#nextNews').html(temp)
    } else {
        $('#nextNews').html('<h6>沒有更舊的消息了</h6>')
    }
}

$(window).on("load", function () {
    getPageData()

    $('.bgImg-a').css('opacity', 0)
})
