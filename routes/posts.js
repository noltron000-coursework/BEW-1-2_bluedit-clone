const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('./helpers/auth');
const Room = require('../models/rooms');
const Post = require('../models/posts');
const comments = require('./comments');


// New Post
router.get('/new', auth.requireLogin, (req, res, next) => {
	Room.findById(req.params.roomId, function (err, room) {
		if (err) { console.error(err) };

		res.render('posts/new', { room: room });
	});
});

// Create Post
router.post('/', auth.requireLogin, (req, res, next) => {
	Room.findById(req.params.roomId, function (err, room) {
		if (err) { console.error(err) };

		let post = new Post(req.body);
		post.room = room;

		post.save(function (err, post) {
			if (err) { console.error(err) };

			return res.redirect(`/rooms/${room._id}`);
		});
	});
})

// Update Vote Tracker
router.post('/:id', auth.requireLogin, (req, res, next) => {
	Post.findById(req.params.id, function (err, post) {
		post.points += parseInt(req.body.points);

		post.save(function (err, post) {
			if (err) { console.error(err) };

			return res.redirect(`/rooms/${post.room}`);
		});
	});
});

router.use('/:postId/comments', comments);
module.exports = router;