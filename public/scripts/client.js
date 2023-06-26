/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweet) {
  // Create a new article element for the tweet
  const $tweet = $("<article>").addClass("tweet");
  
  // Create the HTML structure for the tweet content
  const $header = $("<header>").addClass("tweet-header");
  const $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars);
  const $username = $("<span>").addClass("username").text(tweet.user.name);
  const $handle = $("<span>").addClass("handle").text(tweet.user.handle);
  $header.append($avatar, $username, $handle);
  
  const $content = $("<div>").addClass("tweet-content").text(tweet.content.text);
  
  const $footer = $("<footer>").addClass("tweet-footer");
  const $timestamp = $("<span>").addClass("timestamp").text(moment(tweet.created_at).fromNow());
  const $icons = $("<div>").addClass("icons");
  const $flagIcon = $("<i>").addClass("fas fa-flag");
  const $retweetIcon = $("<i>").addClass("fas fa-retweet");
  const $heartIcon = $("<i>").addClass("fas fa-heart");
  $icons.append($flagIcon, $retweetIcon, $heartIcon);
  
  $footer.append($timestamp, $icons);
  
  // Append the header, content, and footer to the tweet article
  $tweet.append($header, $content, $footer);
  
  // Return the created tweet element
  return $tweet;
};
  
const renderTweets = function(tweets) {
  // Empty the tweets container
  $("#tweets-container").empty();
  
  // Loop through the array of tweets
  for (const tweet of tweets) {
    // Create a new tweet element using the createTweetElement function
    const $tweet = createTweetElement(tweet);
  
    // Append the tweet element to the tweets container
    $("#tweets-container").append($tweet);
  }
};
  
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};
  
const $tweet = createTweetElement(tweetData);
console.log($tweet); // View the created tweet element
  
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
  
renderTweets(data);
  

