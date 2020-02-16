/***********************************************************************
 *	Autor: Mario Adrián Martínez Fernández
 *		   mario.martinez.f@hotmail.es
 *	Fecha: 15/02/2020
 *	Nota: Funcion para obtner el detalle de un registro
 ***********************************************************************/
function LoadDetail(id) {
  $.ajax({
    url: '/api/tickets/'+id,
    type: 'GET',
    success: function(result) {
      console.log(result);
      let data = result.data[0];
      $('#id_').val(data.id);
      $('#name').val(data.name);
      $('#description').val(data.description);
    }
  });
}
/***********************************************************************
 *	Autor: Mario Adrián Martínez Fernández
 *		   mario.martinez.f@hotmail.es
 *	Fecha: 15/02/2020
 *	Nota: Funcion para enviar la actualizacion de un registro
 ***********************************************************************/
function UpdateCreate() {
  var datos = new FormData();
  if($('#name').val() === ''){
    alert('El nombre no puede ser vacio');
    return false;
  }
  if($('#description').val() === ''){
    alert('La descripcion no puede ser vacio');
    return false;
  }
  datos.append('name',$('#name').val());
  datos.append('description',$('#description').val());
  let id = $('#id_').val(),
      type = 'PUT',
      text = 'actualizado';
  if(id === ''){
    type = 'POST';
    text = 'creado';
  }
  var config = {
    url: '/api/tickets/'+id,
    type: type,
    cache: false,
    contentType:false,
    processData: false,
    data: datos,
    success: function(response) {
      alert('El ticket se ha '+text+' correctamente');
      Empty();
      location.reload();
    },
    error: function (response) {
      alert('El ticket no se ha creado correctamente, por favor vuelve a intentarlo');
    }
  };
  $.ajax(config);
}
/***********************************************************************
 *	Autor: Mario Adrián Martínez Fernández
 *		   mario.martinez.f@hotmail.es
 *	Fecha: 15/02/2020
 *	Nota: Funcion para eliminar un ticket
 ***********************************************************************/
function Delete(id) {
  $.ajax({
    url: '/api/tickets/'+id,
    type: 'DELETE',
    success: function(result) {
      alert('El registro se ha eliminado correctamente');
      location.reload();
    }
  });
}
/***********************************************************************
 *	Autor: Mario Adrián Martínez Fernández
 *		   mario.martinez.f@hotmail.es
 *	Fecha: 15/02/2020
 *	Nota: Funcion para limpiar fomulario
 ***********************************************************************/
function Empty() {
  $('#name').val('');
  $('#description').val('');
  $('#id_').val('');
}
