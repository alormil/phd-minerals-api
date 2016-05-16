'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of Attribute  
*/

var RegionSchema = new Schema({

  /** 
    Unique identifier. It can only contain string, is required and unique field which is indexed.
  */
  uid : { type: String, unique: true, required: true },

  /** 
    Region name. It can only contain string, is required field.
  */
  name : { type: String, required: true },

  /** 
    Region URL. It can only contain string, is required field.
  */
  link : { type: String, required: true },

});

var region = mongoose.model('region', RegionSchema);

/** export schema */
module.exports = {
  Region : region
};