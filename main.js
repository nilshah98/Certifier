// IPFS
window.Buffer = require('buffer/').Buffer 
const ipfsAPI = require('ipfs-http-client');
//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

const getFile = (validCID)=>{
    ipfs.get(validCID, function (err, files) {
        files.forEach((file) => {
            //console.log(file.path)
            console.log(file.content.toString('utf8'))
        })
    })
}

const get_json = async(validCID)=>{
    //console.log("+++++++++",validCID);
    var file = await ipfs.cat(validCID);
    //console.log("%%%%%%%%",file);
    return JSON.parse(file);
}

// uploading a doc to ipfs return hash
const upload_doc = async (filepath)=>{ 
    //Reading file from computer
    //let testFile = fs.readFile(filepath);
    //Creating buffer for ipfs function to add file to the system
    //let testBuffer = new Buffer(testFile);

    //Addfile router for adding file a local file to the IPFS network without any local node
    //app.get('/addfile', function(req, res) {
    hash = await ipfs.add(filepath);
    return hash[0].hash;
}

const upload_intermediate = async (intermediate)=>{ 
    //Creating buffer for ipfs function to add file to the system
    let testBuffer = new Buffer(JSON.stringify(intermediate));

    //Addfile router for adding file a local file to the IPFS network without any local node
    //app.get('/addfile', function(req, res) {

    hash = await ipfs.add(testBuffer);
    return hash[0].hash;
}

window.issue = async (files,owners,description,series_name) => {
    var hashes = []
    //console.log("called");
    for(var i=0;i<files.length;i++)
    {
        var file_hash = await upload_doc(files[i]);
        var d = new Date();
    
        var intermediate = {
            ipfs_hash:file_hash,
            description:description[i],//description separate for each maybe
            created:d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+"-"+d.toLocaleTimeString(),
            pubpriv:0,
            access:[owners[(2*i)]]
        }
        var intermediate_hash = await upload_intermediate(intermediate);
        //console.log("************"+intermediate_hash);
        var hash1 = web3.utils.fromAscii(intermediate_hash.slice(0,32));
        var hash2 = web3.utils.fromAscii(intermediate_hash.slice(32));
        hashes.push(hash1);
        hashes.push(hash2);
    }
    await addcontract(hashes,owners,series_name);
}

//issue(['nurdtechie98.png','test.png'],["0x9ef08d23bd291c2f2c27654ba02d05a1386cc185","0x9ef08d23bd291c2f2c27654ba02d05a1386cc185"],["shivam cheetah","neel hero"]);




// Web3 

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
            "name": "increment_series_name",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_series_name",
                    "type": "uint256"
                }
            ],
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
            "name": "get_series_name",
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
    
    var address = '0x8cb5d421d3edd12a818f7f08f1f2534c9de466f3';
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(abi,address);
    console.log(contract);

    abi2 = [
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
            "name": "get_address",
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
        }
    ];
}

// getting new contract generated for every series.
var new_contract = (series_address) => {
    newcontract = new web3.eth.Contract(abi2,series_address);
}

window.get_series_name = async() => {
    var series_name = await contract.methods.get_series_name().call(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
    return series_name;
}

window.increment_series_name = async() => {
    await contract.methods.increment_series_name().send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
}

// Add group of certificates i.e a series of certificates.
var addcontract = async (arr1, arr2, series_name) => {
    //console.log("&&&&&&&&&&&&&"+arr1);
    await contract.methods.issue(series_name).send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
    var series_address = await get_contract_address(series_name);
    //console.log("++++++++++++++"+series_address);
    //  5 entries in CSV
    // for(var i=0;i<5;i++){
    //     generate ipfshash
    //     await addcertificate("123456789");    
    // }

    // Convert csv into 2 arrays
    //var arr1 = [web3.utils.fromAscii("abcdefgh"),web3.utils.fromAscii("xyzwerqw")];
    //var arr2 = ["0xfa17349ef48e20b98539b54C769d2c0DE7e65880","0xfa17349ef48e20b98539b54C769d2c0DE7e65880"];
    new_contract(series_address);
    await addcertificates(arr1, arr2);
};

// returns contract address corresponding to series.
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

// give both arrays of ipfs hashes and public address of students.
var addcertificates = async (arr1, arr2) => {
    await newcontract.methods.addcertificates(arr1, arr2).send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
}

// get personal ipfshash mapped to owner's address 
var get_personal_ipfs = async() => {
    var ipfs_hash = await contract.methods.get_personal_ipfs_hash().send(
        {
            from:accounts[0],
            gas: '4700000'
        }
    )
    return ipfs_hash;
}

// update personal ipfshash mapped to owner's address
var update_personal_ipfs = async(ipfs_hash) => {
    await contract.methods.update(ipfs_hash).send(
        {
            from:accounts[0],
            gas: '4700000'
        }
    )
}

// get certificate from "seriesname-serialid"
window.get_certificate = async(unique_id) => {
    var series_name = unique_id.split("-")[0];
    var serial_id = unique_id.split("-")[1];
    var contract_address = await get_contract_address(series_name);
    new_contract(contract_address);
    var ipfs_hash = await id_to_hash(serial_id);
    console.log(ipfs_hash);
    var result = await get_json(ipfs_hash);
    console.log(result);
    if(result.pubpriv == 0)
        return result;
    else
    {
        accessible = result.access;
        console.log(accessible);
        if(accessible.includes(accounts[0]))
        {
            return result;
        }
        else
        {
            return "Either the certificates doesn't exist or is private";
        }
    }
}

var id_to_hash = async(serial_id) => {
    var ipfshash1 = await newcontract.methods.getcertificate(serial_id).call(
        {
            from: accounts[0],
            gas: '4700000'
        }
    );
    var ipfshash2 = await newcontract.methods.getcertificate2(serial_id).call(
        {
            from: accounts[0],
            gas: '4700000'
        }
    );
    ipfshash1 = ipfshash1.replace(/00/g,"");
    ipfshash2 = ipfshash2.replace(/00/g,"");
    ipfshash1 = web3.utils.toAscii(ipfshash1);
    ipfshash2 = web3.utils.toAscii(ipfshash2);
    return ipfshash1 + ipfshash2;
};

window.add_certificate_to_dashboard = async(unique_id) => {
    var series_name = unique_id.split("-")[0];
    var serial_id = unique_id.split("-")[1];
    var contract_address = await get_contract_address(series_name);
    new_contract(contract_address);
    var Owner = await newcontract.methods.get_address(serial_id).call(
        {
            from: accounts[0],
            gas: '4700000'
        }
    ); 
    if(accounts[0] == Owner){
        var ipfs_hash = await get_personal_ipfs(accounts[0]);
        var issuer_name = await newcontract.methods.issuer().call(
            {
                from: accounts[0],
                gas: '4700000'
            }
        );
        console.log("))))"+ipfs_hash);
        if(ipfs_hash.startsWith("Qm"))
        {
            var list = await get_json(ipfs_hash);
            var ipfshash = await id_to_hash(serial_id);  //intermediate ipfs hash with all details
            list.push([ipfshash,contract_address,serial_id,issuer_name]);
            var new_personal = await upload_intermediate(list);
            await update_personal_ipfs(new_personal);
        }
        else
        {
            var list = [];
            var ipfs_hash = await id_to_hash(serial_id);
            list.push([ipfs_hash,contract_address,serial_id,issuer_name]);
            list = JSON.stringify(list);
            var new_personal = await upload_intermediate(list);
            await update_personal_ipfs(new_personal);
        }
        return list;
    }
    else
    {
        return "You are not the owner of the certificate"
    }
}

var update_ipfs_hash = async(serial_id, ipfshash1, ipfshash2) => {
    newcontract.methods.update_ipfs_hash(serial_id,ipfshash1,ipfshash2).send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    )
}

window.change_access = async(index,val) => {
    var personal_ipfs = await get_personal_ipfs(accounts[0]);
    console.log(personal_ipfs);
    var current = await get_json(personal_ipfs);
    var result = await get_json(current[index][0]);  //current[index][0] is intermediate hash with all details.
    result.pubpriv = val;
    console.log(result);
    var ipfs_hash = await upload_intermediate(result);
    current[index][0] = ipfs_hash;
    var personal_ipfs = await upload_intermediate(current);
    console.log(personal_ipfs);
    new_contract(current[index][1]);
    var hash1 = web3.utils.fromAscii(ipfs_hash.slice(0,32));
    var hash2 = web3.utils.fromAscii(ipfs_hash.slice(32));
    await update_ipfs_hash(current[index][2], hash1, hash2);
    await update_personal_ipfs(personal_ipfs);
}

window.add_access = async(index,val) => {
    var personal_ipfs = await get_personal_ipfs(accounts[0]);
    var current = await get_json(personal_ipfs);

    var result = await get_json(current[index][0]);
    result.access.push(val);
    console.log(result);
    var ipfs_hash = await upload_intermediate(result);
    console.log("$%$%$%$%",ipfs_hash);
    current[index][0] = ipfs_hash;
    var personal_ipfs = await upload_intermediate(current);
    console.log("{}{}}{}{}{}",personal_ipfs);
    new_contract(current[index][1]);
    var hash1 = web3.utils.fromAscii(ipfs_hash.slice(0,32));
    var hash2 = web3.utils.fromAscii(ipfs_hash.slice(32));
    await update_ipfs_hash(current[index][2], hash1, hash2);
    await update_personal_ipfs(personal_ipfs);
}

window.get_dashboard = async() => {
    var personal_ipfs = await get_personal_ipfs(accounts[0]);
    var current = await get_json(personal_ipfs);
    list = []
    for(var i=0;i<current.length;i++)
    {
        var certi = current[i];
        var certificate = await get_json(certi[0]);
        certificate["issuer"] = certi[3];
        list.push(certificate); 
    }
    return list;
}

