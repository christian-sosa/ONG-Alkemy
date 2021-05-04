// Requires
const db = require("../models");
const path = require('path');

const Category = db.categories;
const Op = db.Sequelize.Op;

module.exports = {


  create: (req, res) => {
  
    const category = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image ? req.body.image : 'default-image.png',
      timestamps: Date.now(),
    };
    
    const extensionsAvailable = ['png', 'jpg', 'jpeg' ]
    const ext = path.extname(category.image||'').split('.');
    if ( extensionsAvailable.indexOf( ext[ext.length - 1] ) < 0 ) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid url',
        errors: { message: 'You must select a url with extension: ' + extensionsAvailable.join(', ' ) }
      })
    }
    
    Category.create(category)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Category."
        });
      });
  },
  
  findAll: (req, res) => {
  
    Category.findAll({paranoid: false})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
  },
  
  findOne: (req, res) => {
    const id = req.params.id;
  
    Category.findByPk(id, )
      .then(data => {
        if ( data === null ) {
          res.status(404).send({
            message: `Cannot find Category with id = ${id}`
          })
          return;
        }
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving Category with id = " + id
        });
      });
  },
  
  update: (req, res) => {
    const id = req.params.id;
    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id = ${id}. Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id = " + id
        });
      });
  },
  
  delete: (req, res) => {
    const id = req.params.id;
  
    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Category with id = ${id}. Category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id = " + id
        });
      });
  }
}

