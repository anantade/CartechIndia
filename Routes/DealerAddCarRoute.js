
const {Router} = require('express')
const addCarRoute = Router()
const {addCar,getCarById,getAllCar,editCarById} = require('../Controllers/DealerAddCarController')
const {checkRole} = require('../MIddlewares/DealerMiddleware')

addCarRoute.post('/cartechIndia/addCar/:role',checkRole,addCar)
addCarRoute.get('/cartechIndia/getCarById/:role/:id',checkRole,getCarById)
addCarRoute.get('/cartechIndia/getAllCar/:role',checkRole,getAllCar)
addCarRoute.patch('/cartechIndia/editCar/:role/:id',checkRole,editCarById)

module.exports = {addCarRoute}