'use strict';
const express = require('express');
const router = express.Router();

router.route('/')

    .get((req, res, next) => {
        const { query } = req.query;

    })

    .post((req, res, next) => {

    });



router.route('/:id')

    .put((req, res, next) => {

    })

    .delete((req, res, next) => {

    })


module.exports = router;