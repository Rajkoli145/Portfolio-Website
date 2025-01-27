const http = require('http')
const fs = require('fs')
const fileContent = fs.readFileSync('index.html')

const server = http.createServer((req, res)=>{
  if (req.url === '/api/contact') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const formData = JSON.parse(body);
        console.log(formData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Message received successfully!' }));
      });
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
  } else {
    res.writeHead (200, { 'Content-type':'text/html'});
    res.end(fileContent)
  }
})

server.listen(80, '127.0.0.1', ()=>{
  console.log("Listening on port 80")
})
