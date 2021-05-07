const express = require('express');
const router = express.Router();
const {
  userValidationRules,
  validate,
  userValidationPutRules
} = require('./middlewares/userValidation');
const handler = require('./../handlers/users');
const isAdmin = require('../controllers/middlewares/roleId');
const app = express();
const key = require('../utils/key')
const sendWelcomEmail = require('../utils/welcomEmail')
app.set('key', key.key);

const wasUpdated = (result, req, res) => {
  result[0] === 1 ? res.json({
    ok: true,
    msj: 'user updated successfully'
  }) : res.status(400).json({
    ok: false,
    msj: 'failed to update user'
  });
};

router.post('/auth/register', userValidationRules(), validate, async (req, res, next) => {
  try {
    const user = req.body;
    const result = await handler.createUser(user);
    sendWelcomEmail(data.email, data.firstName)
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      ok: false,
      msj: 'failed to create user'
    });
  }
});

router.put('/:id', userValidationPutRules(), validate, async (req, res, next) => {
  try {
    const user = req.body;
    const id = req.params.id;
    const result = await handler.updateUser(id, user);
    wasUpdated(result, req, res);
  } catch (e) {
    res.status(400).json({
      ok: false,
      msj: 'failed to update user'
    });
  }
});

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const results = await handler.getAllUsers();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error getting users');
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await handler.getUserById(id);

    if (!user) {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message});
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    let user = await handler.getUserById(id);

    if (!user) {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await handler.deleteUser(id);

    console.log('User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
