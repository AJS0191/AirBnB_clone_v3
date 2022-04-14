let amenitiesClicked
$(function () {
  const amenitiesNames = [];
  const amenitiesDict = {};
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
      amenitiesClicked = amenitiesDict;
    }
  });
});



// const url_api_call = "http://127.0.0.1:5001/api/v1/status/";
//   $.get(url_api_call, function (response) {
//     if (response.status === 'ok') {
//       $.post(('DIV#api_status').addClass('available'));
//     } else {
//       $('DIV#api_status').removeClass('available');
//     }
//   });
$.ajax({
  url: "http://127.0.0.1:5001/api/v1/status/",
  type: 'get',
  contentType: 'application/json',
  data: '{}'
}).done(function (response) {
  console.log(response)
  if (response.status === 'OK') {
    $('#api_status').removeAttr("background-color")
    $('#api_status').addClass('available')
    console.log("I made it passed the if")
  }
})


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
  }
});
$(document).ready(function() {
  $('#buttonTag').click(function (){
    console.log("I got clicked")
    $('.places > article').remove();
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenitiesClicked)}),
    }).done(function (data) {
      console.log(data);
      for (const element of data) {
        console.log(element);
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
      }
    })})});
