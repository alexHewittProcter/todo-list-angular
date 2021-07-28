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

// Contract
// id:string - todo id
// status:"open"|"done" - new status of todo
router.put('/todo/status', async (req, res) => {
  const { id, status } = req.body;

  if (!!id || !!status) {
    await models.todos.update({ status }, { where: { id } });
    const todo = await models.todos.findOne({ where: { id } });

    res.json({ todo }).end();
  } else {
    res.status(400).end();
  }
});

router.put('/todo', async (req, res) => {
  const { todo, id } = req.body;
  const oldTodo = await models.todos.findOne({ where: { id } });

  if (!oldTodo) {
    res.status(404).end();
  } else {
    await models.todos.update({ ...oldTodo, ...todo }, { where: { id } });
    const updatedTodo = await models.todos.findOne({
      where: { id },
    });
    res.json({ todo: updatedTodo });
  }
});

router.delete('/todo', async (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    res.status(422).end();
  } else {
    const deletedTodo = await models.todos.destroy({ where: { id } });
    if (deletedTodo === 0) {
      res.status(404).end();
    } else {
      res.json({ id });
    }
  }
});

module.exports = router;
