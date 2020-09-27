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

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop("disabled", false);
    });
  });
});
