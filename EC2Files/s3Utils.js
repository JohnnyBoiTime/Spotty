const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

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

module.exports = {
        getPresignedUrlForDownload,
        getPresignedUrlForUpload,
        deleteFile
};
