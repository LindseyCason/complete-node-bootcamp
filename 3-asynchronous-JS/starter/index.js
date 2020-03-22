const fs = require("fs");
const superagent = require("superagent");

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Could not write file");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`); //Get breed from file
    console.log(`Breed: ${data}`); //log breed just to check if working

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    ); //send req to api with breed inserted, promise will be saved to variable res
    console.log(res.body.message);

    ///awaiting multiple promises

    const res1Pro = superagent.get(
      //save promise to var and remove await
      `https://dog.ceo/api/breed/${data}/images/random`
    ); //send req to api with breed inserted
    const res2Pro = superagent.get(
      //save promise to var and remove await
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      //save promise to var and remove await
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);
    console.log(res.body.message);

    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Written to file");
  } catch (err) {
    throw err;
  }
  return "2: Ready!";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics");
  } catch (err) {
    console.log("Error!");
  }
})();

// console.log("1: Will get dog pics");
// getDogPic()
//   .then(x => {
//     console.log(x);
//     console.log("3: Done getting dog pics");
//   })
//   .catch(err => {
//     console.log("ERROR!!");
//   });

//THE KEY TO CHAINING PROMISES IS TO RETURN THE REQUEST TO CREATE A PROMISE AND THEN YOU CAN CHAIN THE THEN ON TO IT.

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //RETURN PROMISE
//   })
//   .then(res => {
//     //ATTACH THEN
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message); //RETURN PROMISE
//   })
//   .then(() => {
//     //ATTACH THEN
//     console.log("Random Dog Image Saved to File");
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
