const express = require('express');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API para gestionar roles
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de todos los roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Roles');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    res.status(500).json({ message: 'Error al obtener los roles' });
  }
});

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a obtener
 *     responses:
 *       200:
 *         description: Información del rol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       404:
 *         description: Rol no encontrado
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Roles WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el rol:', error);
    res.status(500).json({ message: 'Error al obtener el rol' });
  }
});

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
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
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 */
router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Roles (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el rol:', error);
    res.status(500).json({ message: 'Error al crear el rol' });
  }
});

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a actualizar
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
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       404:
 *         description: Rol no encontrado
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Roles SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).json({ message: 'Error al actualizar el rol' });
  }
});

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a eliminar
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       404:
 *         description: Rol no encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM Roles WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    res.status(500).json({ message: 'Error al eliminar el rol' });
  }
});

module.exports = router;
