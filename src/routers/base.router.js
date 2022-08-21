const express = require('express');
const { redirect } = require('express/lib/response');

const router = express.Router();

router.get('/', (req, res) => {
    res.render("index.njk");
})

module.exports = {
    router,
    mount: '/'
};