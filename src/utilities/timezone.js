const { moment, momenttz } = require('../../helpers/npm');
function timeZone (timezone) {
  let isValid;
  let currentTimestamp;
  if (isNaN(parseInt(timezone))) {
    isValid = momenttz.tz.names().includes(timezone);
    if (!isValid) {
      return [`The timezone does not exist.`,null] ;
    }
    currentTimestamp = momenttz.tz(timezone).format('YYYY-MM-DD_HH:mm:ss');
    return [null,currentTimestamp];
  } 
  if(!isNaN(parseInt(timezone))) {
    isValid = moment().utc().utcOffset(timezone);
    if (!isValid) {
      return [`The offset does not exist.`,null] ;
    }
    currentTimestamp = moment().utc().utcOffset(timezone).format('YYYY-MM-DD_HH:mm:ss');
  }
  return [null,currentTimestamp];
}
module.exports = timeZone;