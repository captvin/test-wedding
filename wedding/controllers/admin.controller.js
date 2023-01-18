const { user } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')
const { hashPass } = require('@utils/hashPass')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', user)) {
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
    const result = await user.findAndCountAll(options);
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', user)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await user.findByPk(id)
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', user)) {
        return next(Forbidden())
    }
    const { body } = req
    body.password = await hashPass(body.password)
    body.role = 'admin'
    const username = req.body.username
    const already =await user.findOne({where: {username}})
    if (already) {
        return res.send({message: "Username already to use"})
    }
    else{
        const result = await user.create(body)
        res.send(result)
    }
    
    
} 

async function update(req, res, next) {
    if (req.user.abilities.cannot('update',user)) {
        return next(Forbidden())
    }

        const { id } = req.params
        const { body } = req
        const username = req.body.username
        const already =await user.findOne({where:{[Op.and]: [{username:{[Op.like]:username}},{id:{[Op.ne]:id}}]} })
        if (already) {
            return res.send({message: "Username already to use"})
        }
        else{
            const result = await user.update(body, { where: { id } })
            result[0]
            ? res.json({ message: 'Successfully updated' })
            : next(NotFound())
        }
       
}


async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', user)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await user.destroy({ where: { id } })
    result === 1
        ? res.json({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
}