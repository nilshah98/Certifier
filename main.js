var accounts;
var contract;
var newcontract;
var abi2;

window.onload = async () => {
    if(typeof web3 !== 'undefined'){
        web3 = new Web3(web3.currentProvider);
    } 
    else{
        console.log("Here!!");
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    var abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_series_name",
                    "type": "string"
                }
            ],
            "name": "issue",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_series_name",
                    "type": "string"
                }
            ],
            "name": "get_contract_address",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
    var address = '0x301b3a536223b111acb79c7f05844725d2fe0cda';
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(abi,address);
    console.log(contract);

    abi2 = [
        {
            "constant": true,
            "inputs": [],
            "name": "issuer",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "serial_id",
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
            "constant": true,
            "inputs": [
                {
                    "name": "_serial_id",
                    "type": "uint256"
                }
            ],
            "name": "get_ipfs_hash",
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
            "constant": true,
            "inputs": [],
            "name": "series_name",
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
                    "name": "_ipfs_hash",
                    "type": "string"
                }
            ],
            "name": "addcertificate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_series_name",
                    "type": "string"
                },
                {
                    "name": "_issuer",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ];
}

// csv will be given + template. 
// First make a contract instance for series. 
// Series name randomly generated.
var issue = async () => {
    var series_name = "abcd";  //random generation
    await contract.methods.issue(series_name).send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
    var series_address = await get_contract_address(series_name);
    console.log(series_address);
    
    newcontract = new web3.eth.Contract(abi2,series_address);

    console.log(newcontract);

    // 5 entries in CSV
    for(var i=0;i<5;i++){
        // generate ipfshash
        await addcertificate("123456789");    
    }
};

var get_contract_address = async (series_name) => {
    var series_address = await contract.methods.get_contract_address(series_name).call(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
    return series_address;
    //console.log(series_address);
}

var addcertificate = async (ipsh_hash) => {
    await newcontract.methods.addcertificate(ipsh_hash).send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
}

var get_ipfs_hash = async (serial_id) => {
    var ipfs_hash = await newcontract.methods.get_ipfs_hash(serial_id).call(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
    return ipfs_hash;
}
