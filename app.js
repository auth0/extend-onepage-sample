require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const request = require('request');

const app = express();

const extendContainer = process.env.EXTEND_CONTAINER;
const extendURL = `https://${extendContainer}.run.webtask.io/`;
const extendToken = process.env.EXTEND_TOKEN;

app.use(express.static('public'));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('index', { token:extendToken, container:extendContainer });
});

app.post('/saveCustomer', (req, res) => {
	let data = req.body;
	console.log('i was sent: '+JSON.stringify(data));
	// call extension
	let options = {
		method:'POST',
		url:extendURL +'saveLead',
		headers:{'Authorization':`Bearer ${extendToken}`},
		json:req.body
	};

	request(options, function(error, response, body) {
		if(error) throw new Error(error);
		res.end(JSON.stringify(body));
	});

});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Express running on http://localhost:' + app.get('port'));
});