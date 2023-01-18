const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {

    name: Joi.string(),
    username: Joi.string(),
    password: Joi.string().min(8).message("Password should contains minimum of 8 characters"),
    // role: Joi.string(),
    email: Joi.string()
    
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateAdminSchema: ValidateSchema(UpdateSchema),
    CreateAdminSchema: ValidateSchema(CreateSchema),
}