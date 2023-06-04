const multer = require('multer');
const DIR=process.env.DIR;
const ASSET_PATH=process.env.ASSET_PATH;

const upload = multer ({
  dest:`${DIR}/${ASSET_PATH}`,
  fileFilter: function(req, payload, cb) {
    if(payload.mimetype.split('/')[0] == 'image'){
      return cb(null, true)
    }
    cb({message:'Only image files accepted', code: 422});
  } 
})

module.exports = upload;