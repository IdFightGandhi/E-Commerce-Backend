const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req,res) => {
  try{
    const categoryData = await Category.finsAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  

router.get('/:id', async (req, res) => {
// find one category by its `id` value
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          atrributes: ['id','product_name','price','stock','category_id'],
        },
      ],
    });
    
    //returns 404 when item not found

    res.status(200).json(categoryData);
    if(!categoryData) {
      res.status(404).json({message: 'Item not found!'})
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create({
      ...req.body
    });
    res.status(200).json(newCategory);
  }catch (err) {
    res.status(400).json(err);
    
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if(!categoryData[0]){
      res.status(404).json({ message: 'Category not found!'});
      return;
    }
    res.status(200).json(catData);

  }catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
