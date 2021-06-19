const { DataTypes } = require('sequelize')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sequelize = require('../db/sequalize')


const User = sequelize.define('User', {//attributes starts from here !
        firstName: { 
            type: DataTypes.STRING,
             allowNull: false 
            },
        lastName: {
             type: DataTypes.STRING,
              allowNull: false 
            },
        username: {
             type: DataTypes.STRING,
              allowNull: false,
              primaryKey: true 
            },
         email: {
                type: DataTypes.STRING,
                allowNull:false,
                unique: true,
                validate(value) {
                    if (!validator.isEmail(value)) {
                        throw new Error('Email is invalid')
                    }
                }
            },
        password: {
             type: DataTypes.STRING,
             allowNull: false,
             validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"')
                }
            } 
            },
        age : {
                 type: DataTypes.INTEGER,
                  allowNull: true,
                  validate(value) {
                    if (value < 0) {
                        throw new Error('Age must be a postive number')
                    }
                } 
            },
        tokens: {
                type: DataTypes.TEXT,
                defaultValue : '',
                get(){
                    // check if the tokens array is null, if not null return array of tokens if null return [] instead of empty string ''
                    return this.getDataValue('tokens').length > 0 ? this.getDataValue('tokens').split(';') : []
                },
                set(tok){
                    this.setDataValue('tokens', tok.join(';'))
                },
             }
    }
    ,{// end of attributes and  options starts from here !
        
        defaultScope: {
            // exclude password by default
            // attributes: { exclude: ['password'] }
        },
        scopes: {
            // include password with this scope
            withpassword: { attributes: {}, }
        },
        timestamps: true,
        logging: false,


    }// end of options
)

// before every 'save' process check if the user passowrd changed if yes >> hash the new password before saving if no >> do nothing then save
User.addHook('beforeSave', async(user, options)=>{
    if(user.changed('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
})

// instance method to generate authentication token
// we use the regular function expression because the arrow function doesnot bind this keyword
User.prototype.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ username: user.username }, 'IamAmrGomaa')
    user.tokens = [...user.tokens, token]

    await user.save()
    return token
}

// when logging in check first if this user have an account already
// static method
User.findByCridentials = async (email, password) => {
    const user = await User.findOne({ email })
    console.log(user);
    if(!user){
        throw new Error('Unable to login !')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login !')
    }
    return user
}

User.sync() // to keep the data syncronized with the database
module.exports = User;