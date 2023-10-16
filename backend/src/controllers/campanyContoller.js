const errors = require('eslint-plugin-import/config/errors');
const { Company}  = require('../../models/index');


class CompanyController {
        static async getCompany(req, res){
        const companies = await Company.findAll()
        return res.status(200).send({ message:'Companies List' , companies: companies });
    }

    static async createCompany(req, res) {
        try {
            const { name, address, isApproved } = req.body;
            const company = await Company.create({
                name,
                address,
                isApproved
            });
          return res.status(201).send({ message: 'Company is created', company });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error creating company', error });
        }
    }


    static async updateCompany(req, res) {
        try {
            const { id } = req.params;
            const { name, address, isApproved } = req.body;

            const updatedCompany = await Company.update(
                { name, address, isApproved },
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
}

module.exports = CompanyController;
