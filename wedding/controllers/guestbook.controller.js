const { guestbook } = require('@models')
const { NotFound} = require('http-errors')
const { Op} = require('sequelize')

async function findAll(req, res, next) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {}
    }

    const { name } = req.query

    if (name) {
        options.where['name'] = {
            [Op.like]: `%${name}%`
        }
    }

    const result = await guestbook.findAndCountAll({attributes:{exclude:['phone', 'address']}})
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    const { id } = req.params
    const result = await paket.findByPk(id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    const { body } = req
    const name = req.body.name
    const already =await guestbook.findOne({where: {name}})
    if (already) {
        return res.send({message: "Name already exists, use other name"})
    }
    else{
        const result = await guestbook.create(body)
        res.send(result)
    }
    
    
} 

module.exports = {
    findAll,
    findById,
    create,
}