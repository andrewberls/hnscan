# TODO: localStorage instead of cookies
# TODO: page offsets

create_node = (options={}) ->
  """
    <div class="item">
      <input type="checkbox">
      <span class="post" data-id="#{options.id}" data-url="#{options.url}">#{options.title}</span>
    </div>
  """

generate_links = (data={}) ->
  for item in data.items
    # Show the headline unless we've already saved it
    unless $.cookie("item-#{item.id}") == 'true'
      node = create_node { id: item.id, url: item.url, title: item.title }
      $('#links').append node

destroy_item = (item, id) ->
  item.slideUp 250, ->
    $.cookie("item-#{id}", true)
    item.remove()


$ ->
  # Fill the form with cookie values if we have them
  $("#auth-username").val $.cookie("auth-username")
  $("#auth-password").val $.cookie("auth-password")

  $.ajax {
    url: 'http://api.ihackernews.com/page?format=jsonp&callback=?'
    dataType: 'jsonp'
    success: generate_links
  }

  $(document.body).delegate 'input[type=checkbox]', 'click', ->
    # Grab creds from cookies if we have them, otherwise the form
    username = $.cookie("auth-username") || $('#auth-username').val()
    password = $.cookie("auth-password") || $('#auth-password').val()

    if username == '' or password == ''
      alert 'Please enter your Instapaper credentials in the form'
      $(@).attr('checked', false)
    else
      # Store creds in cookies for convenience. High-security app right here.
      $.cookie("auth-username", username)
      $.cookie("auth-password", password)

      item  = $(@).parent()
      link  = item.find('span')
      id    = link.data('id')
      url   = link.data('url')
      title = link.text()

      $.ajax {
        url: "https://www.instapaper.com/api/add?format=jsonp&username=#{username}&password=#{password}&url=#{url}&title=#{title}"
        dataType: 'jsonp'
      }

      # Store a cookie saying we've read this item and remove it.
      destroy_item(item, id)
