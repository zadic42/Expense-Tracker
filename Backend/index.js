//Import required dependencies
const express = require('express') ;
const dotenv = require('dotenv') ;
const cors = require('cors') ;
const mongoose = require('mongoose') ;
const Routes = require('./routes/Router') ;

//Initilize the dependencies
const app = express() ;
dotenv.config() ;

//Middleware
app.use(cors()) ;
app.use(express.json()) ;

//Routes
app.use('/expense' , Routes) ;

//MongoDB connection
const mongo_URI = process.env.MONGO_URI ;
mongoose.connect(mongo_URI)
.then(() => console.log('MongoDB is connected'))
.catch((error) => console.log('Error occured' , error));

//Server
const PORT = process.env.PORT || 3000 ;
app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`) ;
});