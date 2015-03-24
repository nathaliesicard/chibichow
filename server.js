var koa = require('koa');
var static = require('koa-static');
var gzip = require('koa-gzip');
var router = require('koa-router');
var bodyParser = require('koa-body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var app = koa();
app.use(gzip());
app.use(static('public'));

app.use(bodyParser());


app.use(router(app));

var transporter = nodemailer.createTransport(smtpTransport({
    port: 587,
    host: 'smtp.mandrillapp.com',
    auth: {
        user: 'nathalie.sicard@gmail.com',
        pass: 'YwZ_ZZFmFIdJtERN_luT5g'
    }
}));



function sendEmail(text) {
    return new Promise(function(resolve, reject) {
        transporter.sendMail({
            from: 'contact@chibichow.com', // sender address
            to: 'nathalie.sicard@gmail.com', // list of receivers
            subject: 'ChibiChow Contact Us',
            text: text
        }, function (error, info) {
            if (error) {
                console.error('Got send mail error: ', error);
                reject(error);
            } else {
                console.log('Message sent: ', info.response);
                resolve();
            }
        });
    });
}

app.post('/contact', function*() {
    console.log('Contact us form was run!', this.request.body.name);

    yield sendEmail('A contact us was submitted with: ' + JSON.stringify(this.request.body));


    this.body = 'Tu mensaje ha sido enviado. Gracias!';
});


app.use(function *(){
    this.response.status = 404;
    this.body = 'File not found! Please go to chibichow.com and start again';
});


var port = process.env.PORT || 4000;

app.listen(port, function() {
    console.log('Listening on port ' + port + ', go to http://localhost:' + port + '/ ');
});