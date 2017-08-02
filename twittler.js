$(document).ready(function(){
  var $hero = $('.hero');
  var currentView = streams['home'];
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
  updateStream = function(tweetHome){
    var index = tweetHome.length - 1;
    $('.hero').empty();
    if (index > 29){
      while(index >= tweetHome.length - 30){
        displayTweet(index, tweetHome);
        index -= 1;
      }
    } else{
      while(index >= 0){
        displayTweet(index, tweetHome);
        index -= 1;
      }
    }
  }


//listen for clicks on user name links
  $('body').on('click', 'a.user', function(){
    $('.hero').empty();
    updateStream(streams['users'][$(this).data('user')]);
    currentView = streams['users'][$(this).data('user')];
    $('.showAll').show();
  })

//hide show all tweets button until a single user stream is clicked
  $('.showAll').hide();
  $('.showAll').on('click', function(){
    updateStream(streams['home']);
    currentView = streams['home'];
    $('.showAll').hide();
  })

//refresh button checks which current view is and refreshes that view
  $('body').on('click', 'a.btn-refresh', function(){
    updateStream(currentView);
  })

});