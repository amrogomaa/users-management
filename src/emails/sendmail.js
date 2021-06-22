const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)

const sendWelcomeMail = (email, name, token)=>{
    try{
        sgMail.send({
            to: email,
            from: 'amroabdulbassetgomaa@gmail.com',
            subject: 'Thanks for joining in',
            text: `Hello ${name}, Welcome to our site, let us know how you get along with our app! `,
            html: `
            <h2>To Activate your Account Please Click on This Link</h2>
            <a href=${process.env.CLIENT_URL}/authentication/activation/${token}>Click here</a>
            `
        })
    } catch(e){
        console.log(e);
    }
}


const sendCancelationMail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'amroabdulbassetgomaa@gmail.com',
        subject: 'goodbye, Hope we see you soon !',
        text: `Hi ${name}, We are sorry That you are leaving, tell us if we can improve our site experience !`
    })
}

module.exports = {
    sendWelcomeMail,
    sendCancelationMail
}