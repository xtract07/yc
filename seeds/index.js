const mongoose = require('mongoose');
const Trek = require('./models/trekingPlace');
const 

mongoose.connect('mongodb://localhost:27017/shreak-trek',{
    useUnifiedTopology : true,
});

const db = mongoose.connection;
db.on("error",console.error.bind("connection error : "));
db.once("open",()=>{
    console.log("Database connected");
})

const seedDB = async() =>{
    await Trek.deleteAll();
    for(let i=0;i!=5;i++){
        
    }
    
}

seedDB();
