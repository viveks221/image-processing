const { DEFAULT_DIMENSION } = require('../../constants');
const safePromise  = require('./safe-promise');
const { Jimp, path } = require ('../../helpers/npm');
const { DIR, ASSET_PATH } = require('../../config');
async function thumbnail ({newFilePath, height, width, timezoneData}){
//Adding watermark and creating thumbnails
  const multipleThumbnail = [];
  const [thumbnailImageError, thumbnailImage] = await safePromise(Jimp.read(newFilePath));
  if (thumbnailImageError) {
    throw thumbnailImageError
  }
  const pathObj = path.parse(newFilePath);
  const dimension = (height.length || width.length) ? (height.length > width.length ? height : width) : [DEFAULT_DIMENSION,DEFAULT_DIMENSION];
  const isHeight = height.length > width.length ? true : false;
  dimension.forEach(function (item,index) {  
    const curHeight = height[index] || (isHeight ? item : DEFAULT_DIMENSION);
    const curWidth = width[index] || (isHeight ? DEFAULT_DIMENSION : item);
    const resize =`${timezoneData}_${pathObj.name}(${curHeight}x${curWidth}).${pathObj.ext}`;
    const thumbnail = path.resolve(`${DIR}`,`${ASSET_PATH}`,resize) ;
    thumbnailImage.resize(curHeight,curWidth).quality(90);
    thumbnailImage.write(thumbnail);
    multipleThumbnail.push(thumbnail);
  })
  return multipleThumbnail;
}
module.exports = thumbnail;