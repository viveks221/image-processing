const { padding, opacity } = require('../../constants');
const { Jimp } = require ('../../helpers/npm');
async function watermarkAdd({image, watermark, placement}){
  image.composite(watermark, placement[0]+padding, placement[1]+padding, { mode:Jimp.BLEND_SOURCE_OVER,opacitySource: opacity });
  return image;
}

module.exports = watermarkAdd;