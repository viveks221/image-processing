const helper = global.helper;
const config = helper.config;
const utilites = require('../../utilities');
const models = require('../../../models');
const logger = utilites.logger;

const log = logger('welcome');
const functionName = "service.welcome";

/**
 * Welcome
 * 
 * @param {object} body
 * 
 */

module.exports = (body) => {
  log.info(functionName, config.test, models.test);
  // eslint-disable-next-line no-async-promise-executor
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-async-promise-executor
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    if (body) {
      resolve(body);
    } else {
      resolve({ message: "Welcome"});
    }
  })
}