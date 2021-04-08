const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include:[
        {
          model: Product,
          attributes: ['id', 'product_name', 'price','stock', 'category_id'],
        },
      ],
    })

    //json package returns with category data
    res.status(200).json(categoryData);
    if(!categoryData) {
      res.status(404).json({message: "Not found!"})
    }
    //error catch
  }catch(err) {
    res.status(500).json(err);
  };
  

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

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
