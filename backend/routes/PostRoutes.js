const express = require('express');
const { createPost, getPost, getPostById, updatePostById, deletePostById, governmentPost, musicPost, educationPost, gamesPost, technologyPost, celebrityPost } = require('../controller/PostController');
const router = express.Router();
const upload = require('../config/upload');



router.get('/get', getPost);
router.get('/get/government', governmentPost);
router.get('/get/music', musicPost);
router.get('/get/education', educationPost);
router.get('/get/games', gamesPost);
router.get('/get/technology', technologyPost);
router.get('/get/celebrity', celebrityPost);
router.get('/get/:id', getPostById);
router.post('/create', upload.single('file'), createPost);
router.put('/update/:id', updatePostById);
router.delete('/delete/:id', deletePostById);


module.exports = router