$(function () {
  const amenitiesNames = [];
  const amenitiesDict = {};
  const url = "http://127.0.0.1:5001/api/v1/status/";
  $.get(url, function (data) {
    if (data['status'] === 'OK') {
      console.log("made it past the if");
      $('DIV#api_status').toggleClass('available');
    }}
  );
  $('.amenities ul li input').change(function () {
    if ($(this).is(':checked')) {
      let dataName = ($(this).attr('data-name').replace('_', ' '))
      amenitiesNames.push(dataName);
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
  url: 'http://127.0.0.1:5001/api/v1/places_search/',
  type: 'post',
  contentType: 'application/json',
  data: '{}',
}).done(function (data) {
  //data.sort(function (a, b) { return a.name.localeCompare(b.name); });
  for (const element of data) {
    $('section.places').append(
      $('<article>').html(
        $('<div>').append(
          $('<div>', {'class': 'title_box'}).append(
            $('<h2>').text(element['name']),
            $('<div>', {'class': 'price_by_night'}).text('$' + element['price_by_night'])),
          $('<div>', {'class': 'information'}).append(
            $('<div>', {'class': 'max_guest'}).text(element['max_guest'] + ' Guests'),
            $('<div>', {'class': 'number_rooms'}).text(element['number_rooms'] + ' Bedrooms'),
            $('<div>', {'class': 'number_bathrooms'}).text(element['number_bathrooms'] + ' Bathrooms')),
          $('<div>', {'class': 'user'}).append(
            $('<div>', {'class': "description"}).html(element['description']))
        )))
  }});
