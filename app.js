const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

//config
dotenv.config({ path: './config.env' });

//connected to database
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false 
    })
    .then(()=>{
      console.log(`MongoDB Connected`);
    })
    .catch((err)=>{
     console.log(err)    
    })
   
  };
  connectDB();

  //middleware
app.use(cors());
//body-parser
app.use(bodyParser.json())


const port = 4000;
//listning of server
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});