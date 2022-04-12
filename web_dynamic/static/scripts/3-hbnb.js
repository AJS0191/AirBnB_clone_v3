$(function () {
  const amenitiesNames = [];
  const amenitiesDict = {};
  const url = "http://0.0.0.0:5001/api/v1/places_search/";
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

let request = $.ajax({
	url: "http://b41de8df0b4c.19.hbtn-cod.io:34196/api/v1/places_search/",
	method: "POST",
	data: JSON.stringify({}),
	contentType: "application/json",
	dataType: "json"
    })

	.done(function (data) {
	    data.forEach(function (element) {
                $('.places').append('<li><a href="' + element.id + '">' + element.name + '</a></li>');
      });
    })
    .fail(function (_jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });



