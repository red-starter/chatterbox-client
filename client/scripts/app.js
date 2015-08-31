
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
        pushMessages(response);
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
  // addRoom : function(){
  //   $('#roomSelect').append('<d)
  // }

}

response = app.fetch('https://api.parse.com/1/classes/chatterbox')

var pushMessages = function(response){
  console.log(response.results)
  // var parsedResponse = JSON.parse(response.responseText);
  _.each(response.results,function(message){
    app.addMessage(message.text);
  })
}



