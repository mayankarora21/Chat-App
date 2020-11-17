const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("this is chatting app");
})

router.get('/getinfo', (req, res) => {
    res.send("information");
})

router.post('/random', (req, res) => {
    res.send("got it");
})

module.exports = router;