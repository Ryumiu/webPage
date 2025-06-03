const http = require('http');
const hostname = '127.0.0.1'; // Esto significa "localhost"
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('¡Hola desde mi servidor Node.js!\n');
  });

server.listen(port, hostname, () => {
console.log(`Servidor corriendo en http://<span class="math-inline">\{hostname\}\:</span>{port}/`);
});
  