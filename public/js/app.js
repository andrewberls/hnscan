/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                                enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                                enc4 = 64;
                        }

                        output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
        },

        // public method for decoding
        decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                        enc1 = this._keyStr.indexOf(input.charAt(i++));
                        enc2 = this._keyStr.indexOf(input.charAt(i++));
                        enc3 = this._keyStr.indexOf(input.charAt(i++));
                        enc4 = this._keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                                output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                                output = output + String.fromCharCode(chr3);
                        }

                }

                output = Base64._utf8_decode(output);

                return output;

        },

        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                                utftext += String.fromCharCode(c);
                        }
                        else if((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }

                }

                return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while ( i < utftext.length ) {

                        c = utftext.charCodeAt(i);

                        if (c < 128) {
                                string += String.fromCharCode(c);
                                i++;
                        }
                        else if((c > 191) && (c < 224)) {
                                c2 = utftext.charCodeAt(i+1);
                                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                i += 2;
                        }
                        else {
                                c2 = utftext.charCodeAt(i+1);
                                c3 = utftext.charCodeAt(i+2);
                                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                i += 3;
                        }

                }

                return string;
        }

}

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */

$.cookie = function(key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
        options = $.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path    ? '; path=' + options.path : '',
            options.domain  ? '; domain=' + options.domain : '',
            options.secure  ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

    var pairs = document.cookie.split('; ');
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
        if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
    }
    return null;
};

// Generated by CoffeeScript 1.3.3
var create_node;

create_node = function(options) {
  if (options == null) {
    options = {};
  }
  return "<div class=\"item\">\n  <input type=\"checkbox\">\n  <span class=\"post\" data-id=\"" + options.id + "\" data-url=\"" + options.url + "\">" + options.title + "</span>\n</div>";
};

$(function() {
  $("#auth-username").val($.cookie("auth-username"));
  $("#auth-password").val($.cookie("auth-password"));
  return $.ajax({
    url: 'http://api.ihackernews.com/page?format=jsonp&callback=?',
    dataType: 'jsonp',
    success: function(data) {
      var item, node, _i, _len, _ref, _results;
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
    }
  });
});

$(document.body).delegate('input[type=checkbox]', 'click', function(e) {
  var id, item, link, password, title, url, username;
  username = $.cookie("auth-username") || $('#auth-username').val();
  password = $.cookie("auth-password") || $('#auth-password').val();
  if (username === '' || password === '') {
    alert('Please enter your Instapaper credentials in the form');
    $(this).attr('checked', false);
    e.preventDefault();
    return false;
  } else {
    $.cookie("auth-username", username);
    $.cookie("auth-password", password);
    item = $(this).parent();
    link = item.find('span');
    id = link.data('id');
    url = link.data('url');
    title = link.text();
    $.ajax({
      type: 'GET',
      url: "https://www.instapaper.com/api/add?format=jsonp&username=" + username + "&password=" + password + "&url=" + url + "&title=" + title,
      dataType: 'jsonp'
    });
    return item.slideUp(250, function() {
      $.cookie("item-" + id, true);
      return item.remove();
    });
  }
});
