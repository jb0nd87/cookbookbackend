const express = require('express')
const router = express.Router()
const mongoose = require('../db/connection');
const Cookbook = require('../models/Cookbook');
const db = mongoose.connection;
const seedData = require('../db/seed.js');

// Require the Cookbook controller.

// Write the route to list all cookbooks
router.get('/', async (req, res) => {
	const cookbooks = await Cookbook.find({});
	res.json({ status: 200, data: cookbooks });
});

// Write the route to get cookbook by title
router.get('/:title', async (req, res) => {
	const cookbooks = await Cookbook.find({ title: req.params.title });
	res.json({ status: 200, data: cookbooks });
});

// Write the route to get cookbook by year published
router.get('/year/:year', async (req, res) => {
	const cookbooks = await Cookbook.find({ yearPublished: req.params.year });
	res.json({ status: 200, data: cookbooks });
});

// Write the route to create a cookbook
router.post('/', async (req, res) => {
	const cookbook = await Cookbook.create(req.body);
	res.json({ status: 200, data: cookbook });
});

// Write the route to update a cookbook
router.put('/:title', async (req, res) => {
	console.log('put', req.params.id);
	const cookbook = await Cookbook.findOneAndUpdate(
		{ title: req.params.title },
		req.body,
		{
			new: true,
		}
	);
	res.json({ status: 200, msg: 'item updated', data: cookbook });
});


// Write the route to delete the cookbook by title
router.delete('/:title', async (req, res) => {
	const cookbook = await Cookbook.findByIdAndDelete(req.params.title);
	res.json({ status: 200, msg: 'item deleted' });
});


module.exports = router;