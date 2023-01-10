import express from "express";
import loginController from "../controller/loginController";
import employeeController from "../controller/employeeController";
import movieController from "../controller/movieController";
import cinemaController from "../controller/cinemaController";
import customerController from "../controller/customerController";
import newController from "../controller/newController";
let router = express.Router();

let initWebRouter = (app) => {
  //login
  router.post("/api/login-employee", loginController.handleLoginEmployee);
  router.post("/api/register-employee", loginController.handleRegisterEmployee);
  router.put(
    "/api/change-password-employee",
    loginController.handleChangePassword
  );
  router.post("/api/send-email-token", loginController.postSendEmailToken);
  router.post(
    "/api/forgot-password-employee",
    loginController.handleForgotPassword
  );
  router.post("/api/time-out-delete-token", loginController.timeOutDeleteToken);
  //Employeee
  router.get("/api/get-all-employee", employeeController.getAllEmployee);
  router.put("/api/update-employee", employeeController.putUpdateEmployee);
  router.put("/api/delete-employee", employeeController.deleteEmployee);
  router.delete(
    "/api/delete-removed-employee",
    employeeController.deleteRemovedEmployee
  );
  router.get(
    "/api/get-all-employee-sort-by-name",
    employeeController.getAllEmployeeSortName
  );
  router.get(
    "/api/get-all-employee-sort-by-email",
    employeeController.getAllEmployeeSortEmail
  );
  router.get(
    "/api/get-all-employee-sort-by-roleId",
    employeeController.getAllEmployeeSortRole
  );
  router.get(
    "/api/get-employee-by-search",
    employeeController.getEmployeeSreach
  );

  // Customer
  router.post("/api/customer-book-movie", customerController.postBookingMovie);
  router.post(
    "/api/verify-customer-book-movie",
    customerController.verifyBookingMovie
  );
  router.post(
    "/api/cancel-customer-book-movie",
    customerController.cancelBookingMovie
  );
  router.get("/api/get-all-customer", customerController.getAllCustomer);
  //allcode
  router.get("/api/get-allcode", employeeController.getAllCode);
  //movie
  router.get("/api/get-random-movie", movieController.getRandomMovie);
  router.get("/api/get-top-movie-hot", movieController.getTopMovieHot);
  router.get("/api/get-all-movie", movieController.getAllMovie);
  router.get("/api/get-all-movie-name", movieController.getAllMovieName);
  router.post("/api/post-create-movie", movieController.postCreateNewMovie);
  router.put("/api/update-movie", movieController.putUpdateMovie);
  router.put("/api/put-delete-movie", movieController.putDeleteMovie);
  router.get("/api/get-movie-by-id", movieController.getMovieById);
  router.post("/api/bulk-create-schedule", movieController.bulkCreateSchedule);
  router.post(
    "/api/delete-schedule-movie-by-date",
    movieController.deleteScheduleMovie
  );
  router.get(
    "/api/get-schedule-movie-by-date",
    movieController.getScheduleMovieByDate
  );
  router.get(
    "/api/get-list-booking-movie",
    movieController.getListBookingMovie
  );
  router.get("/api/get-movie-by-cinema", movieController.getMovieByCinema);
  router.get("/api/get-movie-sort-name", movieController.getMovieSortName);
  router.get("/api/get-movie-sort-price", movieController.getMovieSortPrice);
  router.get("/api/get-movie-sort-date", movieController.getMovieSortDate);
  router.get("/api/get-movie-search-name", movieController.getMovieSearchName);
  router.get("/api/get-all-movie-upcomming", movieController.getMovieUpcomming);
  router.get("/api/get-all-movie-play", movieController.getMoviePlay);
  router.post("/api/post-send-remedy", movieController.postSendRemedy);

  //cinema
  router.get("/api/get-all-name-cinema", cinemaController.getAllNameCinema);
  router.get("/api/get-all-cinema", cinemaController.getAllCinema);
  router.get("/api/get-top-cinema-home", cinemaController.getTopCinemaHome);
  router.post("/api/post-create-cinema", cinemaController.postCreateCinema);
  router.get("/api/get-cinema-by-id", cinemaController.getCinemaById);
  router.put("/api/put-update-cinema", cinemaController.putUpdateCinema);
  router.post("/api/post-delete-cinema", cinemaController.postDeleteCinema);
  //new & Promotion
  router.post("/api/post-create-new", newController.postCreateNew);
  router.post("/api/post-create-promotion", newController.postCreatePromotion);
  router.get("/api/get-all-new-page", newController.getAllNewPage);
  router.get("/api/get-all-promotion-page", newController.getAllPromotionPage);
  router.get("/api/get-new-by-id", newController.getNewById);
  router.get("/api/get-promotion-by-id", newController.getPromotionById);
  router.put("/api/put-update-new", newController.putUpdateNew);
  router.put("/api/put-update-promotion", newController.putUpdatePromotion);
  router.post("/api/post-delete-new", newController.postDeleteNew);
  router.post("/api/post-delete-promotion", newController.postDeletePromotion);
  return app.use("/", router);
};

export default initWebRouter;
