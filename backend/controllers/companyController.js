const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (company) {
            res.json(company);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new company
// @route   POST /api/companies
// @access  Public
const createCompany = async (req, res) => {
    const {
        name,
        eligibilityStatus,
        eligibilityNotes,
        resumeUploaded,
        topicsToRevise,
        jobDescription,
        selectionStatus,
        rounds
    } = req.body;

    // Debug: log request body
    console.log("Create Company Request Body:", req.body);

    if (!name) {
        return res.status(400).json({ message: 'Company name is required' });
    }

    try {
        const companyExists = await Company.findOne({ name });
        if (companyExists) {
            return res.status(400).json({ message: 'Company with this name already exists' });
        }

        const company = new Company({
            name,
            eligibility: {
                status: eligibilityStatus,
                notes: eligibilityNotes,
            },
            resumeUploaded,
            topicsToRevise: Array.isArray(topicsToRevise) ? topicsToRevise : [],
            jobDescription,
            selectionStatus: {
                status: selectionStatus,
                rounds: rounds || []
            }
        });

        const createdCompany = await company.save();
        res.status(201).json(createdCompany);
    } catch (error) {
        console.error("Error in createCompany:", error); // show detailed error in console
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Public
const updateCompany = async (req, res) => {
    const {
        name,
        eligibilityStatus,
        eligibilityNotes,
        resumeUploaded,
        topicsToRevise,
        jobDescription,
        selectionStatus,
        rounds
    } = req.body;

    try {
        const company = await Company.findById(req.params.id);

        if (company) {
            company.name = name || company.name;
            company.eligibility.status = eligibilityStatus || company.eligibility.status;
            company.eligibility.notes = eligibilityNotes !== undefined ? eligibilityNotes : company.eligibility.notes;
            company.resumeUploaded = resumeUploaded !== undefined ? resumeUploaded : company.resumeUploaded;
            company.topicsToRevise = Array.isArray(topicsToRevise) ? topicsToRevise : company.topicsToRevise;
            company.jobDescription = jobDescription !== undefined ? jobDescription : company.jobDescription;

            if (selectionStatus !== undefined) {
                company.selectionStatus.status = selectionStatus;
            }
            if (rounds !== undefined) {
                company.selectionStatus.rounds = rounds;
            }

            const updatedCompany = await company.save();
            res.json(updatedCompany);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        console.error("Error in updateCompany:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Public
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (company) {
            res.json({ message: 'Company removed' });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
};
