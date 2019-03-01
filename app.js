const ipfsAPI = require('ipfs-http-client');
//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

// uploading a doc to ipfs return hash
const upload_doc = async (filepath)=>{ 
    //Reading file from computer
    //let testFile = fs.readFile(filepath);
    //Creating buffer for ipfs function to add file to the system
    //let testBuffer = new Buffer(testFile);

    //Addfile router for adding file a local file to the IPFS network without any local node
    //app.get('/addfile', function(req, res) {

    ipfs.add(filepath, function (err, hash) {
    if (err) {
        console.log(err);
    }
    return hash;
    });
}

const upload_intermediate = async (intermediate)=>{ 
    //Creating buffer for ipfs function to add file to the system
    let testBuffer = new Buffer(JSON.stringify(intermediate));

    //Addfile router for adding file a local file to the IPFS network without any local node
    //app.get('/addfile', function(req, res) {

    ipfs.add(testBuffer, function (err, file) {
    if (err) {
        console.log(err);
    }
    console.log(file)
    });
}

var issue = async (files,owners,description,series_name) => {
    hashes = []
    console.log("called");
    for(var i=0;i<files.length;i++)
    {
        var file_hash = await upload_doc(files[i]);
        var d = new Date();
    
        var intermediate = {
            ipfs_hash:file_hash,
            description:description[i],//description separate for each maybe
            created:d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+"-"+d.toLocaleTimeString(),
            pubpriv:0,
            access:[]
        }
        var intermediate_hash = await upload_intermediate(intermediate);
        var hash1 = web3.utils.fromAscii(intermediate_hash.slice(0,32));
        var hash2 = web3.utils.fromAscii(intermediate_hash.slice(32));
        hashes.push[hash1];
        hashes.push[hash2];
    }
    await addcontact(hashes,owners,series_name);
}

//issue(['nurdtechie98.png','test.png'],["0x9ef08d23bd291c2f2c27654ba02d05a1386cc185","0x9ef08d23bd291c2f2c27654ba02d05a1386cc185"],["shivam cheetah","neel hero"]);

