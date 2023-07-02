// importing
const express = require('express');
const cors = require('cors')
const multer = require('multer');
const ImageModel = require('./src/Model/imageDB')
// const { create, readAll, remove, update,simpleFunction } = require('./crudoperator')

//initialization
const app = express();
// const movieRoute = require('./src/Routes/movieRoute')
const recipeRoute = require('./src/Routes/recipeRoute')
const path = require('path');


//middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));
// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ storage: storage }).single('image');

// Direct the request to movieRoute.js
app.use('/api/recipe',recipeRoute)

app.post('/upload', (req, res) => {
    upload(req,res,(err)=>{
       if(err){
        console.log(err)
       }else{
        const newImage = new ImageModel({
            filename: req.file.filename,
            originalName: req.file.originalname,
            contentType: req.file.mimetype
          });
          newImage.save()
          .then(() => {
            res.status(200).json('Image uploaded successfully');
          })
          .catch(err => {
            res.status(400).json('Error: ' + err);
          });
       }     
    })
  
  
    
  });
//port
app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname 
    ,'/build/index.html')); });

// app.get('/*',(req,res)=>{
//     res.send("Recipe App")
// })
app.listen(3000,()=>{
    console.log("app is working on port 3000");

})