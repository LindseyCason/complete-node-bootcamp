const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

//////////////FILES//////////////

// // BLOCKING SYNCRONOUS WAY
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)

// const textOut = `This is what we know about the Avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written...")

// // NONBLOCKING ASYNC WAY

// fs.readFile("./txt/start.txt", "utf-8", (err, data1)=>{
//     if (err) return console.log('ERROR!')
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2)=>{
//            console.log(data2)
//            fs.readFile(`./txt/append.txt`, "utf-8", (err, data3)=>{
//             console.log(data3)

//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`,"utf-8", (err)=>{
//                 console.log("Your file has been written! ")

//             })
//      });
//     });
// });

/////////////SERVER//////////////

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview-template.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product-template.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(e => slugify(e.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHTML = dataObj.map(e => replaceTemplate(tempCard, e)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    res.writeHead(200, { "Content-type": "text/html" });
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API PAGE
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    //NOT FOUND
  } else if (pathname === "/cart") {
    res.end("THIS IS YOUR SHOPPING CART");
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h3>PAGE NOT FOUND, SORRY!</h3>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is Listening on port 8000");
});
