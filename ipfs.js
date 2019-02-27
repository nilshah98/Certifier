const ipfsAPI = require('ipfs-http-client');
const fs = require('fs');

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})



const upload_doc = (filepath)=>{ 
    //Reading file from computer
    let testFile = fs.readFileSync(filepath);
    //Creating buffer for ipfs function to add file to the system
    let testBuffer = new Buffer(testFile);

    //Addfile router for adding file a local file to the IPFS network without any local node
    //app.get('/addfile', function(req, res) {

    ipfs.add(testBuffer, function (err, file) {
    if (err) {
        console.log(err);
    }
    console.log(file)
    });
}

const upload_intermediate = (intermediate)=>{ 
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

//upload_intermediate("testing1234","qawsedcvfraz","this is a test documents intermediate",1);

//This hash is returned hash of addFile router.
const validCID = 'HASH_CODE';


const getFile = (validCID)=>{
    ipfs.get(validCID, function (err, files) {
        files.forEach((file) => {
            //console.log(file.path)
            console.log(file.content.toString('utf8'))
        })
    })
}

const get_json = (validCID)=>{
    ipfs.cat(validCID, function (err, file) {
            const json_obj = JSON.parse(file);
            return json_obj;
    })
}

get_json("Qmb6eEURAKZaTKqqhkAgUdHwCUa7QtxGxk6Yc9PTtu8zqx");


const update_access = (validCID)

//getFile("QmSUV9cyBRU5f2h14FNema49suhGwLrF4QqCKtbWnLmMhK");