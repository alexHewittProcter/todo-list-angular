const { Router } = require('express');
const { Op } = require('sequelize');
const models = require('../../db/models');

const router = Router();

router.get('/docs', (_req, res) =>
  res.sendFile(
    '/Users/AlexProcter/Dropbox/coding/codingProjects/todo-list-angular/api/server/docs/index.html'
  )
);

router.get('/todos', async (req, res) => {
  const { status } = req.query;
  let validParams = true;
  let todos;
  // check status is valid
  if (status && status !== 'open' && status !== 'done') {
    validParams = false;
    res.status(422);
    res.send();
    res.end();
  }
  if (validParams) {
    if (status) {
      todos = await models.todos.findAll({ where: { status } });
    } else {
      todos = await models.todos.findAll();
    }
    res.json({ todos });
  }
});

router.get('/search', async (req, res) => {
  const fields = ['title', 'description'];
  const { query } = req.query;
  const wildcards = query.split(' ').map((v) => `%${v}%`);
  const todos = await models.todos.findAll({
    where: {
      [Op.or]: wildcards.reduce(
        (prev, current) => [
          ...prev,
          ...fields.map((f) => {
            const obj = {};
            obj[f] = { [Op.like]: current };
            return obj;
          }),
        ],
        []
      ),
    },
  });
  res.json({ todos });
});

router.get('/todo', async (req, res) => {
  const { id } = req.query;
  const todo = await models.todos.findOne({ where: { id } });
  if (!todo) {
    res.status(404).end();
  } else {
    res.json({ todo });
  }
});

router.post('/todo', async (req, res) => {
  const { todo } = req.body;
  const newTodo = await models.todos.create(todo);
  res.json({ todo: newTodo });
});

router.put('/todo', async (req, res) => {
  const { todo, id } = req.body;
  const updateTodos = await models.todos.update(todo, { where: { id } });
  if (updateTodos[0] === 0) {
    res.status(404).end();
  } else {
    const updatedTodo = await models.todos.findOne({
      where: { id },
    });
    res.json({ todo: updatedTodo });
  }
});

router.delete('/todo', async (req, res) => {
  const { id } = req.body;
  const deletedTodo = await models.todos.destroy({ where: { id } });
  if (deletedTodo === 0) {
    res.status(404).end();
  } else {
    res.json({ id });
  }
});

module.exports = router;
