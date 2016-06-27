# README #

### Rock-API project ###

* Quick summary

The project will consist of 2 main features :
1. Create scrapers that will retrieve relevant data from website and store them in Redis and Mongo DB.
2. Create a RESTful API that will allow to GET, POST, PUT & DELETE products and users using hapi JS Framework

You can read more details in Wiki : [https://bitbucket.org/limrol/rock-api/wiki/Home](Link URL)

* Version 0.0.1

### How do I get set up? ###

* Summary of set up

1. Make sure you have Node JS, Redis and Mongo DB installed
2. Clone the repo into chosen directory and move to that directory
3. Run the following commands 

```
npm install
node server.js 
redis-cli < scripts/regions_redis_import_script 
redis-cli < scripts/typess_redis_import_script 
```
4. You can now scrape the website by calling the following URLS :

localhost:8080/scrape-link
localhost:8080/scrape-region
localhost:8080/scrape-type 
localhost:8080/scrape-products
etc .. 

* Configuration

You can update the configs of Mongo DB in config/config.js

* Dependencies

All the package dependencies are located in package.json file

* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner : [https://github.com/alormil/](Link URL)
* Other community or team contact