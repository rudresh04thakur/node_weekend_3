var http = require('http');
function initPage(page_body, page_title = 'Home Page', page_css = '', page_js = '', page_footer = 'CopyRight : 2019') {

    c_body = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <title>${page_title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    ${page_css}
    ${page_js}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    </head>
    <body>

    <nav class="navbar navbar-default">
    <div class="container-fluid">
    <div class="navbar-header">
    <a class="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul class="nav navbar-nav">
    <li class="active"><a href="/">Home</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
    </ul>
    </div>
    </nav>
    <div class="container">
    ${page_body}
    </div>
    </body>
    </html>`

    return c_body;
}

http.createServer(function (req, res, next) {
    console.log("URL ========> ", req.url)
    console.log("Method ========> ", req.method)
    if (req.url == '/' && req.method == 'GET') {
        res.writeHead(200, { "content-type": 'text/html' });
        inner_body = '<h3>Basic Navbar Example</h3>';
        inner_body += '<p>A navigation bar is a navigation header that is placed at the top of the page.</p>';
        res.end(initPage(inner_body))
    } else if (req.url == '/login' && req.method == 'GET') {
        res.writeHead(200, { "content-type": 'text/html' });
        inner_body = `
            <form action="/login" method="post" class="form col-md-6 col-md-offset-3" style="border: 3px double silver; padding:20px; 
            border-radius:5px">
                <div class="form-group">
                    <label>Email</label>
                    <input class="form-control" placeholder="User Name" type="email" name="email" />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input class="form-control" placeholder="Password" type="password" name="password" />
                </div>
                <div class="form-group">
                    <button class="btn btn-success pull-right" type="submit">Login</button>
                </div>
            </form>`;
        res.end(initPage(inner_body))
    } else if (req.url == '/login' && req.method == 'POST') {
        req.on('data', function (data) {
            console.log("Total Data : "+data)
            // console.log('Email: ' + data['email'])
            // console.log('Password: ' + data['password'])
        })
        req.on('end', function () {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('post received')
        })
    }

}).listen(3000, "localhost");
console.log("Server Run at http://localhost:3000")