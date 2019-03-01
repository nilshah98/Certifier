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
            "inputs": [],
            "name": "issue",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "name": "update",
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
                    "type": "uint256"
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
        },
        {
            "constant": true,
            "inputs": [],
            "name": "get_personal_ipfs_hash",
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
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
    var address = '0xfa56ef65a3f624ada359e19d4d1800a932399b57';
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(abi,address);
    console.log(contract);

    abi2 = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id_to_ipfshash",
                    "type": "bytes32[]"
                },
                {
                    "name": "_id_to_address",
                    "type": "address[]"
                }
            ],
            "name": "addcertificates",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_series_name",
                    "type": "uint256"
                },
                {
                    "name": "_issuer",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_serial_id",
                    "type": "uint256"
                },
                {
                    "name": "_ipfs_hash",
                    "type": "bytes32"
                },
                {
                    "name": "_ipfs_hash_2",
                    "type": "bytes32"
                }
            ],
            "name": "update_ipfs_hash",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "name": "getcertificate",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
            "name": "getcertificate2",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "id_to_address",
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
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "id_to_ipfshash",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
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
            "inputs": [],
            "name": "series_name",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
}

// csv will be given + template. 
// First make a contract instance for series. 
// Series name randomly generated.

var new_contract = (series_address) => {
    newcontract = new web3.eth.Contract(abi2,series_address);
}

var addcontract = async (arr1, arr2) => {
    //var series_name = "abcd";  //random generation
    await contract.methods.issue().send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
    var series_address = await get_contract_address(series_name);
    console.log(series_address);
    //  5 entries in CSV
    // for(var i=0;i<5;i++){
    //     generate ipfshash
    //     await addcertificate("123456789");    
    // }

    // Convert csv into 2 arrays
    //var arr1 = [web3.utils.fromAscii("abcdefgh"),web3.utils.fromAscii("xyzwerqw")];
    //var arr2 = ["0xfa17349ef48e20b98539b54C769d2c0DE7e65880","0xfa17349ef48e20b98539b54C769d2c0DE7e65880"];
    new_contract(series_address);
    await addcertificate(arr1, arr2);

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

var addcertificate = async (arr1, arr2) => {
    await newcontract.methods.addcertificate(arr1, arr2).send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
}

var get_personal_ipfs = async(arr1,arr2) => {
    var ipfs = await contract.methods.get_personal_ipfs().call(
        {
            from:accounts[0],
            gas: '4700000'
        }
    )
    return ipfs;
}

var update_personal_ipfs = async(ipfs_hash) => {
    await contract.methdods.update_personal_ipfs(ipfs_hash).send(
        {
            from:accounts[0],
            gas: '4700000'
        }
    )
}

var get_certificate = async(unique_id) => {
    var series_name = unique_id.split("-")[0];
    var serial_id = unique_id.split("-")[1];
    var contract_address = await get_contract_address(series_name);
    new_contract(contract_address);
    var ipfs_hash1 = '' ; //get intermediate ipfs 
    var ipfs_hash2 = '' ; //get intermediate ipfs 
    var ipfs_hash = web3.utils.toAscii(ipfs_hash1)+web3.utils.toAscii(ipfs_hash2);
    var result = get_json(ipfs_hash);
    if(result.pubpriv == 0)
        return result;
    else
    {
        accessible = results.access;
        if(accessible.include(accounts[0]))
        {
            return result;
        }
        else
        {
            return "Either the certificates doesn't exist or is private";
        }
    }
}

var claim_certificate = async(unique_id) => {
    var series_name = unique_id.split("-")[0];
    var serial_id = unique_id.split("-")[1];
    var contract_address = await get_contract_address(series_name);
    new_contract(contract_address);
    Owner = "";// cheetah methods; 
    if(accounts[0] == Owner){
        ipfs = get_personal_ipfs(accounts[0]);
        if(ipfs.startsWith("Qm"))
        {
            var list = get_json(ipfs);
            list.push(ipfs);
            var new_personal = upload_intermediate(list);
            update_personal_ipfs(new_personal);
        }
        else
        {
            var list = []
            list.push([ipfs,contract_address,serial_id]);
            var new_personal = upload_intermediate(list);
            update_personal_ipfs(new_personal);
        }
    }
    else
    {
        return "You are not the owner of the certificate"
    }
}

var change_access = (index,val) => {
    var personal_ipfs = get_personal_ipfs(accounts[0]);
    var current = get_json(personal_ipfs);
    var result = get_json(current[index][0]);
    result.pubpriv = val;
    var ipfs_hash = upload_intermediate(result);
    current[index][0] = ipfs_hash;
    var personal_ipfs = upload_intermediate(current);
    new_contract(current[index][1]);
    update_ipfs()//cheetah
}

var add_access = (index,val) => {
    var personal_ipfs = get_personal_ipfs(accounts[0]);
    var current = get_json(personal_ipfs);
    var result = get_json(current[index][0]);
    result.access.push(val);
    var ipfs_hash = upload_intermediate(result);
    current[index][0] = ipfs_hash;
    var personal_ipfs = upload_intermediate(current);
    new_contract(current[index][1]);
    update_ipfs()//cheetah
}

