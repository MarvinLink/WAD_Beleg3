const mongoose = require("mongoose");

const ContactsSchema = mongoose.Schema({
    firstname: {
        type: String,
        required : true
    },
    lastname: {
        type: String,
        required : false
    },
    StreetAndNumber:{
        type: String,
        required : true

    }, 
    zip:{
        type : Number,
        required : true
    }, 
    city:{
        type: String,
        required : false
    },
    country:{
        type: String,
        required: false
    },
    phone:{
        type: Number,
        required: false
    },
    dateOfBirth:{
        type: Date,
        required: false
    },
    owner: {
        type: JSON,
        required: true,
    },
    vis:{
        type: Boolean,
        required : false,
        default: false
    },
    

});
module.exports = mongoose.model("contacts", ContactsSchema);