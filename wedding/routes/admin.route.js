const Router = require('express').Router()
const AuthGuard = require('@middlewares/auth-guard')
const LogRequest = require('@middlewares/log-request')

const { findAll, findById, create, update, remove } = require('@controllers/admin.controller')
const { UpdateAdminSchema, CreateAdminSchema  } = require('@validations/admin.schema')

const { LoggerMiddleware } = new LogRequest('ADMIN_ROUTE')

Router
    .use(LoggerMiddleware, AuthGuard )
    .get('/', findAll)
    .get('/:id', findById)
    .post('/', CreateAdminSchema, create)
    .patch('/:id', UpdateAdminSchema, update)
    .delete('/:id', remove)

module.exports = { Router, route: '/admin' }

