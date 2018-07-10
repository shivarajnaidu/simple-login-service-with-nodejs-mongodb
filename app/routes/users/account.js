'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
.get(async (req, res, next) => {

});


router.route('/:id')
.get(async (req, res, next) => {
	const { id } = req.params;
	
})


module.exports = router;