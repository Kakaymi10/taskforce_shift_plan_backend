const { Company } = require('../../models/index');
const DataAccesManagement = require('../utils/dataAccessManagement');
const findUserByToken = require('../utils/findUserByToken');

class CompanyController {
  static async getCompany(req, res) {
    // #swagger.tags = ['Company']

    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);
  
      const companies = await Company.findAll();
      const data = DataAccesManagement.companyAccessManager(loggedInUser, companies);

      return res.status(200).send({ message: 'Companies fetched successfully!', companies: data });
    }catch(err) {
      return res.status(500).send({ message: 'Failed to fetch companies', error: err });
    }
   
  }

  static async updateCompany(req, res) {
     // #swagger.tags = ['Company']
    try {
      const { id } = req.params;
      const { name, address } = req.body;

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const company = await Company.findOne({
        where: {
          id,
        },
      });

      const data = DataAccesManagement.companyAccessManager(loggedInUser, [company.dataValues])

      if(data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      const updatedCompany = await Company.update(
        { name, address },
        { where: { id }, returning: true, plain: true },
      );

      return res
        .status(200)
        .send({ message: 'Company is updated', company: updatedCompany[1] });
    } catch (error) {
      return res.status(500).send({ message: 'Error updating company', error });
    }
  }

  static async deleteCompany(req, res) {
     // #swagger.tags = ['Company']
    try {
      const { id } = req.params;
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const company = await Company.findOne({
        where: {
          id,
        },
      });

      const data = DataAccesManagement.companyAccessManager(loggedInUser, [company.dataValues])

      if(data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      await Company.destroy({ where: { id } });
      return res
        .status(200)
        .send({ message: 'Company is deleted', companyId: id });
    } catch (error) {
      return res.status(500).send({ message: 'Error deleting company', error });
    }
  }

  static async getAllCompanies(req, res) {
     // #swagger.tags = ['Company']
    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const companies = await Company.findAll();

     const data = DataAccesManagement.companyAccessManager(loggedInUser, companies);

      return res.status(200).send({ message: 'Companies fetched successfully', companies: data });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error fetching companies', error });
    }
  }

  static async getCompanyById(req, res) {
     // #swagger.tags = ['Company']
    try {
      const { id } = req.params;

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const company = await Company.findOne({
        where: {
          id,
        },
      });

      const data = DataAccesManagement.companyAccessManager(loggedInUser, [company.dataValues])

      if(data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      return res.status(200).send({ message: 'Company fetched successfully', company });
    } catch (error) {
      return res.status(500).send({ message: 'Error fetching company', error });
    }
  }


  static async updateCompanyStatus(req, res) {
     // #swagger.tags = ['Company']
    try {
      const { id } = req.query;
      const { status } = req.body;

      const company = await Company.findOne({
        where: {
          id,
        },
      });

      if (!company) {
        return res.status(404).send({ message: 'Company not found' });
      }

      if (status !== 'Approved' && status !== 'Rejected') {
        return res.status(400).send({ message: 'Invalid status' });
      }

      const updatedCompany = await company.update({
        status,
      });

      return res
        .status(200)
        .send({
          message: 'Company status is updated',
          company: updatedCompany,
        });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error updating company', error });
    }
  }
}

module.exports = CompanyController;
