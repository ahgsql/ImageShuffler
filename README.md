# Image Shuffler

Image to Image Encryption (entry level)

![npm bundle size](https://img.shields.io/bundlephobia/min/imageshuffler) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/imageshuffler) [![npm downloads](https://img.shields.io/npm/dt/imageshuffler)](https://www.npmjs.com/package/imageshuffler) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]

## Installation

```bash
npm install imageshuffler
yarn add imageshuffler
```

## Usage

### Encryption

```jsx
const imgShuffler = require("imageshuffler");
imgShuffler.encryptImage("picture.png", "someSecretKey");
```

### Decryption

target file parameter is not mandatory.

```jsx
const imgShuffler = require("imageshuffler");
imgShuffler.decryptImage("hidden.png", "someSecretKey", "target_file.png");
```

![Original](https://i.ibb.co/g49299h/res.png "Original")
![Encrypted](https://i.ibb.co/m0kTn3V/res-enc.png "Encrypted")

## License

MIT © [ahgsql](https://github.com/ahgsql)
