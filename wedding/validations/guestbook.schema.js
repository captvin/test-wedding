const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {

    name: Joi.string(),
    address: Joi.string(),
    phone: Joi.string(),
    note: Joi.string(),
   
    
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateBookSchema: ValidateSchema(UpdateSchema),
    CreateBookSchema: ValidateSchema(CreateSchema),
}