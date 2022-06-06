const errorhandler = (err, req, res, next)=>{
      const statuscode = res.statuscode ? res.statuscode:500
      res.status(statuscode).json({message:err.message})
}


module.exports ={errorhandler}