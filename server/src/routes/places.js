// Example
// server/src/routes/places.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: API для управления объектами размещения
 */

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Получить все объекты размещения
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает массив объектов размещения
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Уникальный идентификатор объекта размещения
 *                   name:
 *                     type: string
 *                     description: Название объекта размещения
 *                   description:
 *                     type: string
 *                     description: Описание объекта размещения
 *       500:
 *         description: Ошибка сервера
 */
router.get('/api/places', async (req, res) => {
  try {
    // Ваш код для получения объектов размещения из базы данных
    const places = [{ id: '1', name: 'Hotel A', description: 'This is a hotel' }];
    res.status(200).json({ data: places });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/places/{id}:
 *   get:
 *     summary: Получить объект размещения по ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID объекта размещения
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает объект размещения
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Уникальный идентификатор объекта размещения
 *                 name:
 *                   type: string
 *                   description: Название объекта размещения
 *                 description:
 *                   type: string
 *                   description: Описание объекта размещения
 *       404:
 *         description: Объект размещения не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get('/api/places/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const place = { id, name: 'Hotel A', description: 'This is a hotel' };
    if (!place) {
      res.status(404).json({ error: 'Place not found' });
    } else {
      res.status(200).json({ data: place });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
