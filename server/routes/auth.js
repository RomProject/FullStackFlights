const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const {myData} = require('../database/db')

router.post('/register', async (req,res)=>{
    try {
        const {username,password,fname,lname} = req.body
        if(!username || !password || !fname || !lname){
            return res.status(400).send({info:"Missing Info"})

        }
        const all_username = await myData ('select username from users')
        const taken_user = all_username.find(user=>user.username == username)
        if(taken_user){
           return res.status(400).send({info:'Username is taken '})

        }


        const hashedpass = await bcrypt.hash(password,10)

        const set_user = await myData(`INSERT INTO users(username,password,lname,fname)
        VALUES("${username}","${hashedpass}","${lname}","${fname}")`)

        console.log(set_user);
        res.status(200).send({sucsses:`Sucess user ${username} is now Registerd`})
        
        





    } catch (err) {
        console.log(err);
    }



})


router.post('/login', async (req,res)=>{
    try {
        const {username,password} = req.body
        if(!username || !password){
            return res.status(400).send({loginfo:'Missing info'})

        }

        const usersArr = await myData(`select username,password,id,is_admin from users`)
        const find_user = usersArr.find(user=>user.username == username)
        if(!find_user){
            return res.status(400).send({loginfo:'User not found'})

        }

        const verify_pass = await myData(`select password from users`)
        if(!(await bcrypt.compare(password,find_user.password))){
            res.status(400).send({loginfo:'Worng Password'})

        }


        const user_id = await myData('select id from users')

        const token = jwt.sign(
            {
             id:find_user.id,
             username:find_user.username ,
             is_admin:find_user.is_admin

         },
            process.env.TOKEN_SECRET,
            {
                expiresIn:"20m"

            }

        


        )
           
        res.status(200).send({token,username}) 
        
        

        
        

        
        
      




        

        
    } catch (err) {
        console.log(err);
    }







})











module.exports = router