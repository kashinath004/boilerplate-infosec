const express = require('express');
const app = express();
const helmet = require('helmet');
const ninetyDaysInSeconds= 90 * 60 * 24 * 60 // 1 year in seconds
app.use(helmet({
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  },
  hsts: {
    maxAge: ninetyDaysInSeconds,
    force: true
  },
  dnsPrefetchControl: false // disabled for demonstration
}));

app.disable('x-powered-by');














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
