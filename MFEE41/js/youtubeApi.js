var channelID = "UCorqI2EE1avwlTCekjfi0LQ";
// var apiKey = "AIzaSyCz4Zl_MIXMjZNfeG14te0xyagE-GW4PjY";
var apiKey = "AIzaSyBFMgr9WJiGwl3_ykkg_y9sOUrMSf6-uKk";

fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=7`
)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var videoIds = data.items.map(function (item) {
            return item.id.videoId;
        });

        fetch(
            `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(',')}&part=status`
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var videos = data.items;
                var validVideos = [];

                for (var i = 0; i < Math.min(videos.length, 5); i++) {
                    var video = videos[i];
                    var videoId = video.id;
                    var status = video.status;

                    if (status.privacyStatus === "public" && status.uploadStatus === "processed") {
                        validVideos.push(videoId);
                    }
                }

                for (var i = 0; i < 5; i++) {
                    createPlayer("player" + (i + 1), validVideos[i]);
                }
            });
    });
function createPlayer(playerDiv, videoId) {
    new YT.Player(playerDiv, {
        height: "360",
        width: "640",
        videoId: videoId,
    });
}