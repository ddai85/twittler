$(document).ready(function(){
  var $hero = $('.hero');
  $hero.html('');

//function called to compose a tweet on the page        
  displayTweet = function(index, tweetHome){
    var tweet = tweetHome[index];
    var $tweet_body = $('<div class="tweet_body"></div>');
    var $tweet_head = $('<div class="tweet_head"></div>');
    var time = tweet.created_at.toLocaleTimeString();
    

    $tweet_head.html('<a class="user btn btn-default" href="#!" data-user="ben">@' + tweet.user + '</a>');
    $tweet_head.appendTo($hero);
    $('.user').last().attr("data-user", tweet.user);
    $tweet_body.html(tweet.message + ' at ' + time);
    $tweet_body.appendTo($hero);
  }

//initial stream is displayed when page is loaded
  var index = streams.home.length - 1;
  while(index >= 0){
    displayTweet(index, streams['home']);
    index -=1;
  }

// Write function that updates the stream maximum 30 tweets at a time
  updateStream = function(){
    var index = streams.home.length - 1;
    $('.hero').empty();
    if (index > 29){
      while(index >= streams.home.length - 30){
        displayTweet(index, streams['home']);
        index -= 1;
      }
    } else{
      while(index >= 0){
        displayTweet(index, streams['home']);
        index -= 1;
      }
    }
  }

//function called when tweets are filtered by user    
  filterUser = function(user){
    var index = streams['users'][user].length - 1;
    if (index > 29){
      while(index >= streams['users'][user].length - 30){
        displayTweet(index, streams['users'][user]);
        index -= 1;
      }
    } else{
      while(index >= 0){
        displayTweet(index, streams['users'][user]);
        index -= 1;
      }
    }
  }

//listen for clicks on user name links
  $('body').on('click', 'a.user', function(){
    $('.hero').empty();
    filterUser($(this).data("user"));
  })

});