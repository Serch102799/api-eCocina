const express = require('express');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   contrasena:
 *                     type: string
 *                   rol_id:
 *                     type: integer
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contrasena:
 *                   type: string
 *                 rol_id:
 *                   type: integer
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contrasena:
 *                   type: string
 *                 rol_id:
 *                   type: integer
 */
router.post('/', async (req, res) => {
  const { nombre, email, contrasena, rol_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Usuarios (nombre, email, contrasena, rol_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, contrasena, rol_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
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
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contrasena:
 *                   type: string
 *                 rol_id:
 *                   type: integer
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contrasena, rol_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Usuarios SET nombre = $1, email = $2, contrasena = $3, rol_id = $4 WHERE id_usuario = $5 RETURNING *',
      [nombre, email, contrasena, rol_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     email:
 *                       type: string
 *                     contrasena:
 *                       type: string
 *                     rol_id:
 *                       type: integer
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM Usuarios WHERE id_usuario = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado', usuario: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

module.exports = router;
