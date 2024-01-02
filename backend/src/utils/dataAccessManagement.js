const db = require('../../models/index');

const { User } = db;

class DataAccesManagement {
  static roleAccessManger = (user, roles) => {
    if (user.roleId !== 1) {
      if (user.roleId === 2)
        return roles.filter((d) => d.id === 3 || d.id === 4);

      if (user.roleId === 3) return roles.filter((d) => d.id === 4);
    }

    return roles;
  };

  static companyAccessManager = (user, companies) => user.roleId !== 1 ? companies.filter((c) => c.id === user.companyId) : companies;

  static departmentAccessManager = (user, departments) => {
    if (user.roleId !== 1) {
      const data = departments.filter((d) => d.companyId === user.companyId);
      if (user.roleId === 2) return data;
      if (user.roleId === 3) return data.filter((d) => d.id === user.departmentId);
    }

    return departments;
  };

  static shiftAccessManager = (user, shifts) => user.roleId !== 1 ? shifts.filter((d) => d.companyId === user.companyId) : shifts;

  static userAccessManager = (user, users) => {
    if (user.roleId !== 1) {
      const data = users.filter((d) => d.companyId === user.companyId);

      if (user.roleId === 2) return data;

      if (user.roleId === 3) return data.filter(
          (d) => d.roleId === 4 && d.departmentId === user.departmentId,
        );

      if (user.roleId === 4) return data.filter((d) => d.id === user.id);
    }

    return users;
  };

  // static employeeShiftAccessManager(loggedInUser, employeeShifts) {
  //    if(loggedInUser.id !== 1) {
  //      const data = employeeShifts.filter(async (s) => {
  //       const user = await User.findOne({ where: { id: s.userId}});

  //       if(loggedInUser.roleId === 2) return loggedInUser.companyId === user.companyId
  //       if(loggedInUser.roleId === 3) return loggedInUser.companyId === user.companyId && loggedInUser.departmentId === user.departmentId
  //       if(loggedInUser.roleId === 4) return loggedInUser.id === s.userId
  //      });
  //     return data;
  //    }
  //    return employeeShifts;
  // }

  // static async employeeShiftAccessManager(loggedInUser, employeeShifts) {
  //   if (loggedInUser.id !== 1) {
  //     const data = await Promise.all(employeeShifts.map(async (s) => {
  //       const user = await User.findOne({ where: { id: s.userId } });
  
  //       if (loggedInUser.roleId === 2) return loggedInUser.companyId === user.companyId;
  //       if (loggedInUser.roleId === 3) return loggedInUser.companyId === user.companyId && loggedInUser.departmentId === user.departmentId;
  //       if (loggedInUser.roleId === 4) return loggedInUser.id === s.userId;
  
  //       return false;
  //     }));
  //     console.log(data.filter(Boolean))
  //     return data.filter(Boolean); 
  //   }
  
  //   return employeeShifts;
  // }


  static async employeeShiftAccessManager(loggedInUser, employeeShifts) {
    if (loggedInUser.id !== 1) {
      const data = await Promise.all(employeeShifts.map(async (s) => {
        const user = await User.findOne({ where: { id: s.userId } });
  
        if (loggedInUser.roleId === 2) {
          const condition = loggedInUser.companyId === user.companyId;
          return condition ? s : false;
        }
        if (loggedInUser.roleId === 3) {
          const condition = loggedInUser.companyId === user.companyId && loggedInUser.departmentId === user.departmentId;
          return condition ? s : false;
        }
        if (loggedInUser.roleId === 4) {
          const condition = loggedInUser.id === s.userId;
          return condition ? s : false;
        }
  
        return false;
      }));
      return data.filter(Boolean);
    }
  
    return employeeShifts;
  }
  
  

//   static absenceAccessManager(loggedInUser, absences) {
//     if(loggedInUser.id !== 1) {
//       const data = absences.filter(async (s) => {
//          const user = await User.findOne({ where: { id: s.userId}});

//          if(loggedInUser.roleId === 2) return loggedInUser.companyId === user.companyId
//          if(loggedInUser.roleId === 3) return loggedInUser.companyId === user.companyId && loggedInUser.departmentId === user.departmentId
//          if(loggedInUser.roleId === 4) return loggedInUser.id === s.userId
//       });
//        console.log(data, 'data absences$$$$$$$$$$');
//      return data;
//     }
//     return absences;
//  }

// static async absenceAccessManager(loggedInUser, absences) {
//   if (loggedInUser.id !== 1) {
//     const data = await Promise.all(absences.map(async (s) => {
//       const user = await User.findOne({ where: { id: s.userId } });

//       if (loggedInUser.roleId === 2) return loggedInUser.companyId === user.companyId;
//       if (loggedInUser.roleId === 3) return loggedInUser.companyId === user.companyId && loggedInUser.departmentId === user.departmentId;
//       if (loggedInUser.roleId === 4) return loggedInUser.id === s.userId;

//       return false;
//     }));

//     return data.filter(Boolean);
//   }

//   return absences;
// }

static async absenceAccessManager(loggedInUser, absences) {
  if (loggedInUser.id !== 1) {
    const data = await Promise.all(absences.map(async (s) => {
      const user = await User.findOne({ where: { id: s.userId } });

      if (loggedInUser.roleId === 2) {
        const condition = loggedInUser.companyId === user.companyId;
        return condition ? s : false;
      }
      if (loggedInUser.roleId === 3) {
        const condition = loggedInUser.companyId === user.companyId && loggedInUser.departmentId === user.departmentId;
        return condition ? s : false;
      }
      if (loggedInUser.roleId === 4) {
        const condition = loggedInUser.id === s.userId;
        return condition ? s : false;
      }

      return false;
    }));

    return data.filter(Boolean);
  }

  return absences;
}


}

module.exports = DataAccesManagement;
