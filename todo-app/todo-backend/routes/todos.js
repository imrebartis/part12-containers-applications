const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

const incrementCounter = async () => {
  const todoCounter = (await getAsync('counter')) || 0;
  const newCounter = parseInt(todoCounter) + 1;
  await setAsync('counter', newCounter);
  return newCounter;
};

const decrementCounter = async () => {
  const todoCounter = (await getAsync('counter')) || 0;
  const newCounter = Math.max(0, parseInt(todoCounter) - 1);
  await setAsync('counter', newCounter);
  return newCounter;
};

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  await incrementCounter();
  res.send(todo);
});

router.get('/statistics', async (_, res) => {
  const todoCounter = await getAsync('counter');
  res.send({
    'added_todos': parseInt(todoCounter) || 0
  });
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  await decrementCounter();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    Object.assign(req.todo, req.body);
    await req.todo.save();
    res.send(req.todo);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
