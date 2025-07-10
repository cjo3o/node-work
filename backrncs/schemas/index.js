const mongoose = require("mongoose");

require("dotenv").config();

const mongo_url =process.env.MONGO_URL;

const connect = ()=>{
    mongoose.connect(mongo_url,{ dbName:'rncs' })
        .then(()=>{
            console.log("Mongo DB Connected!")
        })
        .catch((err)=>{
            console.error('Mongo DB Error',err);
        });
}

module.exports = connect;