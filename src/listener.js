const http = require("http");
const log = require("./log.js");
const config = require("../config.json");


module.exports = () => {
    log.verbose("Listener instantiated");
    http.createServer((request, response) => {
        let reqId = Math.floor(Math.random() * 1000) + 1;
        log.info("Request received:", request.url, "| Request ID:", reqId);

        // Add logic to check which provider will be chosen to evaluate if local data is available
        // let provider = {};

        var options = {
            hostname: 'www.google.com',
            port: 80,
            path: request.url,
            method: 'GET'
        };
        log.verbose("Redirecting the request", "| Request ID:", reqId);
        var proxy = http.request(options, function (res) {
            log.verbose("Attaching response of redirected request", "| Request ID:", reqId);
            res.pipe(response, {
                end: true
            });
        });
        request.pipe(proxy, {
            end: true
        });


    }).listen(config.listenerPort);
    log.verbose("Listener started");

    return this;
};