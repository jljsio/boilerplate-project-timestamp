// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", (request, response) => {
  console.log(request.params.date)
  let datetime;
  
  // Attempt to parse date if not null
  if (!request.params.date) {
    datetime = new Date();
  } else {
    datetime = new Date(request.params.date);
    if (datetime.toUTCString() === 'Invalid Date') {
      datetime = new Date(request.params.date * 1000);
    }
  }
  
  // Construct Object
  let datetimeObject = {unix: datetime.getTime(), utc: datetime.toUTCString()};
  
  // Check if date is invalid
  if (datetimeObject.utc === 'Invalid Date') {
    datetimeObject = {error: 'Invalid Date'}
  }
  
  console.log(datetimeObject);
  response.json(datetimeObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
