var express = require('express');
var router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
const { userValidationRules, validate } = require('../utils/userValidation')
const  { User }  = require('../models/index')
const bcrypt = require('bcryptjs');


=======
>>>>>>> fefe826 (Clean repository backbone)
=======
>>>>>>> 95ff28c (removed comments, added deleted files, changed config/config file)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

<<<<<<< HEAD
<<<<<<< HEAD
router.post('/auth/register',userValidationRules(),validate,async (req, res, next) =>{
  const newUser = req.body
  const data = await User.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: bcrypt.hashSync(newUser.password, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    res.json(data)
})

module.exports = router;

=======
module.exports = router;
>>>>>>> fefe826 (Clean repository backbone)
=======
module.exports = router;
>>>>>>> 95ff28c (removed comments, added deleted files, changed config/config file)
