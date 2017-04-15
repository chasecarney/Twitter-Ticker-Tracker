//call back functions
var error = function (err, response, body) {
	console.log('ERROR [%s]', err);
};
	var success = function (data) {
	console.log('Data [%s]', data);
};

var Twitter = require('twitter-node-client').Twitter;

var twitter = new Twitter();

function search()
{
	console.log(twitter.getSearch({'q':'$JNUG','result\_type':'popular'},error,success));
}