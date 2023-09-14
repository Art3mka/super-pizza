const Router = require('express')
const router = new Router()
const pizzaRouter = require('./pizzaRouter.js')
const userRouter = require('./userRouter.js')

router.use('/user', userRouter)
router.use('/pizza', pizzaRouter)

module.exports = router