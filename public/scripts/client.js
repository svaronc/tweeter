/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function (tweets) {
  for (const tw of tweets) {
    const $tweet = createTweetElement(tw);
    $("#tweets-container").append($tweet);
  }
};
const createTweetElement = function (data) {
  let tweetDay = timeago.format(data.created_at);
  const $tweet = $(`
<article>
      <header class="tweet-header">
        <p><i class="fa-solid fa-user"></i>${data.user.name}</p>
        <p>${data.user.handle}</p>
      </header>
      <textarea disabled = "true" name="text" class="tweet-main-text">${data.content.text}</textarea>
      <footer class="tweet-footer">
        <p>${tweetDay}</p>
        <div class="tweet-footer-icons">
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
`);
  return $tweet;
};

const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json",
    success: function (response) {
      console.log("loggin succes --->", response);
      renderTweets(response);
    },
  });
};

$(document).ready(function () {
  loadTweets();
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();
    let serializeData = $(this).serialize();
    console.log(serializeData);
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializeData,
      success: function (response) {
        console.log(response);
      },
    });
  });
});
