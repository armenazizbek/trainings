const express = require('express');
const router = express.Router();
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3(process.env.NETWORK_ADDRESS);
const mainAccountAddress = '0x5c68afBA19752EceBfaDbf3B61B8d33C8575C072';

router.post('/', function(req, res) {
  const {to, ether} = req.body;
  if(!to || !ether) {
    res.json({ error: 'Invalid request params' }, 400)
  }
  const mainAccountPrivateKey = Buffer.from(process.env.MAIN_ACCOUNT_PRIVATE_KEY, 'hex');

  web3.eth.getTransactionCount(mainAccountAddress).then((txCount) => {
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to,
      value: web3.utils.toHex(web3.utils.toWei(ether, 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    };

    const tx = new Tx(txObject, {'chain':'ropsten'});
    tx.sign(mainAccountPrivateKey);

    const serializedTransaction = tx.serialize();
    const row = '0x' + serializedTransaction.toString('hex');

    web3.eth.sendSignedTransaction(row, (err, txHash) => {
      res.json({txHash});
    });
  }).catch((err) => {
    res.json({ err }, 400)
  });
});

module.exports = router;
