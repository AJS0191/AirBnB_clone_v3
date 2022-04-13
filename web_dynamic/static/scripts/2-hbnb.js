$(function () {
  const amenitiesNames = [];
  const amenitiesDict = {};
  const url = "http://0.0.0.0:5001/api/v1/status/";
  $.get(url, function (data) {
    $('DIV#api_status').toggleClass('available nok');
  });
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
