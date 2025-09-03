
const {Router} = require('express')
const SingUprouter = Router()
const {signUp,signIn} = require('../Controllers/SIgnUpController')

SingUprouter.post('/cartechIndia/signUp',signUp)
SingUprouter.post('/cartechIndia/signIn',signIn)

module.exports = SingUprouter