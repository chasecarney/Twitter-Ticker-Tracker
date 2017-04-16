//call back functions
var error = function (err, response, body) {
	console.log('ERROR', err);
};
	var success = function (data) {
	data = JSON.parse(data);
	for(var x in data.statuses)
		console.log(data.statuses[x].text);
};

var Twitter = require('twitter-node-client').Twitter;

var config = {
    	"consumerKey": "hbOU1pfUSWt3jXKJUu5Y5pMMT",
    	"consumerSecret": "eOO1LCmJdEuSMySlP2mewrhwX6xUvHgLNfH8tcwIy8EVDNEof5",
    	"accessToken": "714958449323454468-VOEhP0EQrFDS9hC1STBeMPrb3cALSDQ",
    	"accessTokenSecret": "urZnQ5jTcPMTWxPZ9IzWVqPIxM8OglvKrRc67TUFcFkec",
    	"callBackUrl": ""
	};

var twitter = new Twitter(config);

function search()
{
	twitter.getSearch({'q':'$JNUG'}, error, success);
}