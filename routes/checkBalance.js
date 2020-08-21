const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(process.env.NETWORK_ADDRESS);

router.post('/', function(req, res) {
    const {address} = req.body;
    if(!address) {
        res.json({ error: 'Invalid request params' }, 400)
    }
    web3.eth.getBalance(address).then((bal) => {
        res.json({balance: web3.utils.fromWei(bal, 'ether')})
    });
});

module.exports = router;
