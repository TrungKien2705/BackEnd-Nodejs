import { reject } from "lodash";
import db from "../models/index";

let postCreateNew = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.nameVi || !data.nameEn || !data.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let dataNew = await db.News.create({
          nameVi: data.nameVi,
          nameEn: data.nameEn,
          image: data.image,
          contentMarkdown_Vi: data.contentMarkdown_Vi,
          contentHTML_Vi: data.contentHTML_Vi,
          contentMarkdown_En: data.contentMarkdown_En,
          contentHTML_En: data.contentHTML_En,
        });
        if (dataNew) {
          resolve({
            errCode: 0,
            errMessage: "Create the new successs !",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Create the new error !",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let postCreatePromotion = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.nameVi || !data.nameEn || !data.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let Promotion = await db.Promotion.create({
          nameVi: data.nameVi,
          nameEn: data.nameEn,
          image: data.image,
          contentMarkdown_Vi: data.contentMarkdown_Vi,
          contentHTML_Vi: data.contentHTML_Vi,
          contentMarkdown_En: data.contentMarkdown_En,
          contentHTML_En: data.contentHTML_En,
        });
        if (Promotion) {
          resolve({
            errCode: 0,
            errMessage: "Create the new successs !",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Create the new error !",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllNewPage = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageNew = 0;
      let data = [];
      const PAGE_SIZE = 4;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        pageNew = await db.News.count();
        data = await db.News.findAll({
          order: [["createdAt", "DESC"]],
          offset: startPage,
          limit: PAGE_SIZE,
          raw: true,
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
        pageNew: pageNew,
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllPromotionPage = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageNew = 0;
      let data = [];
      const PAGE_SIZE = 4;
      if (page) {
        if (page < 0 || !Number(page)) {
          page = 1;
        }
        page = parseInt(page);
        let startPage = (page - 1) * PAGE_SIZE;
        pageNew = await db.Promotion.count();
        data = await db.Promotion.findAll({
          order: [["createdAt", "DESC"]],
          offset: startPage,
          limit: PAGE_SIZE,
          raw: true,
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
        pageNew: pageNew,
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getPromotionById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let data = await db.Promotion.findOne({
          where: { id: id },
        });
        if (data && data.image) {
          data.image = new Buffer.from(data.image, "base64").toString("binary");
        }
        if (data) {
          resolve({
            errCode: 0,
            data: data,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getNewById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let data = await db.News.findOne({
          where: { id: id },
        });
        if (data && data.image) {
          data.image = new Buffer.from(data.image, "base64").toString("binary");
        }
        if (data) {
          resolve({
            errCode: 0,
            data: data,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let putUpdateNew = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.nameVi || !data.nameEn || !data.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let newData = await db.News.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (newData) {
          newData.nameVi = data.nameVi;
          newData.nameEn = data.nameEn;
          if (data.image) {
            newData.image = data.image;
          }
          newData.contentHTML_Vi = data.contentHTML_Vi;
          newData.contentMarkdown_Vi = data.contentMarkdown_Vi;
          newData.contentHTML_En = data.contentHTML_En;
          newData.contentMarkdown_En = data.contentMarkdown_En;

          await newData.save();
        } else {
          resolve({
            errCode: 2,
            errMessage: "Update New error",
          });
        }
      }
      resolve({
        errCode: 0,
        errMessage: "Update New success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let putUpdatePromotion = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.nameVi || !data.nameEn || !data.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let newData = await db.Promotion.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (newData) {
          newData.nameVi = data.nameVi;
          newData.nameEn = data.nameEn;
          if (data.image) {
            newData.image = data.image;
          }
          newData.contentHTML_Vi = data.contentHTML_Vi;
          newData.contentMarkdown_Vi = data.contentMarkdown_Vi;
          newData.contentHTML_En = data.contentHTML_En;
          newData.contentMarkdown_En = data.contentMarkdown_En;

          await newData.save();
        } else {
          resolve({
            errCode: 2,
            errMessage: "Update New error",
          });
        }
      }
      resolve({
        errCode: 0,
        errMessage: "Update New success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let postDeleteNew = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let newDelete = await db.News.destroy({
          where: { id: id },
        });
        if (newDelete) {
          resolve({
            errCode: 0,
            errMessage: "Delete the new success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Delete the new error",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let postDeletePromotion = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing requird parameter !",
        });
      } else {
        let newDelete = await db.Promise.destroy({
          where: { id: id },
        });
        if (newDelete) {
          resolve({
            errCode: 0,
            errMessage: "Delete the new success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Delete the new error",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postCreateNew,
  postCreatePromotion,
  getAllNewPage,
  getAllPromotionPage,
  getPromotionById,
  getNewById,
  putUpdateNew,
  putUpdatePromotion,
  postDeleteNew,
  postDeletePromotion,
};
