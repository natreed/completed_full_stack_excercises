'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line


var server = http.createServer(function (req, res) {
    var globMessages = {};
    if (req.url === "/form") {
        //http://localhost:8080/form should return the form as shown below
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write('<!DOCTYPE html>');
        res.write('<html>');
        res.write('<body>');
        res.write('<form action="/new" method="post">');
        res.write('<input type="text" name="name">');
        res.write('<input type="text" name="message">');
        res.write('<input type="submit" value="submit">');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');

        res.end(
        );
    }

    else if (req.url === "/new") {
        var strBuffer = '';
        req.setEncoding('utf-8');

        req.on('end', function () {
            var objectParsed = qs.parse(strBuffer);

            globMessages.push({
                'strName': objectParsed.name || '',
                'strMessage': objectParsed.message || ''
            })

            res.writeHead(302, {
                'Location': '/'
            });


            res.end('thank you for your message');
        })
    }

    else if (req.url === "/new") {
        var strBuffer = '';
        req.setEncoding('utf-8');

        req.on('end', function () {
            var objectParsed = qs.parse(strBuffer);

            globMessages.push({
                'strName': objectParsed.name || '',
                'strMessage': objectParsed.message || ''
            })

            res.writeHead(302, {
                'Location': '/'
            });

            res.write('<!DOCTYPE html>');
            res.write('<html>');
            res.write('<body>');
            res.write('<form action="/new" method="post">');
            res.write('<input type="text" name="name">');
            res.write('<input type="text" name="message">');
            res.write('<input type="submit" value="submit">');
            res.write('</form>');
            res.write('</body>');
            res.write('</html>');

            res.end(
            );

            res.end('thank you for your message');
        })


    }
});

server.listen(process.env.PORT || 8080);
// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown above

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text