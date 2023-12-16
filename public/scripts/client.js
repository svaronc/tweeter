$(document).ready(function () {
  // Function to render tweets to the DOM
  const renderTweets = (tweets) => {
    if (!Array.isArray(tweets)) {
      console.error("Invalid tweets data");
      return;
    }

    // Check if tweets container exists
    const tweetsContainer = $("#tweets-container");
    if (tweetsContainer.length === 0) {
      console.error("Tweets container not found");
      return;
    }

    // Iterates over each tweet and prepends it to the container
    tweets.forEach((tweet) => {
      // Additional check for tweet structure
      if (tweet && tweet.user && tweet.content) {
        tweetsContainer.prepend(createTweetElement(tweet));
      } else {
        console.error("Invalid tweet structure", tweet);
      }
    });
  };
  // Function to create a tweet HTML element
  const createTweetElement = (data) => {
    // Using template literals to create HTML structure for a tweet
    const tweetHtml = `
      <article>
        <header class="tweet-header">
          <p><i class="fa-solid fa-user"></i>${data.user.name}</p>
          <p>${data.user.handle}</p>
        </header>
        <textarea disabled="true" name="text" class="tweet-main-text">${
          data.content.text
        }</textarea>
        <footer class="tweet-footer">
          <p>${timeago.format(data.created_at)}</p>
          <div class="tweet-footer-icons">
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`;
    return $(tweetHtml); // Converts the HTML string to a jQuery object
  };

  // Function to load tweets from the server

  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: (response) => {
        // Ensure response is an array
        if (Array.isArray(response)) {
          $("#tweets-container").empty();
          renderTweets(response);
        } else {
          console.error("Invalid response format:", response);
        }
      },
      error: (error) => console.error("Error loading tweets:", error),
    });
  };
  // Function to handle the submission of a new tweet
  const submitNewTweet = () => {
    const tweetContent = $("#new-tweet-form textarea[name='text']").val();

    // Validate tweet content length
    if (tweetContent.length <= 0) {
      $(".empty-text").slideDown();
      $(".error-text").slideUp();
      return;
    } else {
      $(".empty-text").slideUp();
    }

    if (tweetContent.length > 140) {
      $(".error-text").slideDown();
      $(".empty-text").slideUp();
      return;
    } else {
      $(".error-text").slideUp();
    }

    // AJAX call to post a new tweet
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $("#new-tweet-form").serialize(),
      success: loadTweets,
      error: (error) => console.error("Error submitting tweet:", error),
    });
    $("#new-tweet-form textarea[name='text']").val("");
    $(".counter").text(140);
  };

  // Initial load of tweets
  loadTweets();

  // Event handler for tweet form submission
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault(); // Prevents default form submission behavior
    submitNewTweet(); // Calls function to submit a new tweet
  });
});
