const Jimp = require("jimp");
var ss = require("seededshuffle");
const path = require("path");

async function encryptImage(file, key) {
  let imgArr = [];
  let w, h;
  let image = await Jimp.read(file);

  w = image.bitmap.width; //  width of the image
  h = image.bitmap.height;
  for (let x = 0; x < w; x++) {
    let row = [];
    for (let y = 0; y < h; y++) {
      let colr = image.getPixelColor(x, y);
      let colorRgba = Jimp.intToRGBA(colr);

      row.push(colorRgba);
    }
    imgArr.push(row);
  }
  ss.shuffle(imgArr, key);
  for (let a = 0; a < imgArr.length; a++) {
    ss.shuffle(imgArr[a], key);
  }
  let hidden = new Jimp(w, h);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let rgba = imgArr[x][y];
      let colorArr = [rgba.r, rgba.g, rgba.b];
      ss.shuffle(colorArr, key);
      let clr = Jimp.rgbaToInt(colorArr[0], colorArr[1], colorArr[2], rgba.a);
      hidden.setPixelColor(clr, x, y);
    }
  }
  let fileInfo = path.parse(file);
  let newName = fileInfo.name + "_enc" + fileInfo.ext;
  hidden.write("." + fileInfo.dir + "/" + newName);
}
async function decryptImage(file, key, target = null) {
  let imgArr = [];
  let w, h;
  let image = await Jimp.read(file);

  w = image.bitmap.width; //  width of the image
  h = image.bitmap.height;
  for (let x = 0; x < w; x++) {
    let row = [];
    for (let y = 0; y < h; y++) {
      let colr = image.getPixelColor(x, y);
      row.push(Jimp.intToRGBA(colr));
    }
    imgArr.push(row);
  }
  for (let a = 0; a < imgArr.length; a++) {
    ss.unshuffle(imgArr[a], key);
  }
  ss.unshuffle(imgArr, key);

  let reveal = new Jimp(w, h);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let rgba = imgArr[x][y];
      let colorArr = [rgba.r, rgba.g, rgba.b];
      ss.unshuffle(colorArr, key);
      let clr = Jimp.rgbaToInt(colorArr[0], colorArr[1], colorArr[2], rgba.a);
      reveal.setPixelColor(clr, x, y);
    }
  }
  if (target == null) {
    let fileInfo = path.parse(file);
    let newName = fileInfo.name + "_dec" + fileInfo.ext;
    target = "." + fileInfo.dir + "/" + newName;
  }
  reveal.write(target);
}

module.exports = { encryptImage, decryptImage };
