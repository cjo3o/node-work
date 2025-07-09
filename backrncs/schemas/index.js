const mongoose = require("mongoose");


const mongo_url ="mongodb+srv://cjo3o:sUpqvAbi6UMdOQlR@cluster0.9jmknoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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