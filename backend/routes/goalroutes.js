const express = require("express")
const router = express.Router()
const{getgoals,setgoals,putgoals,deletegoals} = require('../controller/goalcontroller')
const {protect} = require('../middleware/authmiddleware')

router.route('/').get(protect, getgoals).post(protect, setgoals)

router.route('/:id').put(protect, putgoals).delete(protect, deletegoals)


module.exports = router; 