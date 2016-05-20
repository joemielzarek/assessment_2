$(document).ready(function(){
  getAnimal();
  $('#submit').on('click', postAnimal);

});

///-----------------------------------------

function animalPostResponse(res) {
  if (res == 'Created') {
    $.get('/animals', getAnimal);
    console.log('animal recieved!');
  } else {
    console.log('animal rejected!!', res);
  }
}

///----------- AJAX FUNCTIONS --------------

function postAnimal(event) {
  event.preventDefault();

  var animal = {};

  $.each($('#animal-form').serializeArray(), function (i, field) {
    animal[field.name] = field.value;
  });

  $('#animal-form').children().val('');
  $.post('/animals', animal, animalPostResponse);
}

function getAnimal(animals) {
  $.ajax({
  type: 'GET',
  url: '/animals',
  success: function(animals) {
  $('#animal-table').empty();
  $('#animal-table').append('<tr>' +
         '<th>' + 'Animal' + '</th>' +
         '<th>' + 'Quantity' + '</th>' +
         '</tr>');

  animals.forEach(function(row) {
    var $el = $('<tr>' +
         '<td>' + row.name + '</td>' +
         '<td>' + row.quantity + '</td>' +
       '</tr>');
       $el.data('animalId', row.id);
    $('#animal-table').append($el);
  });
}
  });
}
