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
            // Functions will traverse the listing page in order to retrieve the URL & product name
            $('div.product-list').each(function traverseDiv1() {
                $(this).children().each(function traverseDiv2() {
                    $(this).children().each(function traverseDiv3() {
                        if ($(this).hasClass('name')) {
                            // Once we have reached the proper section, store the name and URL
                            $(this).children().each(function traverseDiv4() {
                                // Retrieve URL & product name
                                const ProductUrlLink = $(this).attr('href');
                                const productName = $(this).text();

                                // Remove filter from URL
                                const ProductUrl = S(ProductUrlLink).chompRight(`?limit=${config.links.total_products}`).s;

                                // Obtain UID for Product Name
                                const id = S(ProductUrl).chompLeft('https://phdminerals.com/Minerals/').s;

                                // Store results in Redis in order to use that information
                                const client = redis.createClient();

                                // Connect to Redis Server
                                client.on('connect', () => {
                                    // This is the hash that will be stored in Redis
                                    const hash = `products:${id}`;

                                    // Check if the key is already present in redis
                                    // if the product is there already we skip it
                                    // Otherwise we store it in Redis
                                    client.exists(hash, (err, reply) => {
                                        if (reply === 1) {
                                            console.log(`Key ${hash} is already in Redis, skip`);
                                        } else {
                                            client.hmset(hash, 'uid', id, 'name', productName, 'link', url);
                                            console.log(`Added key ${hash} to Redis.`);
                                        }
                                    });
                                });
                            });
                        }
                    });
                });
            });
        }
    });
};

module.exports.getLinks = getLinks;
