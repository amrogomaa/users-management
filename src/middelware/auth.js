const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async(req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, `${process.env.JWT_KEY}`)
        const user = await User.findOne({ username : decoded.username })

        if(!user){
            throw new Error(`can't find user, please authenticate !`)
        }

        userTokens = user.dataValues.tokens.split(';')
        const tokenIsExist = userTokens.find(tok => tok === token)

        if(tokenIsExist === undefined){
            throw new Error('Please Authenticate !')
        }

        req.token = token
        req.user = user
        next()

    } catch(e){
        res.status(401).send({ error : 'pleas authenticate !' })
    }


}






module.exports = auth