const express = require('express');
const app = express();
const PORT = 5000;
const HOST = 'localhost';
const birthPage = require('./routes/birthPage');
require('dotenv').config();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/scripts'));
app.use(express.urlencoded({
	extended: true
}));

app.use(birthPage);
app.get('/', (req, res) => {
	res.render('index');
});



app.listen(PORT, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});