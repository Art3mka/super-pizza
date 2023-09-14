const uuid = require('uuid');
const path = require('path');
const { Pizza, PizzaInfo } = require('../models/models.js');
const ApiError = require('../error/ApiError.js')

class pizzaController {
    async create(req, res, next) {
        try {
            const { name, price, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const pizza = await Pizza.create({ name, price, img: fileName })

            if(info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    PizzaInfo.create({
                        title: i.title,
                        description: i.description,
                        pizzaId: pizza.id,
                    })
                });
            }

            return res.json(pizza)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        const pizzas = await Pizza.findAll()
        return res.json(pizzas)
    }

    async getOne(req, res) {
        const {id} = req.params
        const pizza = await Pizza.findOne(
            {
                where: {id},
                include: [{model: PizzaInfo, as: 'info'}]
            }
        )
        return res.json(pizza)
    }

    async delete(req, res) {
        const {id} = req.params
        const pizza = await Pizza.destroy(
            {
                where: {id},
                include: [{model: PizzaInfo, as: 'info'}]
            }
        )
        return res.json({message: `Пицца номер ${id} удалена`})
    }
}

module.exports = new pizzaController()