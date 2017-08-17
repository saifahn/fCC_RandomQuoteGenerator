// url for calling the getJSON

var url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=?&lang=en";

var quote = "";
var author = "";

// function to get a random colour
function getRandomColour(){
  // store a random hex number in a var
  var randHex = Math.floor(Math.random() * 0xFFFFFF);
  // convert to a hex output for use to change
  return "#" + ("000000" + randHex.toString(7)).substr(-6);
}

function randomBackground() {
  var randomColour = getRandomColour();
  $("html body").css("background-color", randomColour);
  $(".button").css("background-color", randomColour);
}

function getQuote(data) {
  quote = data.quoteText;
  author = data.quoteAuthor;
  if (author === "") {
    author = "Unknown";
  }
  author = " — " + author;
  $("#quote").fadeOut(100, function() {
    $(this).text(quote).fadeIn(100);
  });
  $("#author").fadeOut(100, function() {
    $(this).text(author).fadeIn(100);
  });
}

function getTweet() {
  var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote) + author;
  window.open(tweetUrl);
}

$(document).ready(function(){
  $.getJSON(url, function(data){
    getQuote(data);
    randomBackground();
  });

  $('#new-quote-text').click(function() {
      $.getJSON(url, function(data){
      getQuote(data);
      randomBackground();
    });
  });

  // on keydown T
  $(document).keydown(function(event) {
    if (event.keyCode == 84) {
      getTweet();
    }
  });

  // on keydown Q
  $(document).keydown(function(event) {
    if (event.keyCode == 81) {
      $.getJSON(url, function(data){
        getQuote(data);
        randomBackground();
      });
    };
  });
});
