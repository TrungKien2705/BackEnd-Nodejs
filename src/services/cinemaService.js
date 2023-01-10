import db from "../models/index";

let getAllNameCinema = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Cinema.findAll({
        where: { deletect: 1 },
        attributes: ["id", "nameVi", "nameEn"],

        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let postCreateCinema = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let dataCinema = await db.Cinema.create({
          nameVi: data.nameVi,
          nameEn: data.nameEn,
          image: data.image,
          addressVi: data.addressVi,
          addressEn: data.addressEn,
          hotline: data.hotline,
          descriptionMarkdown_Vi: data.descriptionMarkdown_Vi,
          descriptionHTML_Vi: data.descriptionHTML_Vi,
          descriptionMarkdown_En: data.descriptionMarkdown_En,
          descriptionHTML_En: data.descriptionHTML_En,
        });
        if (dataCinema) {
          resolve({
            errCode: 0,
            errMessage: "Create new cinema successs !",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Create new cinema error !",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getTopCinemaHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Cinema.findAll({
        limit: limit,
        where: { deletect: 1 },
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "nameVi",
          "nameEn",
          "image",
          "descriptionHTML_Vi",
          "descriptionHTML_En",
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

let getCinemaById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let data = await db.Cinema.findOne({
          where: { id: id },
          raw: true,
          // nest: true,
        });
        if (data && data.image) {
          delete data.descriptionMarkdown_Vi;
          delete data.descriptionMarkdown_En;
          data.image = new Buffer.from(data.image, "base64").toString("binary");
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

let putUpdateCinema = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.nameVi || !data.nameEn || !data.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let cinemaData = await db.Cinema.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (cinemaData) {
          cinemaData.nameVi = data.nameVi;
          cinemaData.nameEn = data.nameEn;
          cinemaData.addressVi = data.addressVi;
          cinemaData.addressEn = data.addressEn;
          cinemaData.hotline = data.hotline;
          if (data.image) {
            cinemaData.image = data.image;
          }
          cinemaData.descriptionMarkdown_Vi = data.descriptionMarkdown_Vi;
          cinemaData.descriptionHTML_Vi = data.descriptionHTML_Vi;
          cinemaData.descriptionHTML_En = data.descriptionHTML_En;
          cinemaData.descriptionMarkdown_En = data.descriptionMarkdown_En;

          await cinemaData.save();
        } else {
          resolve({
            errCode: 2,
            errMessage: "Update Cinema error",
          });
        }
      }
      resolve({
        errCode: 0,
        errMessage: "Update Cinema success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let postDeleteCinema = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let newDelete = await db.Cinema.destroy({
          where: { id: id },
        });
        if (newDelete) {
          resolve({
            errCode: 0,
            errMessage: "Delete Cinema success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Delete Cinema error",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCinema = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        const PAGE_SIZE = 5;
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        let pageCinema = await db.Cinema.count({
          where: { deletect: 1 },
        });
        let data = await db.Cinema.findAll({
          where: { deletect: 1 },
          offset: startPage,
          limit: PAGE_SIZE,
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
        resolve({
          errCode: 0,
          data: data,
          pageSize: PAGE_SIZE,
          pageCinema: pageCinema,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
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
