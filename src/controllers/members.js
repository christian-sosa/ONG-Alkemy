const handler = require('../handlers/members');
const logger = require('../utils/pinoLogger');
const expressRouter = require('express').Router();
const roleIdMiddleware = require('./middlewares/auth');
const { isValidImage, checkImage, checkName } = require('./middlewares/common');
const { memberValidationRules, validate } = require('./middlewares/members');


expressRouter.post('/', memberValidationRules(), validate, isValidImage, async (req, res, next) => {
    try {
        const member = {
            name: req.body.name.trim(),
            image: req.body.image
        }
        const result = await handler.createMember(member);
        res.status(200).json({
            member: result
        });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: 'failed to create member' });
    }
});

// get all members
expressRouter.get('/', roleIdMiddleware, async (req, res, next) => {
    try {
        const members = await handler.getAllMembers();
        res.status(200).json(members);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// get one member by id
const findOne = async (req, res) => {
    const id = req.params.id;
    try {
        let member = await Member.findByPk(id)
        res.json({
            ok: true,
            member
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            msj: `failed to get member with id ${id}`
        })
    }
}

// update a member by id
const update = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400).json({
            ok: false,
            msj: 'invalid id'
        })
        return false
    }
    const isValidName = await memberMiddleware.checkName(req, res)
    let isValidImage = false
    if (req.body.image !== undefined) {
        isValidImage = await memberMiddleware.checkImage(req, res)
    } else {
        isValidImage = true
    }
    if (isValidImage && isValidName) {
        try {
            await Member.update(req.body, {
                where: {
                    id
                }
            });
            res.json({
                ok: true,
                msj: 'member updated successfully'
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                msj: 'failed to update member'
            })
        }
    }
}

// delete a member by id
const destroy = async (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        return res.status(400).json({
            ok: false,
            msj: 'invalid id'
        })
    }
    try {
        await Member.destroy({
            where: {
                id
            }
        });
        return res.json({
            ok: true,
            msj: 'member deleted successfully'
        })
    } catch (e) {
        return res.status(400).json({
            ok: false,
            msj: 'failed to delete member'
        })
    }
}

module.exports = expressRouter;