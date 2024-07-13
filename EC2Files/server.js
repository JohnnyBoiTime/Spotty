const express = require('express');
const{getPresignedURL} = require('./s3Utils');
const app = express();
const port = 3000;

//store bucket name in a variable
const bucketName = '***';

app.use(express.json());


//app.get downloads a file from the S3, with the path to the file in t he S3 being the key
app.get('/download', async (req, res) => {
        const key = req.query.key;
        //if there is no key, return an error
        if(!key) {
                return res.status(400).send("Key is missing");
        }


        try {
                //return presigned URL
                const url = await getPresignedURL(bucketName, key);
                res.json({url});
        }
        catch(err) {
                //if there's an error in getting the URL, return status 500 and the error
                res.status(500).json({error: err.message});
        }

});

app.listen(port, (err) => {
        if(err) { console.log(err); }
        console.log(`Server listening on ${port}`);
});
