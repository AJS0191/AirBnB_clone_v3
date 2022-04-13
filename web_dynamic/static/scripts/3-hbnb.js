$(function () {
  const amenitiesNames = [];
  const amenitiesDict = {};
  const url = "http://0.0.0.0:5001/api/v1/status/";
  $.get(url, function (data) {
    $('DIV#api_status').toggleClass('available nok');
  });
  $('.amenities ul li input').change(function () {
    if ($(this).is(':checked')) {
      amenitiesNames.push($(this).attr('data-name'));
      amenitiesDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      const pos = amenitiesNames.indexOf($(this).attr('data-name'));
      amenitiesNames.splice(pos, 1);
      const id = $(this).attr('data-id');
      delete amenitiesDict.id;
    }
    if (amenitiesNames.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(amenitiesNames.join(', '));
    }
  });
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'post',
  contentType: 'application/json',
  data: '{}',
  dataType: 'json',
  headers: {'Content-Type': 'application/json'}
}).done(function (data) {
  data.sort(function (a, b) { return a.name.localeCompare(b.name); });
  for (let i = 0; i < data.length; i++) {
    $('<article>').append(
      $('<div>', {'class': 'title'}).append(
        $('<h2>').text(data[i]['name']
        $('<div>', {'class': 'price'}).append(
          $('<span>', {'class': 'currency'}).text('$'),
          $('<span>', {'class': 'value'}).text(data[i]['price_by_night'])
        )
      ),
      $('<div>', {'class': 'image'}).append(
        $('<img>', {'src': place.image_url})
      ),
      $('<div>', {'class': 'description'}).append(
        $('<p>').text(data[i]['description'])
      ),
      $('<div>', {'class': 'amenities'}).append(
        $('<h4>').text('&nbsp;'),
        $('<ul>').append(
          $('<li>').append(
            $('<input>', {'type': 'checkbox', 'data-id': place.id, 'data-name': place.name})
          )
        )
      )
    ).appendTo('section#places');
  }
});


