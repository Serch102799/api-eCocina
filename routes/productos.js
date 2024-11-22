const express = require('express');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_producto:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   categoria_id:
 *                     type: integer
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Producto');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 categoria_id:
 *                   type: integer
 */
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, categoria_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Producto (nombre, descripcion, precio, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, precio, categoria_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 categoria_id:
 *                   type: integer
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Producto WHERE id_producto = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 categoria_id:
 *                   type: integer
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Producto SET nombre = $1, descripcion = $2, precio = $3, categoria_id = $4 WHERE id_producto = $5 RETURNING *',
      [nombre, descripcion, precio, categoria_id, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 precio:
 *                   type: number
 *                 categoria_id:
 *                   type: integer
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM Producto WHERE id_producto = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

module.exports = router;
