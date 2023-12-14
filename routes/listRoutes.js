const express = require('express');
const router = express.Router();
const { List } = require('../models');

// Get all lists
router.get('/', async (req, res) => {
  try {
    const lists = await List.findAll();
    res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new list
router.post('/', async (req, res) => {
  const { title } = req.body;
console.log("title",title);
  try {
    const newList = await List.create({ title });
    res.status(201).json(newList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update list title by list id
router.put('/:id', async (req, res) => {
  const listId = req.params.id;
  const { title } = req.body;

  try {
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    list.title = title;
    await list.save();

    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete list by list id
router.delete('/:id', async (req, res) => {
  const listId = req.params.id;

  try {
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    await list.destroy();

    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
