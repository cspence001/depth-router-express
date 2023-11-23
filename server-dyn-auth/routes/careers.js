const express = require('express');

const { getAll, get } = require('../data/career.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const careers = await getAll();
    res.json(careers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  let { id } = req.params;
  try {
    const career = await get(id);
    console.log(career)
    res.json(career);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
