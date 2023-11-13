/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  const renderTweets = function (tweets) {
    for (const tw of tweets) {
      const $tweet = createTweetElement(tw);
      $("#tweets-container").append($tweet);
    }
  };
  const createTweetElement = function (data) {
    let tweetDay = new Date(data.created_at);
    const $tweet = $(`
  <article>
        <header class="tweet-header">
          <p><i class="fa-solid fa-user"></i>${data.user.name}</p>
          <p>${data.user.handle}</p>
        </header>
        <textarea disabled = "true" name="text" class="tweet-main-text">${
          data.content.text
        }</textarea>
        <footer class="tweet-footer">
          <p>${tweetDay.getDay()} days ago</p>
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
  // Test / driver code (temporary)
  renderTweets(data);
  console.log($tweet); // to see what it looks like
});
