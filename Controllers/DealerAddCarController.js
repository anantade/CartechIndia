
const CarRegister = require("../Model/CarRegisterSchema");

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

const getCarById = async(req,res) => {
    try {
        const {id} = req.params
        if (!id) {
            return res.json({message : 'Id not found'})
        }

        const result = await CarRegister.findById(id)
         
        if (!result) {
      return res.status(404).json({ message: "Car not found" });
    }

        return res.json({msg : 'Success',result})
    } catch (error) {
        res.json({msg : error})
    }
}

const getAllCar = async(req,res) => {
   try {
     const result = await CarRegister.find()

     if (!result) {
        return res.status(404).json({ message: "No Car found" });
     }

     res.status(200).json({message : "Success",result})
   } catch (error) {
    return res.status(500).json({ message: error });
   }
}

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

module.exports = { addCar,getCarById,getAllCar,editCarById };
