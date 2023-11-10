$(document).ready(function () {
  console.log("Ready to manipulate the DOM");
});

$("#tweet-text").on("keyup", function () {
  let value = $(this).val();
  let counter = $(this).siblings(".new-tweet-footer").find(".counter");
  let maxLength = 140;
  counter.text(maxLength - value.length);
  if (maxLength < value.length) {
    counter.addClass("counter-negative");
  } else {
    counter.removeClass("counter-negative");
  }
});
