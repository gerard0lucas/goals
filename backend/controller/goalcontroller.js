const { count } = require('console')
const asynchandler = require('express-async-handler')
const goal = require('../models/goalmodel')
const users = require('../models/usermodel')

//get goals
const getgoals = asynchandler(async(req,res) =>{
    const goals = await goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//post goals
const setgoals = asynchandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add text field')
    }
    const goals = await goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.json(goals)
}
)

//update goals
const putgoals = asynchandler(async(req,res) =>{
    const goals = await goal.findById(req.params.id)

    if(!goals){
        res.status(400)
        throw new Error('goal id not found')
    }

    const user = await users.findById(req.user.id)
    // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goals.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }


    const updatedgoal = await goal.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
        })
    res.status(200).json(updatedgoal)
   
})

//remove goals
const deletegoals = asynchandler(async(req,res) =>{
    const goals = await goal.findById(req.params.id)

    if(!goals){
        res.status(400)
        throw new Error('goal id not found')
    }

     // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goals.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
    

    await goals.remove() 
    res.json({id: req.params.id})
})


module.exports = {
    getgoals,
    setgoals,
    putgoals,
    deletegoals,
}