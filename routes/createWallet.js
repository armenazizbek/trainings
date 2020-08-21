const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(process.env.NETWORK_ADDRESS);

router.post('/', function(req, res) {
    const { tempPass } = req.body;

    if(!tempPass) res.json({ error: 'Invalid request params' }, 400);

    //account
    const account = web3.eth.accounts.create();

    // wallet
    const wallet = web3.eth.accounts.wallet.add(account);

    // TODO save this to db
    const keystore = wallet.encrypt(tempPass);

    res.json({
        address: account.address,
    });
});

module.exports = router;
