// Generated by CoffeeScript 1.3.3
var create_node, destroy_item, generate_links;

create_node = function(options) {
  if (options == null) {
    options = {};
  }
  return "<div class=\"item\">\n  <input type=\"checkbox\">\n  <span class=\"post\" data-id=\"" + options.id + "\" data-url=\"" + options.url + "\">" + options.title + "</span>\n</div>";
};

generate_links = function(data) {
  var item, node, _i, _len, _ref, _results;
  if (data == null) {
    data = {};
  }
  _ref = data.items;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    item = _ref[_i];
    if ($.cookie("item-" + item.id) !== 'true') {
      node = create_node({
        id: item.id,
        url: item.url,
        title: item.title
      });
      _results.push($('#links').append(node));
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

destroy_item = function(item, id) {
  return item.slideUp(250, function() {
    $.cookie("item-" + id, true);
    return item.remove();
  });
};

$(function() {
  $("#auth-username").val($.cookie("auth-username"));
  $("#auth-password").val($.cookie("auth-password"));
  $.ajax({
    url: 'http://api.ihackernews.com/page?format=jsonp&callback=?',
    dataType: 'jsonp',
    success: generate_links
  });
  return $(document.body).delegate('input[type=checkbox]', 'click', function() {
    var id, item, link, password, title, url, username;
    username = $.cookie("auth-username") || $('#auth-username').val();
    password = $.cookie("auth-password") || $('#auth-password').val();
    if (username === '' || password === '') {
      alert('Please enter your Instapaper credentials in the form');
      return $(this).attr('checked', false);
    } else {
      $.cookie("auth-username", username);
      $.cookie("auth-password", password);
      item = $(this).parent();
      link = item.find('span');
      id = link.data('id');
      url = link.data('url');
      title = link.text();
      $.ajax({
        url: "https://www.instapaper.com/api/add?format=jsonp&username=" + username + "&password=" + password + "&url=" + url + "&title=" + title,
        dataType: 'jsonp'
      });
      return destroy_item(item, id);
    }
  });
});
