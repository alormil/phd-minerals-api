const config = require('../config/config');
const request = require('request');
const cheerio = require('cheerio');
const S = require('string');
const redis = require('redis');

const getLinks = () => {
    const url = config.links.url + config.links.total_products;

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    request(url, (error, response, html) => {
        if (!error) {
            const $ = cheerio.load(html);
            // Next, we'll utilize the cheerio library on the returned html
            // which will essentially give us jQuery functionality
            // These functions will traverse the listing page in order to retrieve the URL & product name

            $('div.product-list').each(function(i, element) {
                $(this).children().each(function(i, element) {
                    $(this).children().each(function(i, element) {

                        // Once we have reached the proper section, we will store the name and URL

                        if ($(this).hasClass('name')) {

                            $(this).children().each(function(i, element) {

                                // Retrieve URL & product name
                                const url = $(this).attr('href');
                                const product_name = $(this).text();

                                // Remove filter from URL
                                url = S(url).chompRight('?limit=' + config.links.total_products).s;

                                // Obtain UID for Product Name
                                const id = S(url).chompLeft('https://phdminerals.com/Minerals/').s;

                                // We will store These results in Redis in order to use that information in order script
                                const client = redis.createClient();

                                // Connect to Redis Server
                                client.on('connect', function() {

                                    // This is the hash that will be stored in Redis
                                    const hash = 'products:' + id;

                                    // We check if the key is already present in redis if the product is there already we skip it
                                    // Otherwise we store it in Redis
                                    client.exists(hash, function(err, reply) {
                                        if (reply === 1) {
                                            console.log('Key ' + hash + ' is already in Redis, skip ...');
                                        } else {
                                            client.hmset(hash, 'uid', id, 'name', product_name, 'link', url);
                                            console.log('Added key ' + hash + ' to Redis.');
                                        }
                                    });

                                });

                            });
                        }
                    });
                });
            });
        }
    })
};

module.exports.getLinks = getLinks;
