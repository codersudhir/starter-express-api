const express = require('express');
const router = express.Router();
const { Task, List } = require('../models');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { title, listId } = req.body;

  try {
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    const newTask = await Task.create({ title, ListId: listId });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update task title by task id
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title } = req.body;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete task by task id
router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
