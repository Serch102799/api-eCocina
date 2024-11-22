const express = require('express');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: DetallePedido
 *   description: API para gestionar los detalles de pedido
 */

/**
 * @swagger
 * /api/detallePedido:
 *   get:
 *     summary: Obtener todos los detalles de pedido
 *     tags: [DetallePedido]
 *     responses:
 *       200:
 *         description: Lista de todos los detalles de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   pedido_id:
 *                     type: integer
 *                   producto_id:
 *                     type: integer
 *                   cantidad:
 *                     type: integer
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM DetallePedido');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los detalles de pedido:', error);
    res.status(500).json({ message: 'Error al obtener los detalles de pedido' });
  }
});

/**
 * @swagger
 * /api/detallePedido:
 *   post:
 *     summary: Crear un nuevo detalle de pedido
 *     tags: [DetallePedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedido_id:
 *                 type: integer
 *               producto_id:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Detalle de pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 pedido_id:
 *                   type: integer
 *                 producto_id:
 *                   type: integer
 *                 cantidad:
 *                   type: integer
 */
router.post('/', async (req, res) => {
  const { pedido_id, producto_id, cantidad } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO DetallePedido (pedido_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *',
      [pedido_id, producto_id, cantidad]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el detalle de pedido:', error);
    res.status(500).json({ message: 'Error al crear el detalle de pedido' });
  }
});

module.exports = router;
