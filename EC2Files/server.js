const express = require('express');
const{getPresignedUrlForDownload, getPresignedUrlForUpload, deleteFile} = require('./s3Utils');
const app = express();
const port = 3000;
const PASSWORD = '***';

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
                const url = await getPresignedUrlForDownload(bucketName, key);
                res.json({url});
        }
        catch(err) {
                //if there's an error in getting the URL, return status 500 and the error
                res.status(500).json({error: err.message});
        }

});

app.get('/upload', async (req, res) => {
        const key = req.query.key;
        //if there is no key, return an error
        if(!key) {
                return res.status(400).send("Key is missing");
        }
        try {
                //return presigned URL
                const url = await getPresignedUrlForUpload(bucketName, key);
                res.json({url});
        }
        catch(err) {
                //if there's an error in getting the URL, return status 500 and the error
                res.status(500).json({error: err.message});
        }

});

app.delete('/delete', async (req, res) => {
        const {key, pass} = req.query;
        //if there is no key, return error
        if(!key || !pass) {
                return res.status(400).send("Key or pass is/are missing");
        }
        //if password key is incorrect, error
        if(pass !== PASSWORD) {
                return res.status(403).send("Pass incorrect")
        }

        //create bucket parameters object
        const bucketParams = { Bucket: bucketName, Key: key };

        //attempt to delete file
        try {
                data = await deleteFile(bucketParams);
                //print to console running server that it was successful
                console.log("Successfully deleted object: ", data);
                //http response will tell it's successful and give returned data
                res.status(200).json({message: "Deletion successful: ", data: data});
        } catch (err) {
                //http response saying there was an error
                res.status(500).json({error: err});
        }
});

app.listen(port, (err) => {
        if(err) { console.log(err); }
        console.log(`Server listening on ${port}`);
});
