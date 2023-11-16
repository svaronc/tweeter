$(document).ready(function () {
  const renderTweets = (tweets) => {
    tweets.forEach((tweet) =>
      $("#tweets-container").prepend(createTweetElement(tweet))
    );
  };

  const createTweetElement = (data) => {
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
    return $(tweetHtml);
  };

  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: (response) => {
        $("#tweets-container").empty();
        renderTweets(response);
      },
      error: (error) => console.error("Error loading tweets:", error),
    });
  };

  const submitNewTweet = () => {
    const serializeData = $("#new-tweet-form").serialize();
    const tweetContent = $("#new-tweet-form textarea[name='text']").val();

    if (!tweetContent) {
      alert("Your tweet is empty, please write something.");
      return;
    }

    if (tweetContent.length > 140) {
      $(".error-text").slideDown();
      return;
    } else {
      $(".error-text").slideUp();
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializeData,
      success: loadTweets,
      error: (error) => console.error("Error submitting tweet:", error),
    });
    $(".error-text").slideUp();
    $("#new-tweet-form textarea[name='text']").val("");
    $(".counter").text(140);
  };

  loadTweets();

  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();
    submitNewTweet();
  });
});
