const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const clientParams = { region: '***' };
const client = new S3Client(clientParams);

const getPresignedURL = async (bucketName, key, expiresIn = 3600) => {
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

module.exports = {
        getPresignedURL,
};
