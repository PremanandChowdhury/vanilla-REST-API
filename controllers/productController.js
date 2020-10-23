// Controls the working of the route method
const Product = require("../modals/productModal");

const { getPostData } = require("../utils");

// @desc   Get All Products
// @route  GET /api/products
async function getProducts(req, res) {
	try {
		const products = await Product.findAll();
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(products));
	} catch (error) {
		console.log(error);
	}
}

// @desc   Get Single Product
// @route  GET /api/product/:id
async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (product) {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(product));
		} else {
			// when product  is not found
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Product Not Found" }));
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc   Create a Product
// @route  POST /api/products
async function createProduct(req, res) {
	try {
		const body = await getPostData(req);

		// Get data from the body
		const { title, description, price } = JSON.parse(body);

		const product = {
			title,
			description,
			price,
		};

		const newProduct = await Product.create(product);

		res.writeHead(201, { "Content-Type": "application/json" });
		return res.end(JSON.stringify(newProduct));
	} catch (error) {
		console.log(error);
	}
}

// @desc   Update a Product
// @route  PUT /api/products/:id
async function updateProduct(req, res, id) {
	try {
		// Find the product by Id
		const product = await Product.findById(id);

		if (product) {
			const body = await getPostData(req);

			const { title, description, price } = JSON.parse(body);

			const productData = {
				title: title || product.title,
				description: description || product.description,
				price: price || product.price,
			};

			const updProduct = await Product.update(id, productData);

			res.writeHead(200, { "Content-Type": "appliacion/json" });
			return res.end(JSON.stringify(updProduct));
		} else {
			// When product is not found
			res.writeHead(404, { "Content-Type": "application/json" });
			return res.end(JSON.stringify({ message: "Product Not Found" }));
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc   Delete a Product
// @route  DELETE /api/products/:id
async function deleteProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (product) {
			await Product.remove(id);
			res.writeHead(200, { "Content-Type": "application/json" });
			return res.end(JSON.stringify({ message: `${product.title} is Removed` }));
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			return res.end(JSON.stringify({ message: "Product Not Found" }));
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};

// The first way
// async function createProduct(req, res) {
// 	try {
// 		// Get data from the body
// 		let body = "";
// 		req.on("data", (chunk) => {
// 			// Convert the buffer to string
// 			body += chunk.toString();
// 		});

// 		req.on("end", async () => {
// 			const { title, description, price } = JSON.parse(body);

// 			// New Test static product
// 			const product = {
// 				title,
// 				description,
// 				price,
// 			};

// 			// Modal Function
// 			const newProduct = await Product.create(product);
// 			res.writeHead(201, { "Content-Type": "application/json" });
// 			return res.end(JSON.stringify(newProduct));
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
