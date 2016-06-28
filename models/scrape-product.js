require('../config/config');
const request = require('request');
const cheerio = require('cheerio');
const redis = require('redis');

const saveProductInDB = function(uid, name, link, text, json) {
    const string = "{\"author\": \"admin\",\"dateCreated\": \"" + Date.now() + "\",\"descriptions\": [{\"author\": \"admin\",\"dateCreated\": \"" + Date.now() + "\",\"language\": \"English\",\"lastUpdated\": \"" + Date.now() + "\",\"text\": \"" + text + "\"}],\"lastUpdated\": \"" + Date.now() + "\",\"link\": \"" + link + "\",\"name\": \"" + name + "\",\"uid\": \"" + uid + "\"}";
    json = string;

    request({
        url: 'http://localhost:8080/types',
        method: 'POST',
        json: JSON.parse(json),
    }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Type :${name} was added to MongoDB`);
        }
    });
};

/*
 *
 * This function takes the Product uid, gets the info from Redis , crawls the website and stores it in MongoDB
 *
 */
const getProduct = function parseProductPage(uid) {
    // Using the uid, we can obtain the Redis key that will contain the link of the product to scrape
    const hkey = `products:${uid}`;

    // We will store These results in Redis in order to use that information in order script
    const client = redis.createClient();

    // Connect to Redis Server
    client.on('connect', () => {
        let name;
        let link;
        // We will retrieve the values of the name of the Region and link in Redis
        client.hgetall(hkey, (err, object) => {
            object.forEach(key => {
                if (key === 'name') {
                    name = object[key];
                }
                if (key === 'link') {
                    link = object[key];
                }
            });


            // The structure of our request call
            // The first parameter is our URL
            // The callback function takes 3 parameters, an error, response status code and the html
            request(link, (error, response, html) => {
                // First we'll check to make sure no errors occurred when making the request
                if (!error) {
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                    const $ = cheerio.load(html);
                }
            });
        });
    });
};

module.exports.getProduct = getProduct;
