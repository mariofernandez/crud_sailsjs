/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /***********************************************************************
   *	Autor: Mario Adrián Martínez Fernández
   *		   mario.martinez.f@hotmail.es
   *	Fecha: 15/02/2020
   *	Nota: Funcion para obtener los registros
   ***********************************************************************/
  get:function (req,res) {
    let where = {};
    if(req.param('id')){
      where = {
        'id':req.param('id')
      };
    }
    Ticket.find(where).then(function (tickets) {
      if(!tickets || tickets.length === 0){
        return res.send({
          'success':false,
          'msg': 'No records found'
        });
      }
      return res.send({
        'success':true,
        'msg':'Records fetched',
        'data':tickets
      });
    })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          'success':false,
          'msg': 'Unable to fecth records'
        });
      });
  },
  /***********************************************************************
   *	Autor: Mario Adrián Martínez Fernández
   *		   mario.martinez.f@hotmail.es
   *	Fecha: 15/02/2020
   *	Nota: Funcion para crear un registro nuevo
   ***********************************************************************/
  create:function (req,res) {
    sails.log.debug(req.allParams());
    Ticket.create(req.allParams())
      .then(function (ticket) {
        return res.send({
          'success':true,
          'msg':'Record created successfully'
        });
      })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          'success':false,
          'msg':'Unable to create record'
        });
      });
  },
  /***********************************************************************
   *	Autor: Mario Adrián Martínez Fernández
   *		   mario.martinez.f@hotmail.es
   *	Fecha: 15/02/2020
   *	Nota: Funcion para actualizar los registros
   ***********************************************************************/
  update:function (req,res) {
    sails.log.debug(req.param('id'));
    Ticket.update(req.param('id'),req.allParams())
      .then(function (ticket) {
        return res.send({
          'success':true,
          'msg':'Record Updated',
          'data':ticket
        });
      })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          'success':false,
          'msg':'Record to update record'
        });
      });
  },
  /***********************************************************************
   *	Autor: Mario Adrián Martínez Fernández
   *		   mario.martinez.f@hotmail.es
   *	Fecha: 15/02/2020
   *	Nota: Funcion para eliminar un registro
   ***********************************************************************/
  delete:function (req,res) {
    Ticket.destroy(req.param('id'))
      .then(function (ticket) {
        return res.send({
          'success':true,
          'msg':'Record deleted',
          'data':ticket
        });
      })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          'success':false,
          'msg':'Unable to delete record'
        });
      });
  },
  /***********************************************************************
   *	Autor: Mario Adrián Martínez Fernández
   *		   mario.martinez.f@hotmail.es
   *	Fecha: 15/02/2020
   *	Nota: Funcion para obtener la vista con los sus respectivamos datos
   ***********************************************************************/
  ViewFirst:function (req,res) {
    Ticket.find().then(function (tickets) {
      if(!tickets || tickets.length === 0){
        return res.send({
          'success':false,
          'msg': 'No records found'
        });
      }
      return res.view('pages/tickets', {tickets:tickets});
    })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          'success':false,
          'msg': 'Unable to fecth records'
        });
      });
  }
};

