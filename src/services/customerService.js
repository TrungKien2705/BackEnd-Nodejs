import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
const { Op } = require("sequelize");

let builUrlEmail = (movieId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&movieId=${movieId}`;
  return result;
};
let builCancelEmail = (movieId, token) => {
  let result = `${process.env.URL_REACT}/cancel-booking?token=${token}&movieId=${movieId}`;
  return result;
};
let postBookingMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.fullName ||
        !data.movieId ||
        !data.timeType ||
        !data.cinemaId ||
        !data.date ||
        !data.selectGender ||
        !data.address ||
        !data.phonenumber ||
        !data.birthday ||
        !data.selectTick
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        //upser customer
        let customer = await db.Customer.findOrCreate({
          where: { email: data.email },
          defaults: {
            fullName: data.fullName,
            email: data.email,
            phonenumber: data.phonenumber,
            address: data.address,
            gender: data.selectGender,
            birthday: data.birthday,
          },
        });
        if (customer) {
          //send email
          //upsrt booking
          let token = uuidv4();

          let movieBooking = await db.Booking.findOrCreate({
            where: {
              date: { [Op.ne]: data.date },
              // customerId: customer[0].id,
            },
            defaults: {
              statusId: "S1",
              movieId: data.movieId,
              cinemaId: data.cinemaId,
              customerId: customer[0].id,
              date: data.date,
              priceType: data.priceType,
              ticketNumber: data.selectTick,
              timeType: data.timeType,
              token: token,
            },
          });

          if (movieBooking) {
            await emailService.sendSimpleEmail({
              receiverEmail: data.email,
              name: data.fullName,
              birthday: data.birthday,
              time: data.timeString,
              movieName: data.movieName,
              language: data.language,
              phonenumber: data.phonenumber,
              address: data.address,
              tick: data.selectTick,
              totalPrice: data.totalPrice,
              cinemaName: data.cinemaName,
              redirectLink: builUrlEmail(data.movieId, token),
              cancelVerify: builCancelEmail(data.movieId, token),
            });

            //upsert movie
            let movie = await db.Movie.findOne({
              where: { id: data.movieId, deletect: 1 },
              raw: false,
            });
            if (movie) {
              movie.bookingTick = movie.bookingTick + 1;
              await movie.save();
              resolve({
                errCode: 0,
                errMessage: "Successful appointment",
              });
            } else {
              resolve({
                errCode: 2,
                errMessage: "Movie Not found",
              });
            }
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let verifyBookingMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.movieId) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let booking = await db.Booking.findOne({
          where: {
            movieId: data.movieId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (booking) {
          booking.statusId = "S2";
          await booking.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appoiment success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "The appointment has been activated or does not exist!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let cancelBookingMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.movieId) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let booking = await db.Booking.findOne({
          where: {
            movieId: data.movieId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (booking) {
          booking.statusId = "S4";
          await booking.save();
          resolve({
            errCode: 0,
            errMessage: "Update  cancel booking success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Cancel booking has been activated or does not exist!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCustomer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Customer.findAll({
        where: { deletect: 1 },
        include: [
          {
            model: db.Allcode,
            as: "genderCustData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: data ? data : [],
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookingMovie,
  verifyBookingMovie,
  cancelBookingMovie,
  getAllCustomer,
};
