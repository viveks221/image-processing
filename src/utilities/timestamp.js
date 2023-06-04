const { X , Y } = require ('../../constants');
const { Jimp } = require ('../../helpers/npm');
async function timeStamp({image, originalImageHeight, originalImageWidth, timezoneData, timezone, timestamp, newFilePath}){
  let maxWidth = originalImageWidth - X;
  let maxHeight = originalImageHeight - Y;
  image.print(timestamp,
    X,
    originalImageHeight - Y,
    {
      text: `${timezoneData} ${timezone}`,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY : Jimp.VERTICAL_ALIGN_TOP
    },maxWidth,maxHeight);
  image.write(newFilePath);
  return image;
}
module.exports = timeStamp;