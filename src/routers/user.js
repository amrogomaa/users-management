const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async(req, res)=>{
    // const user = User.build(req.body)
    const user = new User(req.body)
    
    try{
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({message:'Created Successfully !', token})
    }catch(e){
        console.log(e);
        res.status(500).send(e);

    }
})

router.post('/users/login', async(req, res)=>{
    try {
        const user = await User.findByCridentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({code : 1, message: 'Logged in Successfully!', data: {user, token} })
    } catch (e) {
        console.log(e);
        res.status(404).send({ code: 0, message: 'Cant log in' , e})
    }

})


router.post('/users/login/reset', async(req, res) => {

})

module.exports = router