'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
  * @module  Type
  * @description contain the details of Attribute  
*/

var DescriptionSchema = new Schema ({

  language: String, 

  text: String, 

  dateCreated: Date, 
  
  lastUpdated: { type: Date, default: Date.now }, 

  author: String 

});

var ImageSchema = new Schema ({

  title: String, 

  link: String, 

  dateCreated: Date, 
  
  lastUpdated: { type: Date, default: Date.now }, 

  author: String 

});

var TypeSchema = new Schema({

  /** 
    Unique identifier. It can only contain string, is required and unique field which is indexed.
  */
  uid : { type: String, unique: true, required: true },

  /** 
    Type name. It can only contain string, is required field.
  */
  name : { type: String, required: true },

  /** 
    Type URL. It can only contain string, is required field.
  */
  link : { type: String, required: true },

  /** 
    Type Description which will contain the language, the text itself, the date it was created, updated and the author. It can only contain string, is required field.
  */
  descriptions : [ DescriptionSchema ],

  /** 
    Type Description which will contain the language, the text itself, the date it was created, updated and the author. It can only contain string, is required field.
  */
  images : [ ImageSchema ],

  /** 
    Type Date Creation. It will contain date
  */
  dateCreated: Date,

  /** 
    Type Date last updated. It will contain date
  */
  lastUpdated: { type: Date, default: Date.now },
  
   /** 
    Type Date author name. It will contain String
  */ 
  author: String,
});

var types = mongoose.model('types', TypeSchema);

/** export schema */
module.exports = {
  Types : types
};