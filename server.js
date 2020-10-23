const http = require("http");

const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("./controllers/productController");

/* ----------------------------------------
   ------------API Requests---------------- 
   ---------------------------------------- */

const server = http.createServer((req, res) => {
	// From controllers

	// Get All Products
	if (req.url === "/api/products" && req.method === "GET") {
		getProducts(req, res);
	}

	// Get Product By Id
	else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
		const id = req.url.split("/")[3];
		getProduct(req, res, id);
	}

	// Create product
	else if (req.url === "/api/products" && req.method === "POST") {
		createProduct(req, res);
	}

	// Update product
	else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
		const id = req.url.split("/")[3];
		updateProduct(req, res, id);
	}

	// Delete product
	else if (
		req.url.match(/\/api\/products\/([0-9]+)/) &&
		req.method === "DELETE"
	) {
		const id = req.url.split("/")[3];
		deleteProduct(req, res, id);
	}

	// Error message if Invalid Route
	else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Invlid Request" }));
	}
});

// Creating the port
const PORT = process.env.PORT || 5000;

// Listening to the port
server.listen(PORT, () => console.log(`server is running on ${PORT}`));

// Creating Server
// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/html');
// res.write(`<h1>I'm the code?????</h1>`)
// res.end();

// 2nd Method
// res.writeHead(status, {"Content-Type" : "application/json"});
// res.end(JSON.stringify(products/data));
