const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(process.env.NETWORK_ADDRESS);
const mainAccountAddress = '0x5c68afBA19752EceBfaDbf3B61B8d33C8575C072';

router.post('/', function(req, res) {
    const {address} = req.body;
    if(!address) {
        res.json({ error: 'Invalid request params' }, 400)
    }
});

module.exports = router;
