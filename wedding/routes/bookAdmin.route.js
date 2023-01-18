const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/bookAdmin.controller')
const { UpdateBookSchema, CreateBookSchema } = require('@validations/guestbook.schema')

const { LoggerMiddleware } = new LogRequest('BOOK_ADMIN_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard)
    .post('/', CreateBookSchema, create)
    .patch('/:id', UpdateBookSchema, update)
    .get('/', findAll)
    .get('/:id', findById)
    .delete('/:id', remove)

module.exports = { Router, route: '/bookAdmin' }