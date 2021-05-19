const repository = require("../services/repositories/newreport");
const path = require('path');
const pagination = require('../utils/pagination');

const getAllNewReports = async (paginationInfo) => {
  const result = await repository.getAll(paginationInfo);
  const route = '/news?page=';
  const count = result.count;
  const paginationData = await pagination.getPaginationData(paginationInfo, route, count);
  return {paginationData, result};
};

//For testing
const getAllNewReports2 = async () => await repository.getAll();

const getNewReportById = async (newReportId) => await repository.getOne(newReportId);

const updateNewReport = async (id, properties) => await repository.update(id, properties);

const deleteNewReport = async (id) => await repository.destroy(id);

const createNewReport = async (newreport) => {
  newreport.type = 'news'
  newreport.timestamps = Date.now()
  const extensionsAvailable = ["png", "jpg", "jpeg"];
  const ext = path.extname(newreport.image || "").split(".");
  if (extensionsAvailable.indexOf(ext[ext.length - 1]) < 0) {
    return res.status(400).json({
      ok: false,
      message: "Invalid url",
      errors: {
        message: "You must select a url with extension: " +
          extensionsAvailable.join(", "),
      },
    });
  }
  const result = await repository.persist(newreport);
  return result;
};


module.exports = {
  getAllNewReports,
  getAllNewReports2,
  getNewReportById,
  updateNewReport,
  deleteNewReport,
  createNewReport
};
