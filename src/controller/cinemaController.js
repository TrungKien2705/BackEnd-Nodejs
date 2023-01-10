import cinemaService from "../services/cinemaService";

let getAllNameCinema = async (req, res) => {
  try {
    let data = await cinemaService.getAllNameCinema();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postCreateCinema = async (req, res) => {
  try {
    let data = await cinemaService.postCreateCinema(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getTopCinemaHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 4;
  try {
    let id = req.query.id;
    let data = await cinemaService.getTopCinemaHome(+limit);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getCinemaById = async (req, res) => {
  try {
    let id = req.query.id;
    let data = await cinemaService.getCinemaById(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let putUpdateCinema = async (req, res) => {
  try {
    let data = await cinemaService.putUpdateCinema(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postDeleteCinema = async (req, res) => {
  try {
    let data = await cinemaService.postDeleteCinema(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getAllCinema = async (req, res) => {
  try {
    let data = await cinemaService.getAllCinema(req.query.page);
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
  getAllNameCinema,
  postCreateCinema,
  getTopCinemaHome,
  getCinemaById,
  putUpdateCinema,
  postDeleteCinema,
  getAllCinema,
};
