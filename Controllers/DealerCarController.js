const formidable = require("formidable");
const path = require("path");
const CarRegister = require("../Model/Dealer Car/CarRegisterSchema");
const CarImage = require("../Model/Dealer Car/CarImages");
const CarDocument = require("../Model/Dealer Car/CarDocuments");

const addCar = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ message: "Request is empty" });
    }

    const result = await CarRegister.create(body);

    return res.status(200).json({ message: "Successfull" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const addCarImages = async (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: path.join(__dirname, "../uploads"),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "File upload failed", details: err });
    }

    const carId = fields.carId?.[0]; // formidable v3 keeps fields as arrays

    let savedImages = [];

    if (files.images) {
      const images = Array.isArray(files.images)
        ? files.images
        : [files.images];

      for (const file of images) {
        const newImage = await CarImage.create({
          carId,
          url: `/uploads/${path.basename(file.filepath)}`,
          metadata: {
            fileName: file.originalFilename,
            fileSize: file.size,
            fileType: file.mimetype,
          },
        });
        savedImages.push(newImage);
      }
    }

    res.status(200).json({
      message: "Images uploaded successfully",
    });
  });
};

const getCarImagesbyId = async (req, res) => {
  try {
    const { carId } = req.params;
    if (!carId) {
      return res.status(400).json({ message: "Id is not found" });
    }

    const result = await CarImage.find({ carId });
    if (!result) {
      return res.status(400).json({ message: "No car Found" });
    }
    return res.status(200).json({ message: "Success", result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteCarImages = async(req,res) => {
     try {
      const {id} = req.params
       
      const result = await CarImage.findByIdAndDelete(id)

       if (!result) {
        return  res.status(400).json({message : 'Car is not found'})
       }
       return res.status(200).json({message : 'Success'})
     } catch (error) {
      return  res.json({message : error.message})
     }
}

const addCarDocuments = async (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: path.join(__dirname, "../uploads"),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "File upload failed",
        details: err.message,
      });
    }

    // ⚡️ Fix: Access fields properly (they are arrays in formidable v3)
    const carId = fields.carId ? fields.carId[0] : null;
    const docType = fields.type ? fields.type[0] : null;

    if (!carId || !docType) {
      return res.status(400).json({ message: "carId and type are required" });
    }

    // ⚡️ Fix: Handle file structure
    let file = files.document;
    if (Array.isArray(file)) {
      file = file[0]; // pick first file if multiple
    }

    if (!file) {
      return res.status(400).json({ message: "No document uploaded" });
    }

    const newDoc = await CarDocument.create({
      carId,
      type: docType,
      url: `/uploads/${path.basename(file.filepath)}`, // file.filepath is always defined in v3
      metadata: {
        fileName: file.originalFilename,
        fileSize: file.size,
        fileType: file.mimetype,
      },
    });

    res.status(200).json({
      message: "Document uploaded successfully",
      document: newDoc,
    });
  });
};

const getCarDocumentById = async(req,res) => {
try {
    const { carId } = req.params;
    if (!carId) {
      return res.status(400).json({ message: "Id is not found" });
    }

    const result = await CarDocument.find({ carId });
    if (!result) {
      return res.status(400).json({ message: "No car Found" });
    }
    return res.status(200).json({ message: "Success", result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

const deleteCarDocument = async(req,res) => {
     try {
      const {id} = req.params
       
      const result = await CarDocument.findByIdAndDelete(id)

       if (!result) {
        return  res.status(400).json({message : 'Car is not found'})
       }
       return res.status(200).json({message : 'Success'})
     } catch (error) {
      return  res.json({message : error.message})
     }
}

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ message: "Id not found" });
    }

    const result = await CarRegister.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.json({ msg: "Success", result });
  } catch (error) {
    res.json({ msg: error });
  }
};

const getAllCar = async (req, res) => {
  try {
    // Extract dealerId from JWT payload
    const dealerId = req.user.id;

    if (!dealerId) {
      return res.status(401).json({ message: "Unauthorized: dealerId missing" });
    }

    // Get pagination params
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive numbers" });
    }

    // Count cars for this dealer
    const totalCars = await CarRegister.countDocuments({ dealerId });

    // Fetch paginated results in reverse order (latest first)
    const result = await CarRegister.find({ dealerId })
      .sort({ createdAt: -1 }) // 👈 latest cars first
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      message: "Success",
      dealerId,
      totalCars,
      currentPage: page,
      totalPages: Math.ceil(totalCars / limit),
      cars: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!id || !body) {
      return res.status(400).json({ message: "Id or data not found" });
    }

    const result = await CarRegister.findByIdAndUpdate(
      id,
      { $set: body }, // update only provided fields
      { new: true, runValidators: true } // return updated doc + apply schema validation
    );

    if (!result) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ msg: "Car updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  addCar,
  getCarById,
  getAllCar,
  editCarById,
  addCarImages,
  addCarDocuments,
  getCarImagesbyId,
  getCarDocumentById,
  deleteCarDocument,
  deleteCarImages
};
