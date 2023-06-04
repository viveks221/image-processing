'use strict'
const utilites = require("../../utilities");
const logger = utilites.logger;

const log = logger('validate');
const functionName = "validate-middleware";

let validate = (rules) => {
  return (req, res, next) => {
    let body = req.payload || req.body || {};
    log.info(functionName, "Reqesut body => ", { ...body }, rules);
    utilites.joiValidate(body, rules,  (error) => {
      if (error) {
        error.code = 422;
        return next(error);
      }
      return next();
    });
  }
}

module.exports = validate;