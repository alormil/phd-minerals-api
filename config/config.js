/*
 *
 * Config file used to modify the parameters to connect to the Mongo DB accross the project.
 *
 */

module.exports = {
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'phd',
    },
    /*
     *
     * You can easily determine the total number of products by visiting :
     * https://phdminerals.com/Minerals?limit=XXXXXX
     * And passing a large number, at the end of the page you see the number of total products
     * as it will all fit in one page.
     * We will use that value in order to obtain all the values in one page.
     */
    links: {
        url: 'https://phdminerals.com/Minerals?limit=',
        total_products: 817,
    },
};
