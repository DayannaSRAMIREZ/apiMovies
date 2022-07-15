const express = require('express');
const router = express.Router();
const {list,recomended,detail,nuevo, create,update,destroy} = require('../../controllers/api/moviesController');

router.get('/movies', list);
router.get('/movies/recommended', recomended);
router.get('/movies/new', nuevo);
router.get('/movies/:id',detail);
router.post('/movies/create', create);
router.put('/movies/update/:id', update);
router.delete('/movies/delete/:id', destroy);

module.exports = router;