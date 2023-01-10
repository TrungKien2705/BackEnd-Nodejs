import customerService from "../services/customerService";

let postBookingMovie = async (req, res) => {
  try {
    let data = await customerService.postBookingMovie(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let verifyBookingMovie = async (req, res) => {
  try {
    let data = await customerService.verifyBookingMovie(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let cancelBookingMovie = async (req, res) => {
  try {
    let data = await customerService.cancelBookingMovie(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getAllCustomer = async (req, res) => {
  try {
    let data = await customerService.getAllCustomer();
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
  postBookingMovie,
  verifyBookingMovie,
  cancelBookingMovie,
  getAllCustomer,
};
