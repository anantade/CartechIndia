const { Router } = require("express");
const addCarRoute = Router();
const {
  addCar,
  getCarById,
  getAllCar,
  editCarById,
  addCarDocuments,
  addCarImages,
  getCarImagesbyId,
  getCarDocumentById,
  deleteCarDocument,
  deleteCarImages,
} = require("../Controllers/DealerCarController");

const authMiddleware = require("../MIddlewares/JWTmiddleware");

const { checkRole } = require("../MIddlewares/DealerMiddleware");

// Routes
addCarRoute.post(
  "/cartechIndia/addCar/:role",
  checkRole,
  authMiddleware,
  addCar
);
addCarRoute.post(
  "/cartechIndia/addCarImages/:role",
  checkRole,
  authMiddleware,
  addCarImages
);
addCarRoute.get(
  "/cartechIndia/getCarImagesById/:role/:carId",
  checkRole,
  authMiddleware,
  getCarImagesbyId
);
addCarRoute.delete(
  "/cartechIndia/deleteCarImagesById/:role/:id",
  checkRole,
  authMiddleware,
  deleteCarImages
);
addCarRoute.post(
  "/cartechIndia/addCarDocument/:role",
  checkRole,
  addCarDocuments,
  authMiddleware
);
addCarRoute.get(
  "/cartechIndia/getCarDocumentsById/:role/:carId",
  checkRole,
  authMiddleware,
  getCarDocumentById
);
addCarRoute.delete(
  "/cartechIndia/deleteCarDocumentsById/:role/:id",
  checkRole,
  authMiddleware,
  deleteCarDocument
);
addCarRoute.get(
  "/cartechIndia/getCarById/:role/:id",
  checkRole,
  authMiddleware,
  getCarById
);
addCarRoute.get(
  "/cartechIndia/getAllCar/:role",
  checkRole,
  authMiddleware,
  authMiddleware,
  getAllCar
);
addCarRoute.patch(
  "/cartechIndia/editCar/:role/:id",
  checkRole,
  authMiddleware,
  editCarById
);

module.exports = { addCarRoute };
