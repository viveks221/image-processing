const FormData = require('form-data');
const packages = require('../../helpers');
const { axios } = packages.module;
const fs = require('fs');
const safePromise = require('./safe-promise');
const { UPLOAD_URL, AWS_UPLOAD_KEY } = require('../../config');
async function sendFile(filePath,authorization){
  // eslint-disable-next-line no-console
  const formData = new FormData();
  formData.append(AWS_UPLOAD_KEY, fs.createReadStream(filePath));
  const config = {
    method: 'post',
    url: UPLOAD_URL,
    headers: { 
      'authorization': authorization, 
      ...formData.getHeaders()
    },
    data: formData
  };
  const [error,data] = await safePromise(axios(config));
  if (error) {
    throw error
  }
  return data
}

module.exports = sendFile;
