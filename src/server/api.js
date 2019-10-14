const router = require('express').Router()
const { Cat, Toy, ToyLikeness } = require('./db')
const Op = require('sequelize').Op

/*
 * YOU DONT EDIT THESE FILES
*/

// THESE ARE MOUNTED ON /api YO

// so that means if a user requests /api/cats, let's get them cats
//                       from the top ^    ^ from this handler
router.get('/cats', async (req, res, next) => {
  try {
    // ask the db for all cats and wait for it
    const cats = await Cat.findAll()
    // then just send w/e we got
    res.json(cats)
  } catch (err) { next(err) }
})

router.get('/cats/:catId', async (req, res, next) => {
  try {
    // ask the db for one cat (by its id)
    const cat = await Cat.findByPk(req.params.catId, {
      include: [
        // I can just pass the string here since I don't have a model named friends
        'friends',
        // so this is a way to do a confusing includes
        // essentially, I want all the toys with their toy rating
        // but I also don't want lowly rated toys
        {
          model: Toy,
          as: 'toyRatings',
          // BUT, I only want the ones with rating >= 3
          through: {
            where: {
              rating: {
                [Op.gte]: 3
              }
            }
          }
        }
      ]
    })
    if (cat) { // if we found the cat
      res.json(cat) // let's send it to them
    } else { // if we didn't find the cat
      res.status(404).send('No cat here') // set the status to 404 and custom msg
    }

  } catch (err) { next(err) }
})


// the following routes aren't used but are left for documentation on routes
router.post('/cats/', async (req, res, next) => {
  try {
    const data = req.body // grab the data sent to us
    const cat = await Cat.create(data) // and just send it to the db
    res.status(201).json(cat) // remember to set 201 cause we just created something
  } catch (err) { next(err) }
})

router.put('/cats/:catId', async (req, res, next) => {
  try {
    const data = req.body; // grab the data sent to us
    const cat = await Cat.findById(req.params.catId) // FIND DA CAT
    if (cat) { // do we have a cat?
      // NOTE: lowercase cat. this is an instance update method. I don't need a where
      // it already knows I want to update this specific instance of cat
      const updatedCat = await cat.update(data)
      res.json(updatedCat)
    } else { // no cat found
      res.status(404).send('No cat here') // set the status to 404 and custom msg
    }
  } catch (err) { next(err) }
})


module.exports = router;
