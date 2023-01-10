require("dotenv").config();
import nodemailer from "nodemailer";

//send booking customer
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"BookingMovie 👻" <nt.kien.2705@gmail.com>',
    to: dataSend.receiverEmail,
    subject: getToEmail(dataSend.language),
    html: getBodyHTMLEmail(dataSend),
  });
};
let getToEmail = (language) => {
  let result = "";
  if (language === "vi") {
    result = "Thông tin đặt vé phim";
  }
  if (language === "en") {
    result = "Movie ticket booking information";
  }
  return result;
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.name}!</h3>
    <p>Bạn đã đặt vé phim thàng công trên BookingMovie </p>
    <h4>Thông tin đặt vé:</h4>
    <div><b>Rạp chiếu: ${dataSend.cinemaName}</b></div>
    <div><b>Phim: ${dataSend.movieName}</b></div>
    <div><b>Số vé: ${dataSend.tick}</b></div>
    <div><b>Tổng gía: ${dataSend.totalPrice} VNĐ</b></div>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Địa chỉ người đặt: ${dataSend.address}</b></div>
    <div><b>Số điện thoại: ${dataSend.phonenumber}</b></div>
    <p>Nếu các thông tin trên đã đúng, vui lòng click vào link xác nhận: 
    <a href="${dataSend.redirectLink}" target="_blank">Xác nhận</a>
    </p>
    <p>Nếu các thông tin trên không đúng, vui lòng click vào link: 
    <a href="${dataSend.cancelVerify}" target="_blank">Hủy xác nhận</a>
    </p>`;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear ${dataSend.name}!</h3>
    <p>You have successfully booked movie tickets on BookingMovie</p>
    <h4>Information to order medical examination:</h4>
    <div><b>Cinema: ${dataSend.cinemaName}</b></div>
    <div><b>Movie: ${dataSend.movieName}</b></div>
    <div><b>Ticket:  ${dataSend.tick}</b></div>
    <div><b>Total price: ${dataSend.totalPrice} $</b></div>
     <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Address: ${dataSend.address}</b></div>
    <div><b>Phone Number: ${dataSend.phonenumber}</b></div>
    <p>If the above information is correct, please click the confirmation link: 
    <a href="${dataSend.redirectLink}" target="_blank">Confirm</a>
    </p>
    <p> If the above information is not correct, please click on the link: 
    <a href="${dataSend.cancelVerify}" target="_blank">Cancel confirmation</a>
    </p>`;
  }
  return result;
};

//send email forgot password
let sendEmailForgotPassword = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"BookingMovie 👻"',
    to: dataSend.receiverEmail,
    subject: getToEmailForgotPassword(dataSend.language),
    html: getEmailForgotPassword(dataSend),
  });
};
let getToEmailForgotPassword = (language) => {
  let result = "";
  if (language === "vi") {
    result = "Mã xác nhận đổi mật khẩu";
  }
  if (language === "en") {
    result = "Password change confirmation code";
  }
  return result;
};
let getEmailForgotPassword = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào Bạn!</h3>
    <b>Bạn đã yêu cầu mã xác nhận trên BookingMovie </v>
    <h4>Mã xác nhận tài khoản:</h4>
    <h3><b>${dataSend.token}</b></h3>
    <div>Lưu ý: Mã token chỉ có hạn sự dụng là 2 phút</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear You!</h3>
    <b>You have requested a confirmation code on BookingMovie </v>
    <h4>Account verification code:</h4>
    <h3><b>${dataSend.token}</b></h3>
    <div>Note: The token is only valid for 2 minutes</div>`;
  }
  return result;
};

//send email booking employee
let sendAttachmentEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"BookingMovie 👻"', // sender address
    to: dataSend.email, // list of receivers
    subject: getSendEmail(dataSend.language), // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `BookingMovie-${
          dataSend.patientId
        }-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

let getSendEmail = (language) => {
  let result = "";
  if (language === "vi") {
    result = "Hóa đơn vé phim";
  }
  if (language === "en") {
    result = "Movie ticket booking receipt";
  }
  return result;
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.customerName}!</h3>
    <p>Bạn đã đặt vé xem phim thàng công trên BookingMovie </p>
    <h4>Thông tin hóa đơn trong file đính kèm</h4>
    `;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear ${dataSend.customerName}!</h3>
    <p>You have successfully booked movie tickets on BookingMovie</p>
    <h4>Invoice information in the attached file</h4>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail,
  sendEmailForgotPassword,
  sendAttachmentEmail,
};
