const express = require('express')
const userRouter = require('./routers/user')
require('./db/sequalize')

const app = express()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(userRouter)


// app.post('/users', async(req, res)=>{
//     const user = User.build(req.body)

//     try{
//         await user.save();
//         console.log('user was saved to the database!');
//         res.status(201).send('Created Successfully !')
//     }catch(e){
//         res.status(500).send(e);

//     }
// })

app.listen(port, ()=>{
    console.log('Successfully connected to port '+ port);
})











// var sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
  
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     },
  
//     // SQLite only
//     storage: 'path/to/database.sqlite'
//   });
  
//   // Or you can simply use a connection uri
//   var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');