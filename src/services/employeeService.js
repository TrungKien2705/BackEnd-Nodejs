import db from "../models/index";
const { Op } = require("sequelize");

let getAllEmployee = (id, page) => {
  return new Promise(async (resolve, reject) => {
    const PAGE_SIZE = 5;
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessageVi: "Vui lòng điền đầy đủ thông tin!",
          errMessageEn: "Missing input parameter!",
        });
      } else {
        let emp = {};
        let empPage = 0;
        if (id === "ALL" && page) {
          if (page < 0 || !Number(page)) {
            page = 1;
          }
          page = parseInt(page);
          let startPage = (page - 1) * PAGE_SIZE;

          empPage = await db.Employee.count({
            where: { deletect: 1 },
          });
          emp = await db.Employee.findAll({
            offset: startPage,
            limit: PAGE_SIZE,
            where: { deletect: 1 },
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "genderData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "addressData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
          });
        }
        if (id && id !== "ALL") {
          emp = await db.Employee.findOne({
            where: { id: id, deletect: 1 },
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "genderData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "addressData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
          });
          // if (emp && emp.length > 0) {
          //   emp.map((item) => {
          //     item.image = new Buffer.from(item.image, "base64").toString("binary");
          //     return item;
          //   });
          // }
        }
        resolve({
          errCode: 0,
          errMessage: "ok",
          pageSize: PAGE_SIZE,
          empPage: empPage,
          emp: emp ? emp : {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let putUpdateEmployee = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId) {
        resolve({
          errCode: 1,
          errMessageVi: "Vui lòng điền đầy đủ thông tin!",
          errMessageEn: "Missing input parameter!",
        });
      }
      let employee = await db.Employee.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (employee) {
        employee.firstName = data.firstName;
        employee.lastName = data.lastName;
        employee.address = data.address;
        employee.gender = data.gender;
        employee.roleId = data.roleId;
        employee.birthday = data.birthday;
        employee.phonenumber = data.phonenumber;
        if (data.avata) {
          employee.image = data.avata;
        }

        await employee.save();
        resolve({
          errCode: 0,
          errMessageVi: "Cập nhật thông tin thành công",
          errMessageEn: "Update information success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessageVi: "Không tìm thấy nhân viên",
          errMessageEn: "Employee Not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteEmployee = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      }
      let emp = await db.Employee.findOne({
        where: { id: id, deletect: 1 },
        raw: false,
      });

      if (emp) {
        emp.deletect = 0;
      }
      await emp.save();
      if (!emp) {
        resolve({
          errCode: 2,
          errMessageVi: "Gỡ bỏ nhân viên không thành công",
          errMessageEn: "The Employee error removed",
        });
      }
      resolve({
        errCode: 0,
        errMessageVi: "Gỡ bỏ nhân viên thành công",
        errMessageEn: "The Employee success removed",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteRemovedEmployee = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      }
      let emp = await db.Employee.findOne({
        where: { id: id },
      });

      if (emp) {
        await db.Employee.destroy({
          where: { id: id },
        });
      }
      if (!emp) {
        resolve({
          errCode: 2,
          errMessageVi: "Xóa nhân viên không thành công",
          errMessageEn: "The Employee error delete",
        });
      }
      resolve({
        errCode: 0,
        errMessageVi: "Xóa nhân viên thành công",
        errMessageEn: "The Employee success delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCode = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!type) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: {
            type: type,
          },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllEmployeeSortRole = (page) => {
  return new Promise(async (resolve, reject) => {
    const PAGE_SIZE = 5;
    try {
      let emp = {};
      let empPage = 0;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;

        empPage = await db.Employee.count({
          where: { deletect: 1 },
        });
        emp = await db.Employee.findAll({
          offset: startPage,
          limit: PAGE_SIZE,
          where: { deletect: 1 },
          order: [["roleId", "ASC"]],
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "roleData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          pageSize: PAGE_SIZE,
          empPage: empPage,
          emp: emp ? emp : {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllEmployeeSortName = (page) => {
  return new Promise(async (resolve, reject) => {
    const PAGE_SIZE = 5;
    try {
      let emp = {};
      let empPage = 0;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;

        empPage = await db.Employee.count({
          where: { deletect: 1 },
        });
        emp = await db.Employee.findAll({
          offset: startPage,
          limit: PAGE_SIZE,
          where: { deletect: 1 },
          order: [["lastName", "ASC"]],
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "roleData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          pageSize: PAGE_SIZE,
          empPage: empPage,
          emp: emp ? emp : {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllEmployeeSortEmail = (page) => {
  return new Promise(async (resolve, reject) => {
    const PAGE_SIZE = 5;
    try {
      let emp = {};
      let empPage = 0;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;

        empPage = await db.Employee.count({
          where: { deletect: 1 },
        });
        emp = await db.Employee.findAll({
          offset: startPage,
          limit: PAGE_SIZE,
          where: { deletect: 1 },
          order: [["email", "ASC"]],
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "roleData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          emp: emp ? emp : {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getEmployeeSreach = (page, search) => {
  return new Promise(async (resolve, reject) => {
    const PAGE_SIZE = 5;
    try {
      // let emp = {};
      // let empPage = 0;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;

        let emp = await db.Employee.findAll({
          offset: startPage,
          limit: PAGE_SIZE,
          where: {
            deletect: 1,
            [Op.or]: [
              { email: { [Op.like]: "%" + search + "%" } },
              { lastName: { [Op.like]: "%" + search + "%" } },
            ],
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "roleData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        let empPage = 0;
        if (emp && emp.length > 0) {
          emp.map((index) => {
            empPage = parseInt(index + 1);
          });
        }

        resolve({
          errCode: 0,
          errMessage: "ok",
          pageSize: PAGE_SIZE,
          empPage: empPage,
          emp: emp ? emp : {},
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllEmployee,
  putUpdateEmployee,
  deleteEmployee,
  deleteRemovedEmployee,
  getAllCode,
  getAllEmployeeSortName,
  getAllEmployeeSortEmail,
  getAllEmployeeSortRole,
  getEmployeeSreach,
};
