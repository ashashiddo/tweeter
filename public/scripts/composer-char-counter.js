$(document).ready(function () {
    console.log("composer-char-counter.js loaded successfully");
    
    $("#tweet-text").on("input", function () {
        var tweetLength = $(this).val().length;
        var counter = $(this).siblings(".counter-container").find(".character-counter");
        counter.text(140 - tweetLength);
        if (tweetLength > 140) {
            counter.addClass("invalid");
        } else {
            counter.removeClass("invalid");
        }
    });
});
