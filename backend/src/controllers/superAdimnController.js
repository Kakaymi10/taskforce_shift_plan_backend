const { Company } = require('../../models/index');


class SuperAdminController {
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

  static async deleteCompany(req, res) {
    try {
      const { id } = req.params;
      await Company.destroy({ where: { id } });
      return res.status(200).send({ message: 'Company is deleted', companyId: id });
    } catch (error) {
      return res.status(500).send({ message: 'Error deleting company', error });
    }
  }

  static async editCompany(req, res) {
    try {
      const { id } = req.params;
      const { name, address } = req.body;

      const company = await Company.findByPk(id);

      if (!company) {
        return res.status(404).send({ message: 'Company not found' });
      }

      const updatedCompany = await company.update({ name, address });

      return res.status(200).send({ message: 'Company is updated', company: updatedCompany });
    } catch (error) {
      return res.status(500).send({ message: 'Error updating company', error });
    }
  }
}

module.exports = SuperAdminController;
