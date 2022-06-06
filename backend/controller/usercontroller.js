const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const users = require('../models/usermodel')

//.......Function to genearting token........
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,)
}

//register new user
//post request
const registerUser = asynchandler(async(req, res) =>{
const {name, email, password} =req.body

if(!name || !email || !password ){
    res.status(400)
    throw new Error('please add all fields')
}

const userExists = await users.findOne({email})
if(userExists ){
    res.status(400)
    throw new Error('user exist already')
}
//hash password
const salt = await bcrypt.genSalt(10)
const hashedpassword = await bcrypt.hash(password,salt)

// create user
const user = await users.create({
    name,
    email,
    password:hashedpassword,
})
  if(user){
      res.status(201).json({
          id:user.id,
          name:user.name,
          email:user.email,
          password:user.password,
          token: generateToken(user.id),
      })
  }
  else{
    res.status(400)
    throw new Error('invadid user data')
  }

})

// login or auth new user 
//post request
//..../login
const loginUser = asynchandler(async(req, res) =>{
    const {email, password} =req.body

if(!email || !password ){
    res.status(400)
    throw new Error('please add all fields')
}

const user = await users.findOne({email})

if(user && (await bcrypt.compare(password,user.password))){
    res.json({
        id:user.id,
        name:user.name,
        email:user.email,
        token: generateToken(user.id),  
    })
}
else {
    res.status(400)
    throw new Error('incorrect credentials')
}


    res.json({message: 'login user'})
})
 
//get user data
//get request
//...../me
const getUser = asynchandler(async(req, res) =>{
    const {id, name, email} = await users.findById(req.user.id)
    res.status(200).json({
        id:id,
        name:name,
        email:email

    })


})


module.exports = {
    registerUser,
    loginUser,
    getUser,
}