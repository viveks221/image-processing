require('dotenv').config()

const config = {
  MOUNT_POINT: process.env.MOUNT_POINT,
  AUTHENTICATION_ENDPOINT: process.env.AUTHENTICATION_ENDPOINT,
  KEY_NAME: process.env.KEY_NAME,
  DIR: process.env.DIR,
  ASSET_PATH: process.env.ASSET_PATH,
  URL: process.env.URL,
  UPLOAD_URL: process.env.UPLOAD_URL,
  AWS_UPLOAD_KEY: process.env.AWS_UPLOAD_KEY,
  GET_URL_ENDPOINT: process.env.GET_URL_ENDPOINT
  // SERVER: process.env.SERVER,
  // PORT: process.env.PORT,
  // DB_HOST: process.env.DB_HOST,
  // DB_PORT: process.env.DB_PORT,
  // DB_USER: process.env.DB_USER,
  // DB_PASSWORD: process.env.DB_PASSWORD,
  // DB_NAME: process.env.DB_NAME,
  // DB_POOL_MAXSIZE: process.env.DB_POOL_MAXSIZE,
  // DB_POOL_MINSIZE: process.env.DB_POOL_MINSIZE,
  // DB_POOL_ACQUIRE: process.env.DB_POOL_ACQUIRE,
  // DB_POOL_IDLE: process.env.DB_POOL_IDLE,
  // DB_CONNECT_TIMEOUT: process.env.DB_CONNECT_TIMEOUT,
}

function checkIfAllEnvKeysPresent(config, scope="") {
  const configKeys = Object.keys(config);
  configKeys.forEach((key) => {
    if (!config[key]) {
      throw new Error(`"${scope} ${key}" is blank in .env or related configuration file`)
    }
    if(typeof config[key] === "object"){
      checkIfAllEnvKeysPresent({...config[key]}, key);
    }
  });
}

checkIfAllEnvKeysPresent(config);

module.exports = config;