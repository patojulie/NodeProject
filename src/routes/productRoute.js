const actionProduct = require('../controllers/productController');
const Router = require('express');
const router = Router();

router.post('/',actionProduct.addProduct);
router.get('/',actionProduct.getAllProduct);
// router.get('/:id',actionProduct.getProductById);
router.put('/:id',actionProduct.updateProduct);
router.put('/:id',actionProduct.deleteProduct);
router.post('/bulk',actionProduct.insertManyProducts);
router.get('/user-product',actionProduct.getAllProductByUserId);


module.exports = router