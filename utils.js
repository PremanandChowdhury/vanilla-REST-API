const fs = require("fs");

// Writes new Data to file specified in the string format
function writeDataToFile(filename, content) {
	fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (error) => {
		if (error) console.log(error);
	});
}

// Getting the POST data from the body
function getPostData(req) {
	return new Promise((resolve, reject) => {
		try {
			// Initialize body and convert the buffer to string
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});

			req.on("end", () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
}

// Exporting the files.
module.exports = {
	writeDataToFile,
	getPostData,
};
