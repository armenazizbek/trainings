const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const {eth, utils} = new Web3(process.env.NETWORK_ADDRESS);
const Tx = require('ethereumjs-tx').Transaction;
const mainAccountAddress = '0x5c68afBA19752EceBfaDbf3B61B8d33C8575C072';

router.post('/', async function(req, res) {
    const mainAccountPrivateKey = Buffer.from(process.env.MAIN_ACCOUNT_PRIVATE_KEY, 'hex');
    const txCount = await eth.getTransactionCount(mainAccountAddress);
    const balance = await eth.getBalance(mainAccountAddress);
    const gasPrice = await eth.getGasPrice();
    const gasLimit = 21000;

    const rawTx = {
        nonce: utils.toHex(txCount),
        gasLimit: utils.toHex(gasLimit),
        to: '0x0000000000000000000000000000000000000000',
        gasPrice: utils.toHex(gasPrice),
        value: balance - gasPrice * gasLimit,
    };

    const tx = new Tx(rawTx, {'chain':'ropsten'});
    tx.sign(mainAccountPrivateKey);

    const serializedTx = tx.serialize();
    eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .then((receipt) => {
        res.json({receipt})
    });
});

module.exports = router;
