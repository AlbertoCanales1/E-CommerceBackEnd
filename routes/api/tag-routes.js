const router = require('express').Router();
const { DataTypes } = require('sequelize/types');
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint
// find all tags
  // be sure to include its associated Product data
 router.get('/', async (req, res) => { 
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'product_tag'}]
    })
      res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
})
 
    
 // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
 try{
   const tagData = await Tag.findByPk(req.params.id, {
     include: [{model: Product, through: ProductTag, as: 'product_tag'}]
   });
   if(!tagData) {
     res.status(404).json({message: 'No tag found with this id'})
     return;
   }
   res.status(200).json(tagData);
 }catch (err){
   res.status(500).json(err);
 }
});

  // create a new tag
router.post('/', async (req, res) => {
try{
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
}catch (err){
  res.status(400).json(err);
}
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
Tag.update(
  {
    rock_music: req.body.rock_music,
    pop_music: req.body.pop_music,
    blue: req.body.blue,
    red: req.body.red,
    green: req.body.green,
    white: req.body.white,
    gold: req.body.gold,
    pop_culture: req.body.pop_culture,
  },
  {
    where: {
      id: req.params.id
    },
  }
)
.then((updatedTag) => {
  res.json(updatedTag);
})
.catch((err) => {
  console.log(err);
  res.json(err);
});


 // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
 try{
   const tagData = await Tag.destroy({
     where: {
       id: req.params.id
     }
   });
   if(!tagData){
     res.status(404).json({message: 'no tag found with this id'});
     return;
   }
   res.status(200).json(tagData);
 }catch(err) {
   res.status(500).json(err)
 }
  });
});


module.exports = router;
