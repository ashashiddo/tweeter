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
  const $timestamp = $("<span>").addClass("timestamp").text($.timeago(tweet.created_at));
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

// Function to escape text to prevent XSS attacks
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
  

  
const renderTweets = function(tweets_data) {
  // Empty the tweets container
  $(".tweets-container").empty();
  console.log(tweets_data);
  // Loop through the array of tweets
    for (i = 0; i < tweets_data?.length; i++) {
        const tweet = tweets_data[i];
    // Create a new tweet element using the createTweetElement function
    const $tweet = createTweetElement(tweet);
  
    // Append the tweet element to the tweets container
    $(".tweets-container").append($tweet);
  }
};

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      renderTweets(response); // Call renderTweets with the response array of tweets
    },
    error: function(error) {
      console.error('Error loading tweets:', error);
    }
  });
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
  
// const $tweet = createTweetElement(tweetData);
// console.log($tweet); // View the created tweet element
  
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

$(document).ready(function() {
  const $errorContainer = $('.error-message');
  
  // Function to append an error message to the error container
  const appendError = function(errorMessage) {
    $errorContainer.text(errorMessage).slideDown();
  };
  
  // Function to remove the error message from the error container
  const removeError = function() {
    $errorContainer.text('').slideUp();
  };
  
  // Function to reset the character counter
  const resetCounter = function() {
    $('.counter').text('140');
  };
  
  // Load tweets on page load
  loadTweets();
  
  // Form submit handler
  const $submitTweet = $('#tweet-form');
  $submitTweet.on('submit', function(e) {
    e.preventDefault();

    // Get the tweet content
    const tweetContent = $('#tweet-text').val();
    
    // Clear previous error messages and slide up the error container
    removeError();
    
    // Check for empty tweet
    if (!tweetContent || tweetContent.trim().length === 0) {
      appendError('You cannot post a blank tweet');
      return;
    }
    
    // Check for tweet length exceeding limit
    if (tweetContent.length > 140) {
      appendError('Your tweet is too long!');
      return;
    }
    
    // Serialize the form data
    const formData = $(this).serialize();
    
    // Send the AJAX POST request
    $.post('/tweets', formData)
      .then(function(response) {
        // Refresh tweets and reset form
        loadTweets();
        $('#tweet-text').val('');
        resetCounter();
      })
      .catch(function(error) {
        console.error('Error submitting tweet:', error);
      });
  });
});