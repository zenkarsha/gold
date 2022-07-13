(function() {
  var countdown, createImage, currentTime;

  countdown = Date.now();

  currentTime = Date.now();

  createImage = function() {
    $('.loading').show();
    return $.ajax({
      url: 'generate',
      dataType: 'html',
      type: 'POST',
      data: {
        text: $('#text').val(),
        type: 1
      },
      success: function(result) {
        var data;

        data = $.parseJSON(result);
        $('.preview-img').html(data.preview);
        return $('.loading').hide();
      }
    });
  };

  $(function() {
    createImage();
    $('#default-submit').click(function() {
      $('#type').val('3');
      return $('#appform').attr('target', '_self').submit();
    });
    $('#showroom-submit').click(function() {
      $('#type').val('2');
      return $('#appform').attr('target', '_self').submit();
    });
    $('body').delegate('#text', 'blur', function() {
      return createImage();
    });
    $('body').delegate('#text', 'keydown', function() {
      return countdown = Date.now();
    });
    $('body').delegate('#text', 'keyup', function() {
      return setTimeout((function() {
        currentTime = Date.now();
        if (currentTime - countdown >= 240) {
          $('#loading').show();
          return createImage();
        }
      }), 250);
    });
    $('body').delegate('.likebtn', 'click', function() {
      var current, _this;

      _this = $(this);
      current = _this.parent().find('.likecount').text();
      _this.removeClass('likebtn').addClass('unlikebtn').html('收回萬歲');
      _this.parent().find('.likecount').text(parseInt(current) + 1);
      return $.ajax({
        url: 'like',
        dataType: 'html',
        type: 'POST',
        data: {
          url: _this.data('url')
        },
        success: function(result) {
          var data;

          data = $.parseJSON(result);
          if (data.state === true) {
            return _this.parent().find('.likecount').text(data.count);
          } else {
            _this.removeClass('unlikebtn').addClass('likebtn').html('萬歲');
            return _this.parent().find('.likecount').text(current);
          }
        }
      });
    });
    $('body').delegate('.unlikebtn', 'click', function() {
      var current, _this;

      _this = $(this);
      current = _this.parent().find('.likecount').text();
      _this.removeClass('unlikebtn').addClass('likebtn').html('萬歲');
      _this.parent().find('.likecount').text(parseInt(current) - 1);
      return $.ajax({
        url: 'unlike',
        dataType: 'html',
        type: 'POST',
        data: {
          url: _this.data('url')
        },
        success: function(result) {
          var data;

          data = $.parseJSON(result);
          if (data.state === true) {
            return _this.parent().find('.likecount').text(data.count);
          } else {
            _this.removeClass('likebtn').addClass('unlikebtn').html('收回萬歲');
            return _this.parent().find('.likecount').text(current);
          }
        }
      });
    });
    return $('.gototop').click(function() {
      return $('html,body').animate({
        scrollTop: 0
      }, 'fast');
    });
  });

  $(window).scroll(function(event) {
    var height, scroll;

    scroll = $(window).scrollTop();
    height = $(window).height();
    if (scroll > height * 0.5) {
      return $('.gototop').show();
    } else {
      return $('.gototop').hide();
    }
  });

}).call(this);
