const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const { verifyToken, isAdmin, isUser } = require('../middleware/auth');

router.get('/', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de pedidos' */
  /* #swagger.tags = ['Pedidos'] */
  pedidosController.getOrders(req, res);
});

router.get('/:id', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene un pedido por ID' */
  /* #swagger.tags = ['Pedidos'] */
  /* #swagger.parameters['id'] = { description: 'ID del pedido', type: 'integer', required: true } */
  pedidosController.getOrderById(req, res);
});

router.post('/', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Crea un nuevo pedido' */
  /* #swagger.tags = ['Pedidos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Crear nuevo pedido.',
        schema: { $ref: '#/definitions/Pedido' }
    } */
  pedidosController.createOrder(req, res);
});

router.put('/:id', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Actualiza un pedido existente' */
  /* #swagger.tags = ['Pedidos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del pedido', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Actualizar pedido.',
        schema: { $ref: '#/definitions/Pedido' }
    } */
  pedidosController.updateOrder(req, res);
});

router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Elimina un pedido' */
  /* #swagger.tags = ['Pedidos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del pedido', type: 'integer', required: true } */
  pedidosController.deleteOrder(req, res);
});

module.exports = router;
