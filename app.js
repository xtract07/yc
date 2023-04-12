const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

// middleware that logs api calls with status codes
const morgan = require('morgan');

const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;


// database connection
db.on("error",console.error.bind(console,"connection error : "));
db.once("open",()=>{
    console.log('Database connected');
})


app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


// parse the body for the post request 
app.use(express.urlencoded({extended:true}));

// put and delete function in forms
app.use(methodOverride('_method'));

app.use(morgan('common'))

app.engine('ejs',ejsMate); 

app.get('/',(req,res)=>{
    console.log(`request date :: ${req.requestTime}`)
    res.render('home')
})

app.get('/campground/new',async (req,res)=>{
    res.render('campgrounds/new');
})


app.get('/campground/:id',async (req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show',{campground});
})


app.get('/campgrounds',async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
})


app.post('/campgrounds',async (req,res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campground/${campground._id}`);
})


app.get('/campground/:id/edit',async (req,res) =>{
    console.log(req.params);
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit',{campground});
})


app.put('/campground/:id',async (req,res)=>{
    const {id} = req.params;
    console.log("executing PUT request");
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campground/${campground._id}`);
})

app.delete('/campground/:id',async (req,res)=>{
    const {id} = req.params;
    console.log("Executing delete request");
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.get('/dogs',(req,res)=>{

    res.send("woof woof");

});


// runs the function that opens 2000
app.listen(3000, ()=>{
    console.log('Serving at port 3000')
})


app.use((req,res)=>{
    res.status(400).send("Not found!");
})