const mongoose = require("mongoose");

const queryDetailsSchema = mongoose.Schema({
    user_id: String,
    user_type: String,
    query_subject: String,
    query_desc: String,
    query_response: String
})

const queryDetailsModel = mongoose.model("Queries", queryDetailsSchema);

module.exports.queryDetailsModel = queryDetailsModel;