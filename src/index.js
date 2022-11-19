const http = require("http");
const { routes } = require("./api/routes");

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer(routes);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
