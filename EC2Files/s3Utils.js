const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const clientParams = { region: '***' };
const client = new S3Client(clientParams);

const getPresignedUrlForDownload = async (bucketName, key, expiresIn = 3600) => {
        //getObjectCommand using the paramters bucketName and key
        const command = new GetObjectCommand({Bucket: bucketName, Key: key,});


        try {
                //get the presigned URL using client and command
                const url = await getSignedUrl(client, command, { expiresIn });
                //console.log("URL: " + url);
                return url;
        }
        catch(err) {
                //if there's an error in getting the URL, throw the error
                console.error('Could not generate presigned URL', err);
                throw err;
        }
};


const getPresignedUrlForUpload = async ( bucketName, key, expiresIn = 3600) => {
        const command = new PutObjectCommand({ Bucket: bucketName, Key: key, ContentType: 'application/octet-stream' });

        try {
                //get signed URL from amazon
                const url = await getSignedUrl(client, command, { expiresIn: 3600 });
                return url;
        }
        catch(err) {
                //throw error and print to console
                console.error('Couldn\'t generate presigned URL', err);
                throw err;
        }
};

const deleteFile = async (bucketParams) => {
        //Folowing code from https://docs.aws.amazon.com/AmazonS3/latest/userguide/delete-objects.html

        try {
                //attempt to delete object and store returned data
                const data = await client.send(new DeleteObjectCommand(bucketParams));
                return data;
        } catch (err) {
                //print error to console
                console.error("Error: ", err);
                throw err;
        }
};

//search for a file with a specific name
const search = async (bucketName, fileName) => {

        //since ListObjectsV2Command returns 1000 objects, isTruncated tells whether
        //it needs to search more
        let isTruncated = true;
        //contToken is the continuationToken that tells ListObjectsV2 command where
        //to continue listing objects
        let contToken = null;
        //results will be returned. It stores all files with fileName, including
        //the ones in folders
        let results = [];

        while (isTruncated == true) {
                //create input parameters
                const inputParams = {
                        Bucket: bucketName,
                        ContinuationToken: contToken
                }

                try {
                        //retrieve data from S3 bucket
                        const data = await client.send(new ListObjectsV2Command(inputParams));

                        //extract Contents array from data
                        const contents = data.Contents;

                        //filter out all items which their keys dont end in fileNanme
                        const filteredRes = contents.filter(item => item.Key.endsWith(fileName));
                        //add these filtered items to results
                        results = results.concat(filteredRes);

                        //update isTruncated and contToken
                        isTruncated = data.IsTruncated;
                        contToken = data.NextContinuationToken;

                } catch (err) {
                        console.error("Error: ", err);
                        throw err;
                }
        }

        return results;
};

module.exports = {
        getPresignedUrlForDownload,
        getPresignedUrlForUpload,
        deleteFile,
        search
};
