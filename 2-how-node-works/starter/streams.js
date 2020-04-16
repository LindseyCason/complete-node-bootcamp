const fs = require("fs"); //require file system
const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //Solution2: Streams
  //   const readable = fs.createReadStream("test-file.txt"); //When a piece of the file's data is available, it emits an event called data. we listen and when the data is emited, we write that chunk of data. See Below
  //   readable.on("data", chunk => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     //When the entire file is done, it emits an end event. Then we can end the response like below.
  //     res.end(); //no more data will be written to this stream
  //   });

  //   readable.on("error", err => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File Not Found");
  //   });

  //Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8001, "127.0.0.1", () => {
  console.log("Listening...");
});
