var Twitter = require('twitter-node-client').Twitter;

var config = {
    	"consumerKey": "hbOU1pfUSWt3jXKJUu5Y5pMMT",
    	"consumerSecret": "eOO1LCmJdEuSMySlP2mewrhwX6xUvHgLNfH8tcwIy8EVDNEof5",
    	"accessToken": "714958449323454468-VOEhP0EQrFDS9hC1STBeMPrb3cALSDQ",
    	"accessTokenSecret": "urZnQ5jTcPMTWxPZ9IzWVqPIxM8OglvKrRc67TUFcFkec",
    	"callBackUrl": ""
	};

var twitter = new Twitter(config);

const http = require('http');
const url = require('url');
const port = 3000;

const requestHandler = (request, response) => {
	var params = url.parse(request.url,true).query;
	console.log(params);
	var query = params.query;

	console.log(request.url.substring(0,request.url.indexOf("?")));

	if(request.url.substring(0,request.url.indexOf("?")) == '/get') {
		twitter.getSearch({'q': '$' + query + '-? -RT', 'lang' : 'en', 'result_type' : 'recent'},
			(err) => {/*pass*/},
			(data) => response.end(data)
		);
		return;
	}
	response.end(request.url);
}

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
	if(err) {
		return console.log('something bad happened', err);
	}
	console.log(`server is listening on ${port}`);
})