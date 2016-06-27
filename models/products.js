const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @module  Region
 * @description contain the details of Attribute
 */

const DescriptionSchema = new Schema({

    language: String,

    text: String,

    dateCreated: Date,

    lastUpdated: { type: Date, default: Date.now },

    author: String,

});

const PriceSchema = new Schema({

    currency: String,

    price: Number,

});

const PictureSchema = new Schema({

    size: String,

    link: String,

    dateCreated: Date,

    lastUpdated: { type: Date, default: Date.now },

    author: String,

});

const ImageSchema = new Schema({

    main: Number,

    title: String,

    sequence: Number,

    dateCreated: Date,

    lastUpdated: { type: Date, default: Date.now },

    author: String,

    pictures: [PictureSchema],

});


const ProductSchema = new Schema({

    /**
      Unique identifier. It can only contain string, is required and unique field which is indexed.
    */
    uid: { type: String, unique: true, required: true },

    /**
      Region name. It can only contain string, is required field.
    */
    name: { type: String, required: true },

    /**
      Region URL. It can only contain string, is required field.
    */

    link: { type: String, required: true },

    /**
      Region URL. It can only contain string, is required field.
    */

    type: { type: String, required: true },

    /**
      Region URL. It can only contain string, is required field.
    */

    dimensions: { type: String, required: true },

    /**
      Region URL. It can only contain string, is required field.
    */

    availability: { type: String, required: true },

    /**
      Region URL. It can only contain string, is required field.
    */

    weigth: { type: String, required: true },

    /**
      Region URL. It can only contain string, is required field.
    */

    size: { type: String, required: true },

    /**
      Type Description which will contain the language, the text itself, the date it was created,
      updated and the author. It can only contain string, is required field.
    */
    origin: [String],

    /**
      Type Description which will contain the language, the text itself, the date it was created,
      updated and the author. It can only contain string, is required field.
    */
    prices: [PriceSchema],

    /**
      Type Description which will contain the language, the text itself, the date it was created,
      updated and the author. It can only contain string, is required field.
    */
    descriptions: [DescriptionSchema],

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

    /**
      Type Description which will contain the language, the text itself, the date it was created,
      updated and the author. It can only contain string, is required field.
    */
    tags: [String],

    /**
      Type Description which will contain the language, the text itself, the date it was created,
      updated and the author. It can only contain string, is required field.
    */
    featured: Number,

    /**
      Type Description which will contain the language, the text itself, the date it was created,
      updated and the author. It can only contain string, is required field.
    */
    images: [ImageSchema],

});

const products = mongoose.model('products', ProductSchema);

/** export schema */
module.exports = {
    Products: products,
};
