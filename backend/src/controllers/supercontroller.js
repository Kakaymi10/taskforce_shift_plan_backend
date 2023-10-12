const { Role } = require('../controllers/supercontroller');

function canViewCompany(user, company) {
  return (
    user.role === Role.SUPER_ADMIN ||
    company.companyId === user.id
  );
}

function canUpdateCompany(user, company) {
  return (
    user.role === Role.SUPER_ADMIN ||
    user.role === Role.ADMIN ||
    company.companyId === user.id
  );
}

function canCreateCompany(user) {
  return user.role === Role.SUPER_ADMIN;
}

module.exports = {
  canViewCompany,
  canUpdateCompany,
  canCreateCompany
};
