$(document).ready(function(){
  var $hero = $('.hero');
  var tweetCount = 0;
  $hero.html('');
    
  filterUser = function(user){
    console.log(user);
  }
        
  displayTweet = function(index){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    var time = tweet.created_at.toLocaleTimeString();
    var user = '<a href="javascript:filterUser(yo);">' + tweet.user + '</a>';

    $tweet.html(index + ' @' + user + ': ' + tweet.message + ' at ' + time);
    $tweet.appendTo($hero);
  }

  var index = streams.home.length - 1;
  while(index >= 0){
    displayTweet(index);
    index -=1;
  }

  updateStream = function(){
    var index = streams.home.length - 1;
    $('.hero').empty();
    if (index > 29){
      while(index >= streams.home.length - 30){
        displayTweet(index);
        index -= 1;
      }
    } else{
      while(index >= 0){
        displayTweet(index);
        index -= 1;
      }
    }
  }
});