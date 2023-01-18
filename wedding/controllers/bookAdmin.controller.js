const { guestbook } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op} = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', guestbook)) {
        return next(Forbidden())
    }
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

    const result = await guestbook.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', guestbook)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await guestbook.findByPk(id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', guestbook)) {
        return next(Forbidden())
    }
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

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', guestbook)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const name1 = req.body.name
    const already =await guestbook.findOne({where:{[Op.and]: [{name:{[Op.like]:name1}},{id:{[Op.ne]:id}}]} })
    if (already) {
        return res.send({message: "Name already exists, use other name"})
    }
    else{
        const result = await guestbook.update(body, { where: { id } })
        result[0]
            ? res.json({ message: 'Successfully updated',  })
            : next(NotFound())
    }
    
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', guestbook)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await guestbook.destroy({ where: { id } })
    result === 1
        ? res.json({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}