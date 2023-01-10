import movieService from "../services/movieService";

let getTopMovieHot = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 6;
  try {
    let id = req.query.id;
    let data = await movieService.getTopMovieHot(+limit);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getAllMovie = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await movieService.getAllMovie(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postCreateNewMovie = async (req, res) => {
  try {
    let data = await movieService.postCreateNewMovie(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getMovieById = async (req, res) => {
  try {
    let data = await movieService.getMovieById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let putUpdateMovie = async (req, res) => {
  try {
    let data = await movieService.putUpdateMovie(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let data = await movieService.bulkCreateSchedule(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getScheduleMovieByDate = async (req, res) => {
  try {
    let data = await movieService.getScheduleMovieByDate(
      req.query.movieId,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getListBookingMovie = async (req, res) => {
  try {
    let data = await movieService.getListBookingMovie(req.query.date);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getMovieByCinema = async (req, res) => {
  try {
    let data = await movieService.getMovieByCinema(req.query.cinemaId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getMovieSortName = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await movieService.getMovieSortName(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};
let getMovieSortPrice = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await movieService.getMovieSortPrice(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};
let getMovieSortDate = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await movieService.getMovieSortDate(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let putDeleteMovie = async (req, res) => {
  try {
    let data = await movieService.putDeleteMovie(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getMovieSearchName = async (req, res) => {
  try {
    let page = req.query.page;
    let search = req.query.search;
    let data = await movieService.getMovieSearchName(page, search);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getRandomMovie = async (req, res) => {
  try {
    let data = await movieService.getRandomMovie();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getAllMovieName = async (req, res) => {
  try {
    let data = await movieService.getAllMovieName();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let deleteScheduleMovie = async (req, res) => {
  try {
    let data = await movieService.deleteScheduleMovie(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getMovieUpcomming = async (req, res) => {
  try {
    let data = await movieService.getMovieUpcomming();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getMoviePlay = async (req, res) => {
  try {
    let data = await movieService.getMoviePlay();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postSendRemedy = async (req, res) => {
  try {
    let data = await movieService.postSendRemedy(req.body);
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
  getTopMovieHot,
  getAllMovie,
  postCreateNewMovie,
  getMovieById,
  putUpdateMovie,
  bulkCreateSchedule,
  getScheduleMovieByDate,
  getListBookingMovie,
  getMovieByCinema,
  getMovieSortName,
  getMovieSortPrice,
  getMovieSortDate,
  putDeleteMovie,
  getMovieSearchName,
  getRandomMovie,
  getAllMovieName,
  deleteScheduleMovie,
  getMovieUpcomming,
  getMoviePlay,
  postSendRemedy,
};
