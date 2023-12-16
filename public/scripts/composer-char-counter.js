$(document).ready(function () {
  console.log("Ready to manipulate the DOM");
});

// Event handler for 'input' event on the element with id 'tweet-text'
$("#tweet-text").on("input", function () {
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
// Event handller for show the new tweet box
$(".header-rigth").on("click", function () {
  $(".new-tweet").toggle("slow");
});

//Event to hide and show the write and go up elements
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 0) {
    $("#up-button").fadeIn();
    $(".header-rigth").fadeOut();
  } else {
    $("#up-button").fadeOut();
    $(".header-rigth").fadeIn();
  }
});

$("#up-button").on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, "smooth");
});
