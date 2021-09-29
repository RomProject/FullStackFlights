const router = require('express').Router()



const {myData} = require('../database/db')
const {usersOnly} = require('../middlewere/verify')






router.get('/users' ,async (req,res)=>{
    try {
       const userType = await myData('select * from users') 
       res.status(200).send(userType)

    } catch (err) {
        console.log(err);
        
    }

})


router.get('/', usersOnly,async (req,res)=>{
    try {
        const getVac = await myData("SELECT place,descrip,start_date,end_date,price,picture,id from vacations")   
        res.status(200).send(getVac)


    } catch (err) {
        console.log(err);
    }
 


})


router.get('/place', async(req,res)=>{
    try {
       
        const places= await myData(`SELECT vacations.* ,count(distinct followers.user_id) as followers 
        FROM vacations left join followers 
        on vacations.id = followers.vacation_id left join users 
        on followers.user_id = users.id group by id
`)
        
        
     
     
        
       return res.send(places)
        

    } catch (err) {
        console.log(err);
    }


})




router.post('/add', async (req,res)=>{
try {
    const {descrip,place,price,start_date,end_date,picture} = req.body
const addVac = await myData(`insert into vacations(descrip,place,price,start_date,end_date,picture)
values("${descrip}","${place}","${price}","${start_date}","${end_date}","${picture}")`)

    res.status(200).send({some:"Vacation Uploaded"})



    
} catch (err) {
    console.log(err);
    
}



} )


router.delete('/delete', async (req,res)=>{
    const {id} = req.body
    try {
        const delVac = await myData(`DELETE from vacations where vacations.id = ${id}`)
        res.status(200).send({some:'Vacation deleted'})
        
    } catch (err) {
        console.log(err);
    }


})


router.get('/follow/:id',async (req,res)=>{
    try {
        const vac_follow = await myData(`select  count(vacation_id) from followers  where vacation_id =${req.params.id}`)
        res.send(vac_follow)
        console.log(vac_follow);

        
    } catch (err) {
        console.log(err);
        
    }


})




router.post('/like', usersOnly, async (req,res)=>{
    try {
        console.log(req.body)
        
        const {user_id,vacation_id} = req.body
        const like_vac = await myData(`insert into followers(user_id,vacation_id) values(${user_id},${vacation_id})`)
        
        res.status(200).send()
        

        
    } catch (err) {
      res.status(500).send()
        console.log(err)
        
    }



})




router.post('/editvac', async (req,res)=>{
 
    const{id,descrip,place,price,start_date,end_date,picture}=req.body
    try {

        const updateVac = await myData(`UPDATE vacations SET descrip = '${descrip}',place ='${place}',price=${price},start_date='${start_date}',end_date='${end_date}',picture='${picture}' WHERE id=${id}`)
       res.status(200).send({ans:"Vacation updated"})
    } catch (err) {


        res.status(500).send(err)
        console.log(err);
    }


})











module.exports = router