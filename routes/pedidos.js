const express = require('express');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: API para gestionar pedidos
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de todos los pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_pedido:
 *                     type: integer
 *                   usuario_id:
 *                     type: integer
 *                   estado:
 *                     type: string
 *                   total:
 *                     type: number
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Pedidos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
});

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               estado:
 *                 type: string
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_pedido:
 *                   type: integer
 *                 usuario_id:
 *                   type: integer
 *                 estado:
 *                   type: string
 *                 total:
 *                   type: number
 */
router.post('/', async (req, res) => {
  const { usuario_id, estado, total } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Pedidos (usuario_id, estado, total) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, estado, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Actualizar un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               estado:
 *                 type: string
 *               total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_pedido:
 *                   type: integer
 *                 usuario_id:
 *                   type: integer
 *                 estado:
 *                   type: string
 *                 total:
 *                   type: number
 *       404:
 *         description: Pedido no encontrado
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { usuario_id, estado, total } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Pedidos SET usuario_id = $1, estado = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
      [usuario_id, estado, total, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    res.status(500).json({ message: 'Error al actualizar el pedido' });
  }
});

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pedido:
 *                   type: object
 *                   properties:
 *                     id_pedido:
 *                       type: integer
 *                     usuario_id:
 *                       type: integer
 *                     estado:
 *                       type: string
 *                     total:
 *                       type: number
 *       404:
 *         description: Pedido no encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM Pedidos WHERE id_pedido = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json({ message: 'Pedido eliminado', pedido: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar el pedido:', error);
    res.status(500).json({ message: 'Error al eliminar el pedido' });
  }
});

module.exports = router;
