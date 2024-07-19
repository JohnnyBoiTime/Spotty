const axios = require('axios');
const fs = require('fs');
const path = require('path');


//get a presigned URL for uploading/downloading. upOrDown == 1 means upload, 0 means download
const getPresignedURL = async (file, upOrDown) => {
	try {
		let presigned;

		//upOrDown==1 means get a URL for uploading
		if(upOrDown) {
			presigned = await axios(`http://00.00.00.000:0000/upload?key=${file}`);
		}
		//upOrDown==0 means get a URL for downloading
		else {
			presigned = await axios(`http://00.00.00.000:0000/download?key=${file}`);
		}
		//console.log(presigned.data.url);
		return presigned.data.url;
	}
	catch(err) {
		console.error('Couln\'t get presigned URL', err.status);
		throw err;
	}
};

const uploadFile = async(filePath) => {
	//get the file name from the file path
	fileName = path.basename(filePath);
	//create a buffer
	const fileData = fs.readFileSync(filePath);

	try {
		//get presigned URL for uploading
		const presignedURL = await getPresignedURL(fileName, 1);

		//create options object
		var options = {
			headers: {
				'Content-Type': filePath.type,
				'Content-Length': fileData.length
			}
		};

		//attempt to put the file into the S3
		const res = await axios.put(presignedURL, fileData, options);
		
		//if status is 200, upload was a success
		if(res.status === 200) {
			console.log('Successfully uploaded file');
		}
		//upload was a failure
		else {
			console.error('File upload failed :(', res.statusText);
		}
	}
	//file upload didn't work
	catch(err) {
		console.error('Couldn\'t upload file', err);
	}
}

const downloadFile = async(fileNameS3, filePath) => {
	try {
		//get the presigned url for this file
		const presignedURL = await getPresignedURL(fileNameS3, 0);
		
		//create options for the axios get
		var options = {
			responseType: 'arraybuffer',
		}

		//use axios to get the file
		const res = await axios.get(presignedURL, options);
		
		//if no data was recieved, throw an error
		if (!res.data) {
			throw new Error('No data received');
		}

		//write the response data to the desired file path
		fs.writeFile(filePath, res.data, (err) => {
			//if there's an error, write to the console
			if (err) {
				console.error(err);
			}  
			//otherwise, write to the console the write was successful
			else {
				console.log('Write successful!');
			}
		});
	}
	catch(err) {
		console.error('Couldn\'t download file', err);
	}
}
