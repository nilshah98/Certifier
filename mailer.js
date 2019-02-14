var nodemailer  = require('nodemailer'),
    keys        = require('./secret'),
    ejs         = require('ejs');

var mailSystem = {
    
    transporter : nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: keys.google   //OAuth2 keys file to be stored in secret.js file and path of it to be modified in require accordingly
    }),
    
    sendEJSViaMail : function(to,subject,ejsFilePath,optionsToEjs,attachmentsArray){

        ejs.renderFile(ejsFilePath,optionsToEjs,function(err,data){
            
            if(err) throw err;

            var mailOptions = {
                from : "Blockchain Certificates by Team Anything <certificates@blockchain.network>",   //Edit this to match OAuth2
                to : to,
                subject : subject,
                html : data,
                attachments: attachmentsArray
            };

            transporter.sendMail(mailOptions,function(error,info){
                if(error) throw error;
                else return info;
            });

        });

    }

}

// ***************secret.js sample****************
// module.exports = {
//     google : {
//         clientID :"Yeh Google dega",
//         projectID:"Yeh bhi Google dega",
//         authURI:"https://accounts.google.com/o/oauth2/auth",
//         tokenURI:"https://oauth2.googleapis.com/token",
//         auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
//         clientSecret:"",
//         callbackURL: "Callback URL",
//         javascript_origins:["Index URL"]
//     }
// }

// ***************attachements object sample****************
// let message = {
//     ...
//     attachments: [
//         {   // utf-8 string as an attachment
//             filename: 'text1.txt',
//             content: 'hello world!'
//         },
//         {   // binary buffer as an attachment
//             filename: 'text2.txt',
//             content: new Buffer('hello world!','utf-8')
//         },
//         {   // file on disk as an attachment
//             filename: 'text3.txt',
//             path: '/path/to/file.txt' // stream this file        ---------> YEH WALA BEST HAI APNE LIYE
//         },
//         {   // filename and content type is derived from path
//             path: '/path/to/file.txt'
//         },
//         {   // stream as an attachment
//             filename: 'text4.txt',
//             content: fs.createReadStream('file.txt')     -----> bhai yeh bohot risky hai if err occurs we need to close fs node mialer cannot do that on it's own
//         },
//         {   // define custom content type for the attachment
//             filename: 'text.bin',
//             content: 'hello world!',
//             contentType: 'text/plain'
//         },
//         {   // use URL as an attachment
//             filename: 'license.txt',
//             path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
//         },
//         {   // encoded string as an attachment
//             filename: 'text1.txt',
//             content: 'aGVsbG8gd29ybGQh',
//             encoding: 'base64'
//         },
//         {   // data uri as an attachment
//             path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
//         }
//     ]
// }


module.exports = mailSystem;