import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
const salt = bcrypt.genSaltSync(10);

let checkEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let employee = await db.Employee.findOne({
        where: { email: email },
      });
      if (employee) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let hashEmployeePassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let handleRegisterEmployee = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.firstName || !data.lastName || !data.email || !data.password) {
        resolve({
          errCode: 1,
          errMessageVi: "Vui lòng điền đầy đủ thông tin!",
          errMessageEn: "Missing input parameter!",
        });
      } else {
        let check = await checkEmail(data.email);
        if (check === true) {
          resolve({
            errCode: 2,
            errMessageVi:
              "Email của bạn đã được sử dụng, vui lòng thử một email khác!",
            errMessageEn:
              "Your email is already in used, plz try another email!",
          });
        } else {
          let hashPassword = await hashEmployeePassword(data.password);
          await db.Employee.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashPassword,
            roleId: "R3",
          });
          resolve({
            errCode: 0,
            errMessage: "Register Employee Ok",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLoginEmployee = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          errCode: 1,
          errMessageVi: "Vui lòng nhập email hoặc mật khẩu!",
          errMessageEn: "Missing input parameter!",
        });
      } else {
        let dataEmp = {};
        let isExit = await checkEmail(data.email);
        if (isExit) {
          let emp = await db.Employee.findOne({
            where: { email: data.email },
            raw: true,
            attributes: [
              "id",
              "email",
              "roleId",
              "password",
              "firstName",
              "lastName",
              "address",
              "gender",
              "birthday",
              "phonenumber",
              "roleId",
            ],
          });
          if (emp) {
            let check = await bcrypt.compareSync(data.password, emp.password);
            if (check) {
              dataEmp.errCode = 0;
              dataEmp.errMessage = "ok";
              delete emp.password;
              dataEmp.emp = emp;
            } else {
              dataEmp.errCode = 3;
              dataEmp.errMessageVi = "Sai mật khẩu";
              dataEmp.errMessageEn = "Wrong PassWord";
            }
          } else {
            dataEmp.errCode = 2;
            dataEmp.errMessageVi = "Không tìm thấy người dùng!";
            dataEmp.errMessageEn = "User's not found!";
          }
        } else {
          dataEmp.errCode = 4;
          dataEmp.errMessageVi =
            "Email của bạn không tồn tại trong hệ thống của bạn. Vui lòng thử Email";
          dataEmp.errMessageEn =
            "Your's Email isn't exist in your sytem.Plz try Email";
        }
        resolve(dataEmp);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleChangePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.email || !data.passOld || !data.passNew) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      } else {
        let dataEmp = {};
        let emp = await db.Employee.findOne({
          where: { id: data.id, deletect: 1 },
          raw: false,
        });
        if (emp) {
          let isExit = await checkEmail(data.email);
          if (isExit) {
            let check = await bcrypt.compareSync(data.passOld, emp.password);
            let hashPassword = await hashEmployeePassword(data.passNew);
            if (check) {
              emp.password = hashPassword;
              await emp.save();
              dataEmp.errCode = 0;
              dataEmp.errMessage = "Change password successfully";
            } else {
              dataEmp.errCode = 3;
              dataEmp.errMessageVi = "Sai mật khẩu cũ";
              dataEmp.errMessageEn = "Wrong old password";
            }
          } else {
            dataEmp.errCode = 4;
            dataEmp.errMessageVi =
              "Email của bạn không tồn tại trong hệ thống của bạn. Vui lòng thử Email";
            dataEmp.errMessageEn =
              "Your's Email isn't exist in your sytem.Plz try Email";
          }
        } else {
          dataEmp.errCode = 2;
          dataEmp.errMessageVi = "Không tìm thấy người dùng!";
          dataEmp.errMessageEn = "User's not found!";
        }
        resolve(dataEmp);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let postSendEmailToken = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errCode: 1,
          errMessageVi: "Vui lòng điền đầy đủ thông tin!",
          errMessageEn: "Missing input parameter!",
        });
      } else {
        let isExit = await checkEmail(data.email);
        if (isExit) {
          let token = uuidv4();
          let emp = await db.Employee.update(
            { token: token },
            {
              where: { email: data.email, deletect: 1 },
              raw: false,
            }
          );
          if (emp) {
            await emailService.sendEmailForgotPassword({
              receiverEmail: data.email,
              token: token,
              language: data.language,
            });
          } else {
            resolve({
              errCode: 3,
              errMessageVi: "Tài khoản của bạn đã bị xóa!",
              errMessageEn: "Your account has been deleted!",
            });
          }
        } else {
          resolve({
            errCode: 2,
            errMessageVi:
              "Email của bạn không tồn tại trong hệ thống của bạn. Vui lòng thử Email",
            errMessageEn:
              "Your's Email isn't exist in your sytem.Plz try Email",
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Successful token appointment",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleForgotPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.passNew) {
        resolve({
          errCode: 1,
          errMessageVi: "Vui lòng điền đầy đủ thông tin!",
          errMessageEn: "Missing input parameter!",
        });
      } else {
        let emp = await db.Employee.findOne({
          where: { token: data.token, deletect: 1 },
          raw: false,
        });
        if (emp) {
          // let check = await bcrypt.compareSync(data.token, emp.token);
          let hashPassword = await hashEmployeePassword(data.passNew);
          emp.password = hashPassword;
          emp.token = null;
          await emp.save();
          // if (check) {
          //  emp.password = hashPassword;
          //  await emp.save();
          // } else {
          //   resolve({
          //     errCode: 2,
          //     errMessageVi: "Mã token không chính xác",
          //     errMessageEn: "The token is incorrect",
          //   });
          // }
        } else {
          resolve({
            errCode: 2,
            errMessageVi: "Mã token không chính xác hoặc đã hết hết hạn !",
            errMessageEn: "The token is incorrect or has expired !",
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Successful Forgot Password",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let timeOutDeleteToken = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let isExit = await checkEmail(data.email);
        if (isExit) {
          setTimeout(async () => {
            let emp = await db.Employee.update(
              { token: null },
              {
                where: { email: data.email, deletect: 1 },
                raw: false,
              }
            );
            if (emp) {
              resolve({
                errCode: 0,
                errMessageEn: "Token has expired",
                errMessageVi: "Mã Token đã hết hạn",
              });
            } else {
              resolve({
                errCode: 2,
                errMessage: "Delete token error",
              });
            }
          }, 120 * 1000);
          let token = await db.Employee.findOne({
            where: { token: null, email: data.email },
          });
          if (token) {
            resolve({
              errCode: 0,
              errMessageEn: "Token has expired",
              errMessageVi: "Mã Token đã hết hạn",
            });
          }
        } else {
          resolve({
            errCode: 3,
            errMessageVi:
              "Email của bạn không tồn tại trong hệ thống của bạn. Vui lòng thử Email",
            errMessageEn:
              "Your's Email isn't exist in your sytem.Plz try Email",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleLoginEmployee,
  handleRegisterEmployee,
  handleChangePassword,
  postSendEmailToken,
  handleForgotPassword,
  timeOutDeleteToken,
};
