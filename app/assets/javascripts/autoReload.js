$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<ul class="chat-main__message-list__leftbox" data-message-id=${message.id}>
          <li class="chat-main__message-parts">
            <div class="chat-main__poster">
              <div class="chat-main__poster-name">
                ${message.user_name}
              </div>
              <div class="chat-main__poster-date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__message">
              <img class="Message__image" src="${message.image}">
            </div>
          </li>
        </ul>`
      return html;
    } else {
      let html =
        `<ul class="chat-main__message-list__leftbox" data-message-id=${message.id}>
          <li class="chat-main__message-parts">
            <div class="chat-main__poster">
              <div class="chat-main__poster-name">
                ${message.user_name}
              </div>
              <div class="chat-main__poster-date">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__message">
              <p class="chat-main__message__content">
                ${message.content}
              </p>
            </div>
          </li>
        </ul>`
      return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.chat-main__message-list__leftbox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});