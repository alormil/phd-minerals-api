var config = require('../config/config');
var request = require('request');
var cheerio = require('cheerio');
var S = require('string');
var redis = require('redis');

var saveRegionInDB = function(uid, name, link, text, json) {

    var string = "{\"author\": \"admin\",\"dateCreated\": \"" + Date.now() + "\",\"descriptions\": [{\"author\": \"admin\",\"dateCreated\": \"" + Date.now() + "\",\"language\": \"English\",\"lastUpdated\": \"" + Date.now() + "\",\"text\": \"" + text + "\"}],\"lastUpdated\": \"" + Date.now() + "\",\"link\": \"" + link + "\",\"name\": \"" + name + "\",\"uid\": \"" + uid + "\"}";
    json = string;

    request({
        url: 'http://localhost:8080/regions',
        method: 'POST',
        //Lets post the following key/values as form
        json: JSON.parse(json)
    }, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            //console.log("Region : " + name + " was added to MongoDB");
        }
    });
};

/*
 * 
 * This function takes the Region uid, gets the info from Redis , crawls the website and stores it in MongoDB
 *
 */
var getOneRegion = function(uid) {

    // Using the uid, we can obtain the Redis key that will contain the link of the product to scrape
    var hkey = "regions:" + uid;

    // Initializing variables that will be used to store data
    var name, link, text;

    // We will store These results in Redis in order to use that information in order script
    var client = redis.createClient();

    // Connect to Redis Server
    client.on('connect', function() {

        // We will retrieve the values of the name of the Region and link in Redis
        client.hgetall(hkey, function(err, object) {

            for (var key in object) {
                if (key == "name")
                    name = object[key];
                else if (key == "link")
                    link = object[key];
            }

            // The structure of our request call
            // The first parameter is our URL
            // The callback function takes 3 parameters, an error, response status code and the html
            request(link, function(error, response, html) {
                // First we'll check to make sure no errors occurred when making the request
                if (!error) {
                    
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                    var $ = cheerio.load(html);

                    // We scrape the paragraph with the description of the Region
                    $('div.category-info').each(function(i, element) {
                        $(this).children().each(function(i, element) {

                            text = $(this).text();

                            var json;
                            saveRegionInDB(uid, name, link, text, json);

                        });
                    });
                }
            })
        });
    });
};

module.exports.getOneRegion = getOneRegion;
