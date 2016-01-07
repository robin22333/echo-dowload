$('.get_btn').click(function() {
  var key = $('.key').val().trim();
  if (!validateUrl(key)) {
    alert('error url');
    return false;
  }
  $.getJSON('/sound/detail?key=' + key, function(data) {
    if(data.flag) {
      var obj = data.data;
      $('body').css('padding', '100px');
      $('.sound_img').attr('src', obj.pic);
      $('.sound_name').text(obj.name);
      //$('.sound_name').attr('href', key);
      $('.sound_pic').attr('href', obj.pic);
      $('.sound_source').attr('href', obj.source);
      $('.container').hide();
      $('.result').show();
    } else {
      alert(data.error);
    }
  })
});

$('.back').click(function() {
  $('body').css('padding', '300px');
  $('.key').val('');
  $('.container').show();
  $('.result').hide();
});

function validateUrl(url) {
  if (url.indexOf('www.app-echo.com') === -1) {
    return false;
  }
  return true;
}
