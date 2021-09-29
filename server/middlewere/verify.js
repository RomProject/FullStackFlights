const jwt = require('jsonwebtoken')

const usersOnly =  (req,res,next) =>{
    console.log(req.headers.authorization);
    jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET,(err,payload)=>{

        if(err){
            return res.status(400).send(err)

        }

        req.user = payload 
        next()


    })


}


module.exports = {usersOnly}