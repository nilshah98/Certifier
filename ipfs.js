const ipfsAPI = require('ipfs-http-client');
const fs = require('fs');

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

const upload = (filepath)=>{ 
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