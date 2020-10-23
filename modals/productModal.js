// Deals with the modal of product that is to be stored in the DB
let products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

//@desc  Find All Products.
function findAll() {
	return new Promise((resolve, reject) => {
		resolve(products);
	});
}

//@desc  Find By Product Id
function findById(id) {
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === id);
		resolve(product);
	});
}

//@desc  Create Product
function create(product) {
	return new Promise((resolve, reject) => {
		const newProduct = { id: uuidv4(), ...product };
		// Pushing the new product to the products.json file.
		products.push(newProduct);
		writeDataToFile("./data/products.json", products);
		resolve(newProduct);
	});
}

//@desc  Update Product
function update(id, product) {
	return new Promise((resolve, reject) => {
		// Get the index of the file
		const index = products.findIndex((p) => p.id === id);

		// Get the product and update what's changed
		products[index] = { id, ...product };
		writeDataToFile("./data/products.json", products);
		resolve(products[index]);
	});
}

//@desc  Remove Product
function remove(id) {
	return new Promise((resolve, reject) => {
		products = products.filter((p) => p.id !== id);
		writeDataToFile("./data/products.json", products);
		resolve();
	});
}

// Exporting the files.
module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
};
