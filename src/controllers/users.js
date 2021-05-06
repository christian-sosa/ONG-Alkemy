const express = require('express');
const router = express.Router();
const {
    userValidationRules,
    validate,
    userValidationPutRules
} = require('./middlewares/userValidation')
const handler = require('./../handlers/users');

const wasUpdated = (result, req , res) => {
    result[0] === 1 ? res.json({
        ok: true,
        msj: 'user updated successfully'
    }) : res.status(400).json({
        ok: false,
        msj: 'failed to update user'
    });
}

router.post('/auth/register', userValidationRules(), validate, async (req, res, next) => {
    try {
        const user = req.body;
        const result = await handler.createUser(user);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({
            ok: false,
            msj: 'failed to create user'
        });
    }
})

router.put('/:id', userValidationPutRules(), validate, async (req, res, next) => {
    try {
        const user = req.body;
        const id = req.params.id;
        const result = await handler.updateUser(id, user);
        wasUpdated(result, req , res);
    } catch (e) {
        res.status(400).json({
            ok: false,
            msj: 'failed to update user'
        });
    }
})

module.exports = router;
