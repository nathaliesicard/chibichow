var koa = require('koa');
var static = require('koa-static');
var gzip = require('koa-gzip');

var app = koa();
app.use(gzip());
app.use(static('public'));

app.use(function *(){
    this.response.status = 404;
    this.body = 'File not found! Please go to chibichow.com and start again';
});


var port = process.env.PORT || 4000;

app.listen(port, function() {
    console.log('Listening on port ' + port + ', go to http://localhost:' + port + '/ ');
});