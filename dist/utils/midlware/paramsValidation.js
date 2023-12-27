"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require('yup');
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        }, { strict: true });
        return next();
    }
    catch (error) {
        return res.status(400).json({ type: error.name, message: error.message });
    }
};
exports.default = validate;
