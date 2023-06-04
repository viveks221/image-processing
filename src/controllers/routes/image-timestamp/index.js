const express = require('express');
const router = express.Router();
const { safePromise,sendFile } = require('../../../utilities');
const { upload, sanitize, validate } = require('../../../middlewares');
const rules = require('../../../../rules');
const { imageProcessing } = require('../../../services');
const { KEY_NAME } = require('../../../../config');

router
  .route('/post-image')
  .post( upload.single(KEY_NAME), sanitize, validate(rules.imageProcessing), async (req, res) => {
    if(!req.file){
      return res.status(422).json({
        status: "fail",
        message: "Image file required",
        res: {
        }
      });
    }
    const payload = req.payload;
    payload.file = req.file;
    const [error,data] = await safePromise(imageProcessing(payload));
    if (error) {
      return res.status(500).json({
        status: "fail",
        message: error.message,
        res: {
          
        }
      });
    }
    const [sendError,sendData] = await safePromise(sendFile(data,req.headers.authorization));
    if(sendError){
      return res.status(500).json({
        status: "fail",
        message: sendError.message,
        res: {
        }
      });
    }
    res.json({
      status: "success",
      message: "Image url",
      res: {
        senddata: sendData.data
      }
    });
  });

module.exports = router;