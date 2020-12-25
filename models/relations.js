const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationSchema = new Schema({
    username1:{type:String,required:true},
    relation:{type:String,required:true},
    username2:{type:String,required:true},
});

const Relations = mongoose.model("Relation", relationSchema);

module.exports = Relations;