const express = require('express');
const router  = express.Router();

//Write a loader here to avoid adding manual routes.
router.use(require(`./welcome`));
router.use(require(`./image-timestamp`));
router.use(require(`./get-url`));

//index route
router.use('/', (req, res) => {
  res.json({
    ok: 1
  });
});

module.exports = router;