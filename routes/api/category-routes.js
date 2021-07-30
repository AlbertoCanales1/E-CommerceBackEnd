const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint
  
  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => { //include??
  try { 
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

 // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:_id', async (req, res) => {
 try { 
   const categoryData = await Category.findByPk(req.params.id, { //Help here!
     include: [{ model: Product }]
   });
   if (!categoryData) {
     res.status(404).json({message: 'No category found with this id'});
     return;
   }
   res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
 });

  // create a new category
router.post('/', async (req, res) => {
 try{
   const categoryData = await Category.create(req.body);
   res.status(200).json(categoryData);
 }catch (err) {
   res.status(400).json(err);
 }
 });

// update a category by its `id` value
router.put('/:_id', async (req, res) => {
  Category.update (
    {
      shirts: req.body.shirts,
      shorts: req.body.shorts,
      music: req.body.music,
      hats: req.body.hats,
      shoes: req.body.shoes,
    },
    {
      where: {
        id: req.params.id,
      },
    }
   )
   .then((updatedCategory) => {
     res.json(updatedCategory);
   })
   .catch((err) => {
     console.log(err);
     res.json(err);
   });
});

  // delete a category by its `id` value
router.delete('/:_id', async (req, res) => {
try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
    });
    if(!categoryData) {
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
