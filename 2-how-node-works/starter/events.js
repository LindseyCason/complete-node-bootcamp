const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  //This Sales Class inherites everything from EventEmitter
  constructor() {
    super(); //This gives us access to evrything in the super class, in this case EventEmitter
  }
}
const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});
myEmitter.on("newSale", () => {
  console.log("Customer's name is Lindsey");
});

myEmitter.on("newSale", stock => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9); //The second item is an arguement and can be used in a listener
/////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Recieved");
  res.end("Request Rcvd");
});
server.on("request", (req, res) => {
  console.log("Request Recieved");
});
server.on("close", () => {
  console.log("Server Closed");
});

server.listen(8001, "127.0.0.1", () => {
  console.log("Waiting for request...");
});
