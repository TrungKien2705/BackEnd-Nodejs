import newService from "../services/newService";

let postCreateNew = async (req, res) => {
  try {
    let data = await newService.postCreateNew(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postCreatePromotion = async (req, res) => {
  try {
    let data = await newService.postCreatePromotion(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getAllPromotionPage = async (req, res) => {
  try {
    let data = await newService.getAllPromotionPage(req.query.page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};
let getAllNewPage = async (req, res) => {
  try {
    let data = await newService.getAllNewPage(req.query.page);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let getPromotionById = async (req, res) => {
  try {
    let data = await newService.getPromotionById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};
let getNewById = async (req, res) => {
  try {
    let data = await newService.getNewById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let putUpdateNew = async (req, res) => {
  try {
    let data = await newService.putUpdateNew(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let putUpdatePromotion = async (req, res) => {
  try {
    let data = await newService.putUpdatePromotion(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postDeleteNew = async (req, res) => {
  try {
    let data = await newService.postDeleteNew(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server !",
    });
  }
};

let postDeletePromotion = async (req, res) => {
  try {
    let data = await newService.postDeletePromotion(req.body.id);
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
  postCreateNew,
  postCreatePromotion,
  getAllPromotionPage,
  getAllNewPage,
  getPromotionById,
  getNewById,
  putUpdateNew,
  putUpdatePromotion,
  postDeleteNew,
  postDeletePromotion,
};
