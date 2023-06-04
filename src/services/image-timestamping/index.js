const { Jimp ,path } = require('../../../helpers/npm');
const { safePromise } = require('../../utilities');
const fsPromises = require('fs/promises');
const { DIR, ASSET_PATH } = require('../../../config');
const { placementX, placementY, watermarkHeight, watermarkFile } = require('../../../constants');
const { timeStamp, watermarkAdd } = require('../../utilities');
const timeZone = require('../../utilities/timezone');

async function imageProcessing (payload) {
  //Extracting only the name and extension of the file
  const [name, ext] = payload.file.originalname.split('.');  
  const timezone = payload.timezone;
  
  const [timezoneError,timezoneData]= timeZone(timezone);
  if (timezoneError) {
    throw new Error(timezoneError);
  }
  
  //Adding timestamp to filename
  const newFileName = `${timezoneData}_${name}.${ext}`; 
  const oldFilePath = path.resolve(`${DIR}`,`${ASSET_PATH}`, payload.file.filename); 
  const newFilePath = path.resolve(`${DIR}`,`${ASSET_PATH}`, newFileName); 
  const watermarkImage = path.resolve(`${DIR}`,`${watermarkFile}`);
  //const timestampUrl =`${URL}${newFileName}`;
  const [imageError, image] = await safePromise(Jimp.read(oldFilePath));
  if (imageError) {
    throw imageError;
  }
  let originalImageHeight = image.bitmap.height;
  let originalImageWidth = image.bitmap.width;
  
  const [timestampError, timestamp] = await safePromise(Jimp.loadFont(Jimp.FONT_SANS_16_BLACK));
  if (timestampError) {
    throw timestampError;
  }
  
  let payloadPlacement = [];
  if (payload.placement) {
    let placementList = payload.placement.split(',');
    payloadPlacement = placementList.map((item)=>{
      return +item;
    })
  }

  let placementPreset =[placementX,originalImageHeight - placementY];
  let placement = payload.placement ? payloadPlacement : placementPreset;

  if (payload.watermark) {
    const [watermarkError,watermark] = await safePromise(Jimp.read(watermarkImage));
    if (watermarkError) {
      throw watermarkError;
    }
    watermark.resize(Jimp.AUTO, watermarkHeight ); 
    //watermark utility
    const [watermarkAddError] = await safePromise(watermarkAdd({image, watermark, placement}));
    if(watermarkAddError) {
      throw watermarkAddError;
    }
  }
  //timestamp utility
  const timestampDetails={
    image, 
    originalImageHeight, 
    originalImageWidth, 
    timezoneData, 
    timezone, 
    timestamp, 
    newFilePath
  }
  const [error] = await safePromise(timeStamp(timestampDetails));
  if (error) {
    throw error;
  }
  const[unlinkError]= await safePromise(fsPromises.unlink(oldFilePath));
  if (unlinkError) {
    throw unlinkError;
  }
  return newFilePath;

  // let heightSelect = payload.height ? payload.height : undefined;
  // let widthSelect = payload.width ? payload.width : undefined;
  // function thumbnailSizeArray(size){
  //   let sizeList = size.split(',');
  //   return sizeList.map((item)=>{
  //     return +item;
  //   })
  // }  
  // let height = [];
  // if (heightSelect) {
  //   height = thumbnailSizeArray(heightSelect);
  // }
  // let width = [];
  // if (widthSelect) {
  //   width = thumbnailSizeArray(widthSelect);
  // }
  // //thumbnail utility
  // const [thumbnailError,thumbnailData] = await safePromise(thumbnail({newFilePath, height, width, timezoneData}));
  // if (thumbnailError) {
  //   throw thumbnailError;
  // }

  // const thumbnailsUrl = thumbnailData.map(function (item) {
  //   const thumbnailName = path.basename(item);
  //   return `${URL}${thumbnailName}`;
  // })
  
  //return [timestampUrl, thumbnailsUrl];
}

module.exports = imageProcessing;