import _, { reject } from "lodash";
import db from "../models/index";
const { Op } = require("sequelize");
const MAX_NUMBER = process.env.MAX_NUMBER;
import emailService from "../services/emailService";

let getTopMovieHot = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Movie.findAll({
        limit: limit,
        where: { deletect: 1 },
        order: [["createdAt", "DESC"]],
        attributes: ["id", "nameVi", "nameEn", "image", "timeType"],
        include: [
          {
            model: db.Allcode,
            as: "cateData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllMovie = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageMovie = 0;
      let data = [];
      const PAGE_SIZE = 5;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        pageMovie = await db.Movie.count({
          where: { deletect: 1 },
        });
        data = await db.Movie.findAll({
          where: { deletect: 1 },
          offset: startPage,
          limit: PAGE_SIZE,
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
            model: db.Allcode,
            as: "countryData",
            attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "cateData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Cinema,
              as: "cinemaData",
              attributes: ["nameVi", "nameEn"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
      }
      resolve({
        pageSize: PAGE_SIZE,
        pageMovie: pageMovie,
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let postCreateNewMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.nameVi || !data.nameEn) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      } else {
        let dataMovie = await db.Movie.create({
          nameVi: data.nameVi,
          nameEn: data.nameEn,
          image: data.image,
          cinemaId: data.cinemaId,
          director: data.director, //dao dien
          priceId: data.priceId, //gia ve
          categoryId: data.categoryId, //the loai
          timeType: data.timeType, //thời lượng
          countryType: data.countryType, //quốc gia
          premiere_date: data.premiere_date, //khoi chieu
          trailer: data.trailer,
          descriptionVi: data.descriptionVi,
          descriptionEn: data.descriptionEn,
        });
        if (dataMovie) {
          resolve({
            errCode: 0,
            errMessage: "Create New Movie Ok",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Create New Movie Error",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getMovieById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      }
      let data = await db.Movie.findOne({
        where: { deletect: 1, id: id },
        include: [
          {
            model: db.Allcode,
            as: "priceData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "countryData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "cateData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Cinema,
            as: "cinemaData",
            attributes: ["nameVi", "nameEn"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (data && data.image) {
        data.image = new Buffer.from(data.image, "base64").toString("binary");
      }

      resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let putUpdateMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.nameVi || !data.nameEn || !data.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      } else {
        let movie = await db.Movie.findOne({
          where: { id: data.id, deletect: 1 },
          raw: false,
        });
        if (movie) {
          movie.nameVi = data.nameVi;
          movie.nameEn = data.nameEn;
          if (data.image) {
            movie.image = data.image;
          }
          movie.cinemaId = data.cinemaId;
          movie.director = data.director; //dao dien
          movie.priceId = data.priceId; //gia ve
          movie.categoryId = data.categoryId; //the loai
          movie.timeType = data.timeType; //thời lượng
          movie.countryType = data.countryType; //quốc gia
          movie.premiere_date = data.premiere_date; //khoi chieu
          movie.trailer = data.trailer;
          movie.descriptionVi = data.descriptionVi;
          movie.descriptionEn = data.descriptionEn;

          await movie.save();
          resolve({
            errCode: 0,
            errMessage: "Update movie success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Movie Not found",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.movieId || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER;
            return item;
          });
        }

        //get all data
        let exsting = await db.Schedule.findAll({
          where: { movieId: data.movieId, date: data.date },
          attributes: ["timeType", "date", "movieId", "maxNumber"],
          raw: true,
        });
        let toCreate = _.differenceWith(schedule, exsting, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          errMessage: "Save success!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getScheduleMovieByDate = (movieId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!movieId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let data = await db.Schedule.findAll({
          where: { movieId: movieId, date: date },
          order: [["timeType", "ASC"]],
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Movie,
              as: "movieData",
              attributes: ["nameVi", "nameEn", "cinemaId", "priceId"],
              include: [
                {
                  model: db.Cinema,
                  as: "cinemaData",
                  attributes: ["nameVi", "nameEn"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getListBookingMovie = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!date) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let data = await db.Booking.findAll({
          where: { date: date },
          include: [
            {
              model: db.Customer,
              as: "customerData",
              attributes: ["fullName", "email"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderCustData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeBookingData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Cinema,
              as: "cinemaBookingData",
              attributes: ["nameVi", "nameEn"],
            },
            {
              model: db.Movie,
              as: "movieBookingData",
              attributes: ["nameVi", "nameEn"],
            },
            {
              model: db.Allcode,
              as: "statusData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "priceBookingData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data ? data : [],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getMovieByCinema = (cinemaId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!cinemaId) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let data = await db.Movie.findAll({
          where: { cinemaId: cinemaId },
          attributes: ["id", "nameVi", "nameEn", "image"],
          raw: false,
          nest: true,
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getMovieSortName = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageMovie = 0;
      let data = [];
      const PAGE_SIZE = 5;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        pageMovie = await db.Movie.count({ where: { deletect: 1 } });
        data = await db.Movie.findAll({
          where: { deletect: 1 },
          offset: startPage,
          order: [["nameVi", "ASC"]],
          order: [["nameEn", "ASC"]],
          limit: PAGE_SIZE,
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
      }
      resolve({
        pageSize: PAGE_SIZE,
        pageMovie: pageMovie,
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getMovieSortPrice = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageMovie = 0;
      let data = [];
      const PAGE_SIZE = 5;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        pageMovie = await db.Movie.count({ where: { deletect: 1 } });
        data = await db.Movie.findAll({
          where: { deletect: 1 },
          offset: startPage,
          order: [["priceId", "ASC"]],
          limit: PAGE_SIZE,
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
      }
      resolve({
        pageSize: PAGE_SIZE,
        pageMovie: pageMovie,
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getMovieSortDate = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageMovie = 0;
      let data = [];
      const PAGE_SIZE = 5;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        pageMovie = await db.Movie.count({ where: { deletect: 1 } });
        data = await db.Movie.findAll({
          where: { deletect: 1 },
          offset: startPage,
          order: [["premiere_date", "ASC"]],
          limit: PAGE_SIZE,
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
      }
      resolve({
        pageSize: PAGE_SIZE,
        pageMovie: pageMovie,
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let putDeleteMovie = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      } else {
        let movie = await db.Movie.findOne({
          where: { id: id, deletect: 1 },
          raw: false,
        });
        if (movie) {
          movie.deletect = 0;
        }
        await movie.save();
        if (!movie) {
          resolve({
            errCode: 2,
            errMessageEn: "The Movie error removed",
          });
        }
        resolve({
          errCode: 0,
          errMessageEn: "The Movie removed success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getMovieSearchName = (page, search) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageMovie = 0;
      let data = [];
      const PAGE_SIZE = 5;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        pageMovie = await db.Movie.count({ where: { deletect: 1 } });
        data = await db.Movie.findAll({
          where: {
            deletect: 1,
            [Op.or]: [
              { nameVi: { [Op.like]: "%" + search + "%" } },
              { nameEn: { [Op.like]: "%" + search + "%" } },
            ],
          },
          offset: startPage,
          limit: PAGE_SIZE,
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
      }
      resolve({
        pageSize: PAGE_SIZE,
        pageMovie: pageMovie,
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getRandomMovie = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await db.Movie.findAll({
        where: { deletect: 1 },
        order: db.sequelize.random(),
        attributes: ["nameVi", "nameEn", "id", "image"],
        limit: 4,
        // raw: true,
        // nest: true,
      });
      if (movie && movie.length > 0) {
        movie.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      if (movie) {
        resolve({
          errCode: 0,
          data: movie,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllMovieName = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Movie.findAll({
        where: { deletect: 1 },
        attributes: ["nameVi", "nameEn", "id"],
      });
      if (data) {
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteScheduleMovie = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      } else {
        let schedule = await db.Schedule.findOne({ where: { id: id } });
        if (schedule) {
          await db.Schedule.destroy({
            where: { id: id },
          });
        } else {
          resolve({
            errCode: 2,
            errMessageEn: "The Schedule error removed",
          });
        }
        resolve({
          errCode: 0,
          errMessageEn: "The Schedule removed success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getMovieUpcomming = () => {
  return new Promise(async (resolve, reject) => {
    let today = new Date();
    try {
      let data = await db.Movie.findAll({
        where: {
          deletect: 1,
          premiere_date: {
            [Op.gt]: today,
          },
        },
        attributes: ["nameVi", "nameEn", "id", "image"],
      });
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      if (data) {
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getMoviePlay = () => {
  return new Promise(async (resolve, reject) => {
    let today = new Date();
    var seven_date = today.getDate() - 7;
    try {
      let data = await db.Movie.findAll({
        where: {
          deletect: 1,
          premiere_date: {
            [Op.lte]: today,
          },
        },
        attributes: ["nameVi", "nameEn", "id", "image"],
      });
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      if (data) {
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let postSendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.movieId ||
        !data.customerId ||
        !data.timeType ||
        !data.imgBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let send = await db.Booking.findOne({
          where: {
            movieId: data.movieId,
            customerId: data.customerId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (send) {
          send.statusId = "S3";
          await send.save();

          //send email
          await emailService.sendAttachmentEmail(data);
        }

        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
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
