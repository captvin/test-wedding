const Router = require('express').Router()
const LogRequest = require('@middlewares/log-request')

const { create, findAll, findById } = require('@controllers/guestbook.controller')
const { CreateBookSchema } = require('@validations/guestbook.schema')

const { LoggerMiddleware } = new LogRequest('GUESTBOOK_ROUTE')

Router
    .use(LoggerMiddleware)
    .post('/', CreateBookSchema, create)
    .get('/', findAll)
    .get('/:id', findById)


module.exports = { Router, route: '/guestbook' }