const expressRouter = require('express').Router();
const handler = require('../handlers/organizations');
const handlerSlides = require('./../handlers/slides');
const logger = require('../utils/pinoLogger');
const allowAdmins = require('./middlewares/auth');
const { orgValidationRules, validate } = require('./middlewares/organizations');

expressRouter.post('/', allowAdmins, orgValidationRules(), validate, async (req, res, next) => {
  try {
    const organizationToCreate = req.body;
    const result = await handler.createOrganization(organizationToCreate);
    logger.info({ id: result.id }, 'Organization created successfully')
    res.status(201).json({
      id: result.id,
      message: 'Organization created successfully'
    })
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message })
  }
});

expressRouter.get('/', allowAdmins, async (req, res, next) => {
  try {
    const results = await handler.getAllOrganizations();
    res.status(200).json(results);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

expressRouter.get('/public/:id', allowAdmins, async (req, res, next) => {
  try {
    const { id } = req.params;
    const organization = await handler.getOrganizationById(id);
    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({ message: 'Organization not found' });
    }
    const slides = await handlerSlides.getSlidesByOrgId(id);

    if (!organization.socialMediaId) {
      res.status(200).json({ organization, slides });
      return;
    }
    
    const socialMedia = await handler.getOneSocialMedia(organization.dataValues.socialMediaId);
    res.status(200).json({
      organization,
      slides,
      socialMedia
    });

  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

expressRouter.put('/public/:id', allowAdmins, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateValues = req.body;
      const socialmedia = {
        facebook: updateValues.facebook,
        instagram: updateValues.instagram,
        linkedin: updateValues.linkedin,
      }
    let organization = await handler.getOrganizationById(id);
    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    
    if ( !socialmedia ) {
      await handler.updateOrganization(id, updateValues);
      res.status(200).json({ message: 'Organization updated successfully'});
      return;
    } else {
      await handler.updateOrganization(id, updateValues);
      const socialMedia = await handler.putSocialMedia(socialmedia, organization.dataValues.socialMediaId);
      res.status(200).json({ message: 'Organization updated successfully', socialmedia: socialmedia });
    }

  } catch (error) {
    console.log(error)
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

expressRouter.delete('/:id', allowAdmins, async (req, res, next) => {
  try {
    const { id } = req.params;

    let organization = await handler.getOrganizationById(id);

    if (!organization) {
      logger.warn('Organization not found');
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    await handler.deleteOrganization(id);

    logger.info('Organization deleted successfully');
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
})

expressRouter.post('/:id', allowAdmins, async (req, res, next) => {
  try {
    const { id } = req.params;

    const organizationDeleted = await handler.retoreOrganization(id);
    console.log(organizationDeleted);
    logger.info('Organization restored successfully')
    res.status(200).json({ message: 'Organization restored successfully' })
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
})

module.exports = expressRouter;