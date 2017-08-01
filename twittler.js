$(document).ready(function(){
  var $hero = $('.hero');
  $hero.html('');
   
//function called when tweets are filtered by user    
  filterUser = function(user){
    console.log(user);
  }

//function called to compose a tweet on the page        
  displayTweet = function(index){
    var tweet = streams.home[index];
    var $tweet_body = $('<div class="tweet_body"></div>');
    var $tweet_head = $('<div class="tweet_head"></div>');
    var time = tweet.created_at.toLocaleTimeString();
    

    $tweet_head.html('@' + tweet.user + ' ' + time);
    $tweet_body.html(index + ' ' + tweet.message);
    $tweet_head.appendTo($hero);
    $tweet_body.appendTo($hero);
  }

//initial stream is displayed when page is loaded
  var index = streams.home.length - 1;
  while(index >= 0){
    displayTweet(index);
    index -=1;
  }

// Write function that updates the stream maximum 30 tweets at a time
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