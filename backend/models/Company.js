const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  eligibility: String,
  resumeRequired: String,
  topicsToRevise: String,
  jobDescription: String,
  selectionStatus: String,
  interviewExperience: String,
});

module.exports = mongoose.model('Company', companySchema);
