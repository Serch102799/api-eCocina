const express = require('express');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: API para gestionar categorías
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de todas las categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Categorias');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
});

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_categoria:
 *                   type: integer
 *                 nombre:
 *                   type: string
 */
router.post('/', async (req, res) => {
  const { nombre } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Categorias (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
});

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría por ID
 *     tags: [Categorías]
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
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_categoria:
 *                   type: integer
 *                 nombre:
 *                   type: string
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Categorias SET nombre = $1 WHERE id_categoria = $2 RETURNING *',
      [nombre, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ message: 'Error al actualizar la categoría' });
  }
});

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_categoria:
 *                   type: integer
 *                 nombre:
 *                   type: string
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM Categorias WHERE id_categoria = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
});

module.exports = router;
