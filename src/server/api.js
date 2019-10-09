const router = require('express').Router()
const { Cat } = require('./db')

// THESE ARE MOUNTED ON /api YO

router.get('/cats', async (req, res, next) => {
  try {
    const cats = await Cat.findAll()
    res.json(cats)
  } catch (err) { next(err) }
})


module.exports = router;
