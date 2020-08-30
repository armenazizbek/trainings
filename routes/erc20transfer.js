const express = require('express');
const router = express.Router();
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/49e5f58c5d634d7d888e8d6ebd23ea7e');

router.post('/', async function(req, res) {
    const { address } = req.body;

    if(!address) res.json({ error: 'Invalid request params' }, 400);
    const walletAddress = '0x4679df190f435A503558eCD19613D9f89Ae39fA1';
    const privateKey = Buffer.from('141220cc78206bac66c8034d9f0fea401ae96883cc24c97024a7c52c4f4acb0d', 'hex');
    const contractAddress = '0x43bC2D4D5EdD6344Dfd63Ef18EDD26074c1bc499';
    const contractAbi = [
            {
                "constant": true,
                "inputs": [

                ],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [

                ],
                "name": "totalSupply",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [

                ],
                "name": "decimals",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [

                ],
                "name": "symbol",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            }
        ];

    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const data = contract.methods.transferFrom(walletAddress, address, web3.utils.toWei('1', 'ether')).encodeABI();
    const gasPrice = await web3.eth.getGasPrice();

    const txObject = {
        to: contractAddress,
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(gasPrice),
        data: data,
    };

    const tx = new Tx(txObject,{ chain: 'rinkeby' });
    tx.sign(privateKey);

    let serializedTx = "0x" + tx.serialize().toString('hex');

    web3.eth.sendSignedTransaction(serializedTx).on('transactionHash', function (txHash) {
        res.json({ txHash }, 200)
    }).on('receipt', function (receipt) {
        res.json({ receipt }, 200)
    }).on('confirmation', function (confirmationNumber, receipt) {
        res.json({ confirmationNumber }, 200)
    }).on('error', function (error) {
        console.log(error, 88888);
        res.json({ error }, 400)
    });
});

module.exports = router;
