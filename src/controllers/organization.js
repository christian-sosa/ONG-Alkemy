const { Organization } = require('../models/index');

const findAll = async (req, res, next) => {
  try {
    let organizations = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address']
    });
    res.status(200).json(organizations)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: 'Something goes wrong'})
  }
};

const findOne = async (req, res, next) => {
  try {
    let { id } = req.params;
    let organization = await Organization.findOne({
      where: { id },
      attributes: ['name', 'image', 'phone', 'address']
    });
    
    (organization)
      ? res.status(200).json(organization)
      : res.status(404).json({ message: 'Organization not found'})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  findAll,
  findOne,
}