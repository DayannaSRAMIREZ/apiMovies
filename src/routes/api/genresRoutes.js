const express = require('express');
const router = express.Router();
const {list, detail,name} = require('../../controllers/api/genresController');

router.get('/genres', list);
router.get('/genres/name/:name', name);
router.get('/genres/:id', detail);


module.exports = router;