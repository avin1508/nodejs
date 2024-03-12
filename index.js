const http = require('http');

const myserver = http.createServer((request, response) => {
  console.log(request);
  response.end("hello from http server");
});

myserver.listen(8000, () => console.log("server started at port number 8000"));
