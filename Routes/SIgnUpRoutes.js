
const {Router} = require('express')
const SingUprouter = Router()
const {signUp} = require('../Controllers/SIgnUpController')

SingUprouter.post('/cartechIndia/signUp',signUp)

module.exports = SingUprouter