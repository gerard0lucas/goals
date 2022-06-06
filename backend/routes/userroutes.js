const express = require("express")
const router = express.Router()
const{registerUser,loginUser,getUser} = require('../controller/usercontroller')
const {protect} = require('../middleware/authmiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getUser)

module.exports = router;