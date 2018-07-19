'use strict';

var http = require('http'); // do not change this line
var url = require('url'); // do not change this line
var querystring = require('querystring'); // do not change this line



var server = http.createServer(function (req, res) {
        if (req.url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('you have accessed the root');
        }
        else if (req.url.startsWith('/test/')) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            var word = req.url.replace('/test/', '');
            res.end('you have accessed "' + word + '" within test');
        }

        else if (req.url.startsWith('/attributes')) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            var parse = url.parse(req.url);

            var tableString = "<table border='1'>";

            if (!(parse.query === null)) {
                var queries = parse.query.split('&');

                for (var i = 0; i < queries.length; i++) {
                    tableString += "<tr>";
                    var q = queries[i].split('=');
                    for (var j = 0; j < q.length; j++) {
                        tableString += "<td>" +q[j] + "</td>";
                    }
                    tableString += "</tr>";
                }
            }
            tableString += '</table>';
            res.end(tableString);
        }
        else {
            res.end();
        }
});

server.listen(process.env.PORT || 8080);
// http://localhost:8080/ should return 'you have accessed the root' in plain text

// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>