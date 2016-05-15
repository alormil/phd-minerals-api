// DEPENDENCIES
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var S = require('string');
var redis = require('redis');

// APP DECLARATION
var app     = express();

/*
*
* You can easily determine the total number of products by visiting : https://phdminerals.com/Minerals?limit=XXXXXX
* And passing a large number, at the end of the page you see the number of total products as it will all fit in one page.
* We will use that value in order to obtain all the values in one page.
*/
var total_products = 812; 

app.get('/scrape', function(req, res){

    // The URL we will scrape from 

    url = 'https://phdminerals.com/Minerals?limit=' + total_products;

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // These functions will traverse the listing page in order to retrieve the URL and the product name

            $('div.product-list').each(function(i, element){
      			$(this).children().each(function(i, element){
      					$(this).children().each(function(i, element){
      							
      					    // Once we have reached the proper section, we will store the name and URL

      						if ( $(this).hasClass('name') ) {

      							$(this).children().each(function(i, element){
      								
      								// Retrieve URL & product name
      								var url = $(this).attr('href'); 
      								var product_name = $(this).text();

      								// Remove filter from URL
      								url = S(url).chompRight('?limit=' + total_products).s;

      								// Obtain UID for Product Name
      								var id = S(url).chompLeft('https://phdminerals.com/Minerals/').s;

      								// We will store These results in Redis in order to use that information in order script
      								var client = redis.createClient(); 

      								// Connect to Redis Server
      								client.on('connect', function() {

      									// This is the hash that will be stored in Redis
      									var hash = 'products:' + id;

      									// We check if the key is already present in redis if the product is there already we skip it
      									// Otherwise we store it in Redis
      									client.exists(hash, function(err, reply) {
    										if (reply === 1) {
        										console.log('Key '+ hash +' is already in Redis, skip ...');
    										} 
    										else {
    											client.hmset(hash, 'uid', id, 'name', product_name, 'link', url);
        										console.log('Added key ' + hash + ' to Redis.');
    										}
										});

									});

      							});
      						}
      					});
      			});

      			// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
				res.send('Check your console!')
    		});

            
        }
    })

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;