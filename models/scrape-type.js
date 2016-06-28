require('../config/config');
const request = require('request');
const cheerio = require('cheerio');
const S = require('string');
const redis = require('redis');

const saveTypeInDB = (uid, name, link, text) => {
    const json = "{\"uid\": \"" + uid + "\",\"name\": \"" + name + "\",\"link\": \"" + link + "\",\"dateCreated\": \"" + Date.now() + "\",\"author\": \"admin\",\"lastUpdated\": \"" + Date.now() + "\",\"images\": [{\"title\": \"\",\"link\": \"\",\"dateCreated\": \"" + Date.now() + "\",\"author\": \"admin\",\"lastUpdated\": \"" + Date.now() + "\"}],\"descriptions\": [{\"language\": \"English\",\"text\": \"" + text + "\",\"dateCreated\": \"" + Date.now() + "\",\"author\": \"admin\",\"lastUpdated\": \"" + Date.now() + "\"}]}";

    request({
        url: 'http://localhost:8080/types',
        method: 'POST',
        json: JSON.parse(json)
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
 * This function takes the Type uid, gets the info from Redis , crawls the website and stores it in MongoDB
 *
 */
const getType = function parseTypePage(uid) {

    // Using the uid, we can obtain the Redis key that will contain the link of the product to scrape
    const hkey = `types:${uid}`;

    // Initializing variables that will be used to store data
    let name;
    let link;
    let text;

    // We will store These results in Redis in order to use that information in order script
    const client = redis.createClient();

    // Connect to Redis Server
    client.on('connect', () => {
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
                    let description = '';
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                    const $ = cheerio.load(html);

                    $('div.breadcrumb').nextUntil('div.product-filter').each(() => {
                        if ($(this).is('h1') !== 1) {
                            text = $(this).text();
                            description = description + text;
                        }
                    });
                    // Clean the text string to remove all invalide characters that would invalidate JSON file
                    text = text.replace(/(\r\n|\n|\r)/gm, '');
                    text = text.trim();
                    text = text.toString().replace(/"/g, '\\"');
                    text = text.replace(/[|&;$%@<>()+]/g, '');
                    saveTypeInDB(uid, name, link, text);
                }
            });
        });
    });
};

module.exports.getType = getType;
