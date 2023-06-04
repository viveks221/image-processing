const express = require('express');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
const moment = require('moment');
const momenttz = require('moment-timezone');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  express,
  cookieParser,
  Joi,
  moment,
  momenttz,
  Jimp,
  fs,
  path,
  axios 
}