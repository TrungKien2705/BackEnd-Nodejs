import employeeService from "../services/employeeService";

let getAllEmployee = async (req, res) => {
  try {
    let id = req.query.id;
    let page = req.query.page;
    let data = await employeeService.getAllEmployee(id, page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let putUpdateEmployee = async (req, res) => {
  try {
    let data = await employeeService.putUpdateEmployee(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let deleteEmployee = async (req, res) => {
  try {
    let data = await employeeService.deleteEmployee(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let deleteRemovedEmployee = async (req, res) => {
  try {
    let data = await employeeService.deleteRemovedEmployee(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getAllCode = async (req, res) => {
  try {
    let data = await employeeService.getAllCode(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getAllEmployeeSortName = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await employeeService.getAllEmployeeSortName(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};
let getAllEmployeeSortEmail = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await employeeService.getAllEmployeeSortEmail(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};
let getAllEmployeeSortRole = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await employeeService.getAllEmployeeSortRole(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getEmployeeSreach = async (req, res) => {
  try {
    let page = req.query.page;
    let search = req.query.search;
    let data = await employeeService.getEmployeeSreach(page, search);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
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
