const mongoose = require("mongoose");

//task schema id will be assigned directyly by mongo
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Company", companySchema);