import loginService from "../services/loginService";

let handleLoginEmployee = async (req, res) => {
  try {
    let data = await loginService.handleLoginEmployee(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let handleRegisterEmployee = async (req, res) => {
  try {
    let data = await loginService.handleRegisterEmployee(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let handleChangePassword = async (req, res) => {
  try {
    let data = await loginService.handleChangePassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let handleForgotPassword = async (req, res) => {
  try {
    let data = await loginService.handleForgotPassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postSendEmailToken = async (req, res) => {
  try {
    let data = await loginService.postSendEmailToken(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let timeOutDeleteToken = async (req, res) => {
  try {
    let data = await loginService.timeOutDeleteToken(req.body);
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
  handleLoginEmployee,
  handleRegisterEmployee,
  handleChangePassword,
  postSendEmailToken,
  handleForgotPassword,
  timeOutDeleteToken,
};
