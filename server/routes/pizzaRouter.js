const Router = require('express')
const router = new Router()
const pizzaController = require('../controllers/pizzaController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

router.post('/', checkRole('ADMIN'), pizzaController.create)
router.get('/', pizzaController.getAll)
router.get('/:id', pizzaController.getOne)
router.delete('/:id', checkRole('ADMIN'), pizzaController.delete)

module.exports = router