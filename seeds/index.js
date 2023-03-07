const mongoose = require('mongoose');
const Campground = require('.././models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useUnifiedTopology : true,
    useNewUrlParser : true,
});

const db = mongoose.connection;
db.on("error",console.error.bind("connection error : "));
db.once("open",()=>{
    console.log("Database connected");
})

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i=0;i!=50;i++){
        const random =  Math.floor(Math.random() * cities.length);
        const randomDescriptor = descriptors[Math.floor(Math.random()*descriptors.length)];
        const randomPlaces = descriptors[Math.floor(Math.random() * places.length)];
        const camp = new Campground({
            location : `${cities[random].city},${cities[random].state}`,
            title : `${randomDescriptor} ${randomPlaces}`,
        })

        await camp.save();
    }
}


seedDB().then(()=>{
    mongoose.connection.close();
});