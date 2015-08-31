var message = {
  username: 'wassup',
  text: '<script>alert("wassup")</script>',
  roomname: '4chan'
};

// post to server is available to everyone
var app = {
  init : function(){

  },

  send : function(message){ $.ajax({
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
  fetch : function(url){$.ajax({
      // 'https://api.parse.com/1/classes/chatterbox'
      url: url,
      type: 'GET',
      data: null,
      success: function (data) {
        my_data = data
        console.log(data)
        this.data = data
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message');
      }
    },'text') //should prevent all aerial attacks
  },
  clearMessages : function(){
    
  }
}
