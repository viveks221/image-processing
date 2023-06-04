const express = require('express');
const router = express.Router();
const packages = require('../../../../helpers');
const { axios } = packages.module;
const { safePromise } = require('../../../utilities');
const { GET_URL_ENDPOINT } = require('../../../../config');

router
  .route('/get-url')
  .post(async (req, res) => {
    const data = JSON.stringify({
      "key": req.body.key
    });
    
    const config = {
      method: 'post',
      url: GET_URL_ENDPOINT,
      headers: { 
        'Authorization': req.headers.authorization, 
        'Content-Type': 'application/json'
      },
      data: data
    };
    const [error,result] = await safePromise(axios(config));
    if (error) {
      return res.status(500).json(error.response.data)
    }
    res.json(result.data);
  });

module.exports = router;