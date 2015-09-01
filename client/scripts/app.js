
var message = {
  username: 'wassup',
  text: '<script>alert("wassup")</script>',
  roomname: '4chan'
};

// post to server is available to everyone
var app = {
  init : function(){
    //populate website with messages
    this.fetch('https://api.parse.com/1/classes/chatterbox')
  },  

  send : function(message){ 
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    })
  },
  fetch : function(url){
    return $.ajax({ //$.ajax is an outer function that also needs to return
      // 'https://api.parse.com/1/classes/chatterbox'
      url: url,  //WHY? instead of passing in an actual url
      type: 'GET',
      data: null,
      success: function (data) {
        var response = data;
        console.log(response)

        pushMessages(response);
        var rooms = makeRoomsObject(data.results)
        makeButtons(rooms);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    },'text') //should prevent all aerial attacks
  },
  clearMessages : function(){
      $('#chats').empty();
  },
  addMessage : function(text){
    //hacker proof top notch security
      $('#chats').prepend("<div>");
      $('#chats div:first').text(text);
  },
  addRoom : function(){
    $('#roomSelect').append()
  }

}

response = app.fetch('https://api.parse.com/1/classes/chatterbox')

var pushMessages = function(response){
  // var parsedResponse = JSON.parse(response.responseText);
  response.results = response.results.slice(0,20);
  _.each(response.results,function(message){
    app.addMessage(message.text);
  })
}

var makeRoomsObject = function(results) {

  var rooms = {};
  results.forEach(function(message) {
    var key = message.roomname;
    if(rooms[key]){
      rooms[key].push(message);
    } else {
      rooms[key] = [message];
    }
  })
  console.log(rooms);
  return rooms;

};

var makeButtons = function(rooms) {
  // _.each(rooms, function(room) {
  //   $(".roomButtons").append("<button>"+room)
  // })
  for (var key in rooms) {
    //reference to node
    var $button = $("<button>");
    $button.click(function(){
      var messageArr = rooms[$(this).text()]
      app.clearMessages();
      messageArr.forEach(function(message){
        app.addMessage(message.text);
      })
    })
    $(".roomButtons").append($button)
    $(".roomButtons button:last").text(key)
  }
};

$(".roomButtons").click()











