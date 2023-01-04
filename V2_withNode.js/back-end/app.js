const http = require('http');
const fs = require('fs');

//New Promises way:
//const fs = require('fs').promises;

const hostname = '127.0.0.1';
const port = 3000;

/*function getIndexHTML(inpReq) {
  if (inpReq.URL )
}*/

/*
let indexFile;

const requestListener = function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  res.writeHead(200);
  res.end(indexFile);
}

const server = http.createServer(requestListener);

fs.readFile('../front-end/index.html').then(contents => {
  indexFile = contents;

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}).catch(error => {
  console.log(`Could not read index.html file: ${error}`);
  process.exit(1);
});*/

const getGlobalCSS = function (request, response) {
  if (request.url === '/global.css') {
    response.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('../front-end/global.css', {encoding: 'utf8'});
    response.write(fileContents);
  }
}

const getIndexHTML = function (request, response) {
  //if (request.url === '.../front-end/index.html') {
  if (request.url === '/') {
    response.writeHead(200, {'Content-type' : 'text/html'});
    var fileContents = fs.readFileSync('../front-end/index.html', {encoding: 'utf8'});
    response.write(fileContents);
  }
}

/*const getScriptJS = function (request, response) {
  if (request.url === '/script.js') {
    response.writeHead(200, {'Content-type' : 'module'});
    var fileContents = fs.readFileSync('../front-end/script.js');
    response.write(fileContents);
  }
}*/

//This function takes a Request object and a response object
//Uses methods on request object will be handled to response object
//Req = desscription of input/url, response = has methods and things that you use to tell what it needs to respond with
const server = http.createServer((req, res) => {
    res.statusCode = 200; //200 = all good code; 300 = warning (llokup to confirm), 400 = wtf errors (requests), 500 = server errors
    
    getGlobalCSS(req, res);
    getIndexHTML(req, res);
    //getScriptJS(req, res);
    
    //Produces MIME error:
    //res.setHeader('Content-Type', 'text/html');

    //Comment this out IF using Promises way:
    //res.setHeader('Content-Type', 'text/html');

    //res.end('<h1>Hello World</h1>');

    //Comment these two out IF using Promises way:
    //html = fs.readFileSync('../front-end/index.html'); //. = current directory, .. = parent directory 
    //css = fs.readFileSync('../front-end/global.css');

    //-+res.write(css);

    //Sample CSS body routine:
    /*res.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('../front-end/global.css', {encoding: 'utf8'});
    res.write(fileContents);*/

    //make getIndexHTML()
    //make getGlobalCSS()

    //createServer() function will handle routes
    //If my URL is /html, then I will call my getIndexHTML() and do whatever with response obj
    //If my rquest.URL is global.css, then I will call my getGlobalCSS()
    //Should look like a bunch if, else-if statements looking for routes at the end 
    //Goal: get it to produce same thing as static-html display
    //Once Goal is done, go into SQLite
    //npm install sqlite3
    
    console.log(req.url);
    res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});