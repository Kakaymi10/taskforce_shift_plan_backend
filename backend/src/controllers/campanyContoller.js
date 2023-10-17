const errors = require('eslint-plugin-import/config/errors');
const { Company}  = require('../../models/index');


class CompanyController {
        static async getCompany(req, res){
        const companies = await Company.findAll()
        return res.status(200).send({ message:'Companies List' , companies: companies });
    }

    static async createCompany(req, res) {
      try {
        const { name, address} = req.body; 

    
        const company = await Company.create({
          name,
          address,
        
        });
            return res.status(201).json({ message: 'Company created successfully', company });
      } catch (error) {
        console.error('Error creating company:', error);
        return res.status(500).json({ message: 'Error creating company', error: error.message });
      }
    }
    
    static async updateCompany(req, res) {
        try {
            const { id } = req.params;
            const { name, address} = req.body;

            const updatedCompany = await Company.update(
                { name, address},
                { where: { id }, returning: true, plain: true }
            );

            return res.status(200).send({ message: 'Company is updated', company: updatedCompany[1] });
        } catch (error) {
            return res.status(500).send({ message: 'Error updating company', error });
        }
    }

    static async deleteCompany(req, res) {
        try {
            const { id } = req.params;
            await Company.destroy({ where: { id } });
            return res.status(200).send({ message: 'Company is deleted', companyId: id });
        } catch (error) {
            return res.status(500).send({ message: 'Error deleting company', error });
        }
    }

    static async getAllCompanies(req, res) {
        try {
            const companies = await Company.findAll();
            return res.status(200).send({ companies });
        } catch (error) {
            return res.status(500).send({ message: 'Error fetching companies', error });
        }
    }

    static async getCompanyById(req, res) {
        try {
            const { id } = req.params;
            const company = await Company.findByPk(id);
            return res.status(200).send({ company });
        } catch (error) {
            return res.status(500).send({ message: 'Error fetching company', error });
        }
    }
        static async approveCompany(req, res) {
            try {
              const { id } = req.params;
        
              const company = await Company.findByPk(id);
        
              if (!company) {
                return res.status(404).send({ message: 'Company not found' });
              }
        
              const updatedCompany = await company.update({
                status: 'Approved'
              });
        
              return res.status(200).send({ message: 'Company is approved', company: updatedCompany });
            } catch (error) {
              console.error(error);
              return res.status(500).send({ message: 'Error approving company', error });
            }
          }
        
          static async rejectCompany(req, res) {
            try {
              const { id } = req.params;
        
              const company = await Company.findByPk(id);
        
              if (!company) {
                return res.status(404).send({ message: 'Company not found' });
              }
        
              const updatedCompany = await company.update({
                status: 'Rejected'
              });
        
              return res.status(200).send({ message: 'Company is rejected', company: updatedCompany });
            } catch (error) {
              console.error(error);
              return res.status(500).send({ message: 'Error rejecting company', error });
            }
          }
    }


module.exports = CompanyController;