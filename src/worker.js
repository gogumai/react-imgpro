const processImage = require('./utils/options');
const defaultCdn =
  'https://cdn.rawgit.com/gogumai/dd588b494b3272b0bdba8269d860c18c/raw/dc35d89d2d41ad590f5ec6b2145acaaa4f456bb8/jimp.min.js';

module.exports = function worker(self) {
  self.onmessage = function(e) {
    // how to ensure Jimp can work?
    try {
      if (!Jimp) {
      }
    } catch (error) {
      const { customCdn } = e.data;
      const cdn = customCdn ? customCdn : defaultCdn;
      importScripts(cdn);
    }

    Jimp.read(e.data.image).then(function(image) {
      processImage(image, e.data.props, Jimp).getBase64(Jimp.AUTO, function(
        err,
        src
      ) {
        self.postMessage({ src, err });
      });
    });
  };
};
